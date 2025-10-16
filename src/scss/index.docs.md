---
title: Sass Exports
children:
  - ./config/index.docs.md
  - ./lib/index.docs.md
  - ./modules/index.docs.md
  - ./template/index.docs.md
  - ./tokens/index.docs.md
---

# Sass (scss)

This is rough, spotty documentation for the scss in this package.  For now it is
manually-updated, which is why it is spotty.  Generally, the code itself is
well-documented and a better reference.

**Check out the:**
- [configuration](./config/index.docs.md)
- [modules](./modules/index.docs.md)
- [templates](./template/index.docs.md)

## General Use

Optionally, in a configuration file, `config.scss`:

```scss
@forward 'pkg:@maddimathon/utility-sass/config' with (
    ...
);
```

Optionally, in a tokens file, `tokens.scss`:

```scss
@forward 'pkg:@maddimathon/utility-sass/tokens' with (
    ...
);
```

In your main stylesheet, `index.scss`:

```scss
@forward 'config'; // if applicable
@forward 'tokens'; // if applicable

@forward 'pkg:@maddimathon/utility-sass';

// your styles
```

In your partials, `*/*.scss`:

```scss
@use '../config'; // if applicable
@use '../tokens'; // if applicable

@use 'pkg:@maddimathon/utility-sass/colour'; // replaces 'sass:color'
@use 'pkg:@maddimathon/utility-sass/list'; // replaces 'sass:list'
@use 'pkg:@maddimathon/utility-sass/map'; // replaces 'sass:map'
@use 'pkg:@maddimathon/utility-sass/math'; // replaces 'sass:math'
@use 'pkg:@maddimathon/utility-sass/meta'; // replaces 'sass:meta'
@use 'pkg:@maddimathon/utility-sass/selector'; // replaces 'sass:selector'
@use 'pkg:@maddimathon/utility-sass/string'; // replaces 'sass:string'

@use 'pkg:@maddimathon/utility-sass' as *;

// your styles
```