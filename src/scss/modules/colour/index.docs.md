---
title: Colour
children:
  - ./demo.docs.md
---

# Colour Module

This scss "module" is meant as a replacement for the built-in `sass:color` module.

```scss
@use 'pkg:@maddimathon/utility-sass/colour'; // adds extras to 'sass:color'

colour.mix-oklch(...); // added
colour.shade-map(...); // added
colour.shade-map-reverse-key(...); // added
colour.to-hsl(...); // added
colour.to-hsl-list(...); // added
colour.to-rgb(...); // added
colour.to-rgb-list(...); // added

colour.adjust(...); // built-in
// etc.
```