---
title: String
children:
  - ./demo.docs.md
---

# String Module

This scss "module" is meant as a replacement for the built-in `sass:string` module.

```scss
@use 'pkg:@maddimathon/utility-sass/string'; // adds extras to 'sass:string'

string.replace(...); // added
string.slugify(...); // added

string.index(...); // built-in
string.nth(...); // built-in
// etc.
```