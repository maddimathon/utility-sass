---
title: Configuration
---

# Sass (scss) Configuration

This is the config entry point and includes variables (and validation functions)
used to configure options in all other sass exports (including modules, in some
cases).  As such, if you need to configure this library, you should
**`@forward`** the config file with your overrides before
`@import`/`@forward`/`@use`-ing any other files in this package.

## Use

See [Sass Exports](../index.docs.md) or the [Default Template](../template/default/index.docs.md)
for details.