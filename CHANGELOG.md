---
title: Changelog
---

# Utility Sass Changelog

All notable changes to this project will be documented in this file after/on
each release.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to 
[Semantic Versioning](https://semver.org/spec/v2.0.0.html), i.e.:
> Given a version number `MAJOR`.`MINOR`.`PATCH`, increment the:
> - `MAJOR` version when you make incompatible changes
> - `MINOR` version when you add backwards-compatible functionality
> - `PATCH` version when you make backwards-compatible bug fixes


<!--CHANGELOG_NEW-->


## **0.1.0-alpha** to **0.1.0-alpha.41** — 2025-10-29 to 2026-03-03

### Removed
- Removed button-secondary styles (as part of the slow move for templates to
  scss-templater and design-system-utilities) [0.1.0-alpha.39 — 2026-02-25]

### Moved & Renamed
- Changed feature-check module's js-support mixin to supports and js-no-support
  mixin to supports-not [0.1.0-alpha.5 — 2025-11-15]

### Misc. Breaking
- Switched SemVer version used in sassFn_getCurrentVersion to remove the Logger
  instance requirement (which caused issues in dependent libraries using vite) [0.1.0-alpha.9 — 2025-12-28]
- Changed param from $lh to $lineHeight in mixins - snippet-button, snippet-input, snippet-label [0.1.0-alpha.24 — 2026-01-30]

### Added
- Added unstyled-heading utility class and $includeUnstyledHeadingProps prop in
  snippet-heading [0.1.0-alpha.6 — 2025-12-01]
- Custom sass compiler functions to support advanced utilities in the modules [0.1.0-alpha.8 — 2025-12-27]
- Sass compiler opts builder function [0.1.0-alpha.8 — 2025-12-27]
- `--pad-[firm|soft|half]-000` vars for em versions of `--mrg-[firm|soft|half]-000` [0.1.0-alpha.15 — 2026-01-20]
- New optional $comment param to custom-property and cx-prop mixins [0.1.0-alpha.18 — 2026-01-26]
- New optional $relative param to fs-value and clamp-font-size [0.1.0-alpha.18 — 2026-01-26]
- New optional $multiplier param to: [0.1.0-alpha.19 — 2026-01-27]
    - functions:
        - border-width-value (also added optional $unit param)
        - fs-value
        - gap-value
        - gap-block-value
        - gap-inline-value
        - line-height-value
        - mrg-value-soft
        - mrg-value-half
        - mrg-value-firm
        - stroke-relative-value (also added optional $unit param)
        - width-value
    - mixin:
        - tokens-border-width
        - tokens-font-size
        - tokens-gap
        - tokens-line-height
        - tokens-margin
        - tokens-stroke-relative
        - tokens-widths
- New optional $useMarginValue param to gap-value, gap-value, gap-value (default
  set by $fn_gapValue_useMarginValue in config) [0.1.0-alpha.21 — 2026-01-27]
- config-valid-number function now has optional $unit param [0.1.0-alpha.28 — 2026-02-13]
- New $method param for math.round-to-pixel [0.1.0-alpha.29 — 2026-02-19]
- Added sassValueToJS function (from scss-templater WIP) [0.1.0-alpha.29 — 2026-02-19]
- New sass compiler functions - js-var-dump() and debug-checkpoint() [0.1.0-alpha.29 — 2026-02-19]
- Added JS utilities - mapToObject, mapToObjectAsync [0.1.0-alpha.32 — 2026-02-23]
- JS function jsValueToSass() (from scss-templater WIP) [0.1.0-alpha.31 — 2026-02-20]
- Scss now sets scroll-padding-top if $include_html with a `scroll-padding-top`
  cx prop (which itself is set using an unset `height-nav-primary` prop that
  falls back to 0) [0.1.0-alpha.36 — 2026-02-25]
- extend-selectors-* mixins now have $additional_optional param for always-optional selectors [0.1.0-alpha.38 — 2026-02-25]
- extend-selectors-generic mixin is now public (was _extend-selectors) [0.1.0-alpha.38 — 2026-02-25]

#### Config
- New variables:
    - $customPropertyPrefix_asFallbackOnly [0.1.0-alpha.25 — 2026-01-31]
    - $fn_borderWidthValue_roundToPixelFactor [0.1.0-alpha.19 — 2026-01-27]
    - $fn_debugCheckpoint [0.1.0-alpha.30 — 2026-02-19]
    - $fn_debugCheckpoint_locationPrefix [0.1.0-alpha.30 — 2026-02-19]
    - $fn_debugCheckpoint_verbose [0.1.0-alpha.30 — 2026-02-19]
    - $fn_gapValue_block_layout_high [0.1.0-alpha.33 — 2026-02-24]
    - $fn_gapValue_block_layout_low [0.1.0-alpha.33 — 2026-02-24]
    - $fn_gapValue_inline_indent_high [0.1.0-alpha.33 — 2026-02-24]
    - $fn_gapValue_inline_indent_low [0.1.0-alpha.33 — 2026-02-24]
    - $fn_gapValue_inline_layout_high [0.1.0-alpha.33 — 2026-02-24]
    - $fn_gapValue_inline_layout_low [0.1.0-alpha.33 — 2026-02-24]
    - $fn_gapValue_inline_tab_high [0.1.0-alpha.33 — 2026-02-24]
    - $fn_gapValue_inline_tab_low [0.1.0-alpha.33 — 2026-02-24]
    - $fn_gapValue_useMarginValue (default true) [0.1.0-alpha.20 — 2026-01-27]
    - $fn_lineHeightValue_roundToPixelFactor [0.1.0-alpha.19 — 2026-01-27]
    - $margin_base [0.1.0-alpha.22 — 2026-01-30]
    - $mx_colourModeEach_nestModeSelectors [0.1.0-alpha.3 — 2025-11-02]
    - $mx_tokensFontSize_printRelative - to add --fs-rel-[...] variables [0.1.0-alpha.18 — 2026-01-26]
    - $page_top [0.1.0-alpha.36 — 2026-02-25]
- Added config variables to replace token var(...) with their fallback values instead. [0.1.0-alpha.14 — 2026-01-20]

#### New Scss Functions & Mixins
- Module functions:
    - colour.to-hsl-list() [0.1.0-alpha.26 — 2026-02-12]
    - colour.to-rgb() [0.1.0-alpha.26 — 2026-02-12]
    - colour.to-rgb-list() [0.1.0-alpha.26 — 2026-02-12]
    - list.text-join() [0.1.0-alpha.37 — 2026-02-25]
    - map.parse-args [0.1.0-alpha.33 — 2026-02-24]
    - math.add-unit() [0.1.0-alpha.15 — 2026-01-20]
    - math.always-one() [0.1.0-alpha.15 — 2026-01-20]
    - meta.current-version() [0.1.0-alpha.8 — 2025-12-27]
    - selector.has-list() [0.1.0-alpha.37 — 2026-02-25]
    - selector.is-list() [0.1.0-alpha.37 — 2026-02-25]
    - selector.not-list() [0.1.0-alpha.37 — 2026-02-25]
    - selector.where-list() [0.1.0-alpha.37 — 2026-02-25]
- Module mixins:
    - selector.has [0.1.0-alpha.37 — 2026-02-25]
    - selector.is [0.1.0-alpha.37 — 2026-02-25]
    - selector.not [0.1.0-alpha.37 — 2026-02-25]
    - selector.where [0.1.0-alpha.37 — 2026-02-25]
- Lib functions:
    - do-var [0.1.0-alpha.25 — 2026-01-31]
    - scroll-padding-top-value [0.1.0-alpha.36 — 2026-02-25]
    - var-scroll-padding-top [0.1.0-alpha.36 — 2026-02-25]
- Lib mixins:
    - snippet-focus-ring [0.1.0-alpha.24 — 2026-01-30]
    - snippet-unstyled-heading mixin [0.1.0-alpha.6 — 2025-12-01]

### Changed
- Super minor change to region comments in colour-mode-each. [0.1.0-alpha.2 — 2025-11-02]
- More very minor mixin tweaks. [0.1.0-alpha.4 — 2025-11-03]
- `%a` is now extended by `a[href]`, not just `a` [0.1.0-alpha.6 — 2025-12-01]
- Now sorting token maps by key for prettier css output [0.1.0-alpha.22 — 2026-01-30]
- Added more optional parameters to snippet mixins for inputs and labels [0.1.0-alpha.23 — 2026-01-30]

### Fixed
- Minor fixes to let private package be installed in gh actions. [0.1.0-alpha.1 — 2025-10-29]
- Added explicit css supports queries for system colours with fallbacks [0.1.0-alpha.6 — 2025-12-01]
- Scss list style fixes for better extension of list exceptions (e.g., ol lists
  to display as ul, as in the utility-astro TableOfContents styles) [0.1.0-alpha.6 — 2025-12-01]
- Quick fix to link button utilities that were broken by switch to `a[href]` selectors. [0.1.0-alpha.7 — 2025-12-02]
- Added immutable to dependencies. [0.1.0-alpha.10 — 2025-12-28]
- Switched immutable import used in sassFn_getCurrentVersion to avoid importing
  the whole namespace (which caused issues in dependent libraries using vite)
  [0.1.0-alpha.11 — 2025-12-28]
- Switched custom-property mixin to cx-prop. [0.1.0-alpha.13 — 2026-01-19]
- Testing $customPropertyPrefix config var. [0.1.0-alpha.12 — 2026-01-19]
- Issue with new gap-value calculations for inline-layout and inline-layout-half (from 0.1.0-alpha.19) [0.1.0-alpha.21 — 2026-01-27]
- Scss config param $fn_fontSizeValue_roundToPixelFactor now applies properly
  (was missing in one case of fs-value) [0.1.0-alpha.41 — 2026-03-03]
- Fixed gap tokens merging [0.1.0-alpha.41 — 2026-03-03]


## **0.1.0-pre.0** to **0.1.0-pre.5** — 2025-10-18 to 2025-10-22

First releases, mostly for testing.

### Added
- $fn_fontSizeValue_defaultFontScale config var function default [0.1.0-pre.1 — 2025-10-19]

### Changed
- Switched token values that were string-ified numbers with units to return
  actual numbers. [0.1.0-pre.2 — 2025-10-21]

### Fixed
- Button style improvements (specifically for icon pseudo elements inæ
  design-system-utilities) [0.1.0-pre.3 — 2025-10-22]
- Minor scss improvements [0.1.0-pre.3 — 2025-10-22]
- Fixed heading style inheritance issue [0.1.0-pre.4 — 2025-10-22]
- Fixed issue in no-motion selectors and queries causing reduced-motion to never
  be respected. [0.1.0-pre.5 — 2025-10-22]