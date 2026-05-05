---
title: Selector
children:
  - ./demo.docs.md
---

# Selector Module

This scss "module" is meant as a replacement for the built-in `sass:selector` module.

```scss
@use 'pkg:@maddimathon/utility-sass/selector'; // adds extras to 'sass:selector'

selector.add-body-selector(...); // added
selector.add-root-selector(...); // added

selector.has-body(...); // added
selector.has-root(...); // added

selector.is-body(...); // added
selector.is-root(...); // added

selector.merge(...); // added

selector.parent-exists(...); // added

selector.parent-has-body(...); // added
selector.parent-has-root(...); // added

selector.parent-is-body(...); // added
selector.parent-is-root(...); // added

selector.parent-or-body(...); // added
selector.parent-or-root(...); // added

selector.replace-body-selector(...); // added
selector.replace-root-selector(...); // added

selector.has-list(...); // added
selector.is-list(...); // added
selector.not-list(...); // added
selector.where-list(...); // added

@include selector.add-body-selector(...) {} // added
@include selector.add-root-selector(...) {} // added

@include selector.has(...) {} // added
@include selector.is(...) {} // added
@include selector.not(...) {} // added
@include selector.where(...) {} // added

selector.unify(...); // built-in
// etc.
```