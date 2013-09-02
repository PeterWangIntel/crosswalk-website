# GDB, Running Test, Valgrind and etc.
[Chromium Linux Debugging](https://code.google.com/p/chromium/wiki/LinuxDebugging)

# Printf
## in Chromium source
`LOG(INFO) << "blahblah" << string << int;`

* stack trace
```
#include "base/debug/stack_trace.h"
...
  base::debug::StackTrace trace;
  trace.PrintBacktrace();
```

## in Blink source
`WTFLogAlways("blahblah %s \n", str);`

* stack trace

`WTFReportBacktrace();`

# GPU Debugging
## apitrace
* check out and build apitrace: https://github.com/apitrace/apitrace
* dump trace
`> apitrace trace ./content_shell --in-process-gpu --no-sandbox http://YourInterestedSite`
* debug the dump file
`> qapitrace content_shell.trace`