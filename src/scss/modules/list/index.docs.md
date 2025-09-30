---
title: List
children:
  - ./demo.docs.md
---

# List Module

This scss "module" is meant as a replacement for the built-in `sass:list` module.

```scss
@use '@utility-sass/list'; // adds extras to 'sass:list'

list.except(...); // added
list.flatten(...); // added
list.only(...); // added
list.reverse(...); // added
list.sort(...); // added
list.unique(...); // added

list.index(...); // built-in
list.nth(...); // built-in
// etc.
```