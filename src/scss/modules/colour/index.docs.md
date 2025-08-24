---
title: Colour
---

# Colour Module

This scss "module" is meant as a replacement for the built-in `sass:color` module.

```scss
@use '@utility-sass/colour'; // adds extras to 'sass:color'

colour.mix-oklch(...); // added
colour.to-hsl(...); // added

colour.adjust(...); // built-in
// etc.
```