---
title: Global Template
---

# Global Template

{@include ./desc.docs.md}

Forwards the package's [design tokens template](../design-tokens/index.docs.md).


## General Use

Optionally, in a configuration file, `config.scss`:

```scss
@forward 'pkg:@maddimathon/utility-sass/templates/global/config' with (
    ...
);
```

Optionally, in a tokens file, `tokens.scss`:

```scss
@forward 'pkg:@maddimathon/utility-sass/templates/global/tokens' with (
    ...
);
```

In your main stylesheet, `index.scss`:

```scss
@forward 'config'; // if applicable
@forward 'tokens'; // if applicable

@forward 'pkg:@maddimathon/utility-sass/templates/global';

// your styles
```

In your partials, `*/*.scss`:

```scss
@use 'config'; // if applicable
@use 'tokens'; // if applicable

@use 'pkg:@maddimathon/utility-sass/colour'; // replaces 'sass:color'
@use 'pkg:@maddimathon/utility-sass/list'; // replaces 'sass:list'
@use 'pkg:@maddimathon/utility-sass/map'; // replaces 'sass:map'
@use 'pkg:@maddimathon/utility-sass/math'; // replaces 'sass:math'
@use 'pkg:@maddimathon/utility-sass/meta'; // replaces 'sass:meta'
@use 'pkg:@maddimathon/utility-sass/selector'; // replaces 'sass:selector'
@use 'pkg:@maddimathon/utility-sass/string'; // replaces 'sass:string'

@use 'pkg:@maddimathon/utility-sass/templates/global' as lib;

// your styles
```