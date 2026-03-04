---
title: Default Template
---

# Default Template

{@include ./desc.docs.md}

Forwards the package's [config](../../config/index.docs.md),
[tokens](../../tokens/index.docs.md), and [library](../../lib/index.docs.md).


## General Use

Optionally, in a configuration file, `config.scss`:

```scss
@forward 'pkg:@maddimathon/utility-sass/config' with (
    ...
); // you should forward this before the template config if you want to override any vars

@forward 'pkg:@maddimathon/utility-sass/template/config' with (
    ...
); // for template config vars that control output but don't affect lib functions
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

@forward 'pkg:@maddimathon/utility-sass/template';

// your styles
```

In your partials, `*/*.scss`:

```scss
@use '../config'; // if applicable
@use '../tokens'; // if applicable

@use 'pkg:@maddimathon/utility-sass/math'; // if applicable, for modules

@use 'pkg:@maddimathon/utility-sass' as *; // if applicable, for lib functions,mixins, etc.

// your styles
```