---
title: Math
---

# Math Module

This scss "module" is meant as a replacement for the built-in `sass:math` module.

```scss
@use '@utility-sass/math'; // adds extras to 'sass:math'

math.deunit(...); // added

math.pow(...); // built-in
math.round(...); // built-in
// etc.
```