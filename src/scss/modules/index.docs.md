---
title: Modules
children:
  - ./colour/index.docs.md
  - ./list/index.docs.md
  - ./map/index.docs.md
  - ./math/index.docs.md
  - ./meta/index.docs.md
  - ./selector/index.docs.md
  - ./string/index.docs.md
---

# Sass (scss) Modules

These scss "modules" are meant as replacements for the built-in sass modules.

**Generally, do not `@forward` these modules**, unless you would also forward
the built-in module it is meant to replace (which is generally not recommended).

For example:
```scss
@use '@utility-sass/list'; // adds extras to 'sass:list'

list.flatten(...); // added

list.index(...); // built-in
list.nth(...); // built-in
```

**Modules:**
- [colour](./colour/index.docs.md)
- [list](./list/index.docs.md)
- [map](./map/index.docs.md)
- [math](./math/index.docs.md)
- [meta](./meta/index.docs.md)
- [selector](./selector/index.docs.md)
- [string](./string/index.docs.md)