---
title: Demo
children:
  - ./demo.docs.md
---

# Demo Module

This scss "module" is meant to use for testing (or demo-ing) the output of sass
functions and mixins, including utilities for arglist values.

```scss
@use 'pkg:@maddimathon/utility-sass/demo';

demo.args-dump(...); // added

@include demo.function(...) { } // added
@include demo.selector-function(...) { } // added

@include demo.mixin(...) { } // added
```