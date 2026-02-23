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
@forward 'pkg:@maddimathon/utility-sass/template/config' with (
    ...
);
```

Optionally, in a tokens file, `tokens.scss`:

```scss
@forward 'pkg:@maddimathon/utility-sass/template/tokens' with (
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
@use 'config'; // if applicable
@use 'tokens'; // if applicable

@use 'pkg:@maddimathon/utility-sass'; // if applicable, for functions,mixins, etc.

// your styles
```