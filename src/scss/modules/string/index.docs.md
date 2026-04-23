---
title: String
children:
  - ./demo.docs.md
---

# String Module

This scss "module" is meant as a replacement for the built-in `sass:string` module.

```scss
@use 'pkg:@maddimathon/utility-sass/string'; // adds extras to 'sass:string'

string.concat(...); // added
string.join(...); // added
string.match(...); // added
string.regex-replace(...); // added
string.regex-split(...); // added
string.replace(...); // added
string.slugify(...); // added

string.index(...); // built-in
string.nth(...); // built-in
// etc.
```