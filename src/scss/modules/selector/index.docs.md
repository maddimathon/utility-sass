---
title: Selector
children:
  - ./demo.docs.md
---

# Selector Module

This scss "module" is meant as a replacement for the built-in `sass:selector` module.

```scss
@use 'pkg:@maddimathon/utility-sass/selector'; // adds extras to 'sass:selector'

selector.merge(...); // added
selector.parent-exists(...); // added
selector.parent-or-body(...); // added
selector.parent-or-root(...); // added

selector.unify(...); // built-in
// etc.
```