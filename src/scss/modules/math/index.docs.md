---
title: Math
children:
  - ./demo.docs.md
---

# Math Module

This scss "module" is meant as a replacement for the built-in `sass:math` module.

```scss
@use 'pkg:@maddimathon/utility-sass/math'; // adds extras to 'sass:math'

math.deunit(...); // added

math.pow(...); // built-in
math.round(...); // built-in
// etc.
```