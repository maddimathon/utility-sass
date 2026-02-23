---
title: Meta
children:
  - ./demo.docs.md
---

# Meta Module

This scss "module" is meant as a replacement for the built-in `sass:meta` module.

```scss
@use 'pkg:@maddimathon/utility-sass/meta'; // adds extras to 'sass:meta'

meta.current-version(...); // added
meta.var-dump(...); // added
meta.var-type-abbreviator(...); // added

meta.type-of(...); // built-in
// etc.
```