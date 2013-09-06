## Checkout
    git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
    add to PATH
    mkdir blink; cd blink
    fetch blink --nosvn=True
    sudo src/build/install-build-deps.sh

Note: --nosvn option of fetch is for non-chromium committers.

## Updating
    gclient sync

gclient also creates the build files, so for using Ninja (you should) to the following and rerun:

    export GYP_GENERATORS='ninja'
    gclient sync

## Build
    ninja -C out/[type] -j [cores] -l 20 [target]
where [type] is "Release" or "Debug"
[cores] the number of cores you like to build with
[target] the target, i.e. content_shell, DumpRenderTree or "chrome" or all_webkit. To build all of Blink and the DumpRenderTree use the following:

    ninja -C out/[type] -j [cores] -l 20 all_webkit DumpRenderTree

## To recreate build files without refetching 
    gclient runhooks