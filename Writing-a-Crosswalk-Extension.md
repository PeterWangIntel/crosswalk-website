# Introduction
Extensions in Crosswalk gives application developers an interface to the world outside the Web Runtime.

They're implemented using a shared object with a very simple interface that allows message passing to and from JavaScript code. Each extension runs on its own thread, giving the ability to block and perform expensive operations without blocking the rest of the user interface.

## Implementing an Extension
Extensions are preferably written in C or C++. The `xwalk_extension_public.h` header should be used to define the structures used by the extension system.

The only symbol that should be exported is the function `CXWalkExtension* xwalk_extension_init(int32_t api_version)`. Be sure to use `extern "C"` when defining this function to avoid name mangling if using a C++ compiler. This function should be implemented and exported in the shared object. The `api_version'' parameter will contain the maximum version supported by Crosswalk. On a successful invocation, this function should return a pointer to a CXWalkExtenion structure, with the fields:
- `api_version`, filled with the API version the extension implements.
- `name`, with the extension name (used by xwalk.postMessage() and friends).
- `get_javascript`, filled with a pointer to a function that returns the JavaScript shim to be available in all page contexts. The prototype is `const char *get_javascript(CXWalkExtension *)`.
- `shutdown`, filled with a pointer to a function that is called whenever this extension is shut down (e.g. Crosswalk terminating). NULL is fine. The prototype is `void shutdown(CXWalkExtension *)`.
- `context_create`, filled with a pointer to a function that creates an extension context. The prototype is `CXWalkExtensionContext* create_context(CXWalkExtension *)`.

A `CXWalkExtension` structure holds the global state for a extension. Due to the multithreaded way Crosswalk is written, one should not store mutable state there. That's the reason `CXWalkExtensionContext` exists: so each page context has its own state and there's no need to worry about race conditions while keeping state between contexts.

The first two fields of a context (`internal_data` and `api`) should not be tampered with. The following fields, though, should be filled: 
- `destroy`, with a pointer to a function that will be called whenever a particular context is about to be destroyed. The prototype is `void destroy(CXWalkExtensionContext *)`.
- `handle_message`, with a pointer to a function that will be called whenever a message arrives from the JavaScript side. The prototype is `void handle_message(CXWalkExtensionContext *, const char *msg)`.

To post a message to the JavaScript side, one can simply call `xwalk_extension_context_post_message()`, defined within the header file. Crosswalk will  handle all the multithreading details so it is safe to call this whenever necessary.

## Loading the Extensions
Be sure to build the extension using each platform's standard naming scheme. If an extension answers for `foo`, then:
- Under Linux, it should be named `libfoo.so`.
- Under MacOS, it should be named `foo.dylib`.
- Under Windows, it should be named `foo.dll`.

All files that match these naming scheme found in the `extensions` subdirectory of an application will be loaded. Libraries will only be considered to be included in the extension subsystem if:
- The shared object loads and links (as it might link to external libraries which might not exist in the user's machine).
- The extension initialization function exists and returns a non-null pointer to a `CXWalkExtension` structure.
- The `api_version` field of said structure is lesser or equal than the `api_version` value passed to the initialization function.
- The `get_javascript` field is non-null.
- The `context_create` field is non-null.

If, when creating a context, the `context_create` function returns NULL, the whole extension will be unloaded.