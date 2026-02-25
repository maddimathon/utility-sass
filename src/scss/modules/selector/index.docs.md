---
title: Selector
children:
  - ./demo.docs.md
---

# Selector Module

This scss "module" is meant as a replacement for the built-in `sass:selector` module.

```scss
@use 'pkg:@maddimathon/utility-sass/selector'; // adds extras to 'sass:selector'

selector.is-body(...); // added
selector.is-root(...); // added
selector.merge(...); // added
selector.parent-exists(...); // added
selector.parent-or-body(...); // added
selector.parent-or-root(...); // added

selector.has-list(...); // added
selector.is-list(...); // added
selector.not-list(...); // added
selector.where-list(...); // added

@include selector.has(...) {} // added
@include selector.is(...) {} // added
@include selector.not(...) {} // added
@include selector.where(...) {} // added

selector.unify(...); // built-in
// etc.
```