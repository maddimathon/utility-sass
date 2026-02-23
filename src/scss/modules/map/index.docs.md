---
title: Map
children:
  - ./demo.docs.md
---

# Map Module

This scss "module" is meant as a replacement for the built-in `sass:map` module.

```scss
@use 'pkg:@maddimathon/utility-sass/map'; // adds extras to 'sass:map'

map.flatten(...); // added
map.ksort(...); // added

map.merge(...); // replaces both merge and deep-merge from the built-in module with additional options
map.parse-args(...); // a version of merge that ignores keys in $inputs that aren't in $defaults

map.get(...); // built-in
map.set(...); // built-in
// etc.
```