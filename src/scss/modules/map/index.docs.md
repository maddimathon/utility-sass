---
title: Map
---

# Map Module

This scss "module" is meant as a replacement for the built-in `sass:map` module.

```scss
@use '@utility-sass/map'; // adds extras to 'sass:map'

map.flatten(...); // added
map.ksort(...); // added

map.merge(...); // replaces both merge and deep-merge from the built-in module with additional options

map.get(...); // built-in
map.set(...); // built-in
// etc.
```