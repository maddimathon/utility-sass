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


## **0.1.0-alpha.35** — 2026-02-24

Another minor mixin fix


## **0.1.0-alpha.34** — 2026-02-24

Very minor mixin fixes


## **0.1.0-alpha.33** — 2026-02-24

### Added
- Scss map module function - parse-args
- Scss config vars:
    - $fn_gapValue_block_layout_low
    - $fn_gapValue_block_layout_high
    - $fn_gapValue_inline_indent_low
    - $fn_gapValue_inline_indent_high
    - $fn_gapValue_inline_layout_low
    - $fn_gapValue_inline_layout_high
    - $fn_gapValue_inline_tab_low
    - $fn_gapValue_inline_tab_high


## **0.1.0-alpha.32** — 2026-02-23

### Added
- Added JS utilities - mapToObject, mapToObjectAsync


## **0.1.0-alpha.31** — 2026-02-20

### Added
- JS function jsValueToSass() (from scss-templater WIP)


## **0.1.0-alpha.30** — 2026-02-19

### Added
- Scss config vars - $fn_debugCheckpoint, $fn_debugCheckpoint_locationPrefix,
  and $fn_debugCheckpoint_verbose for better checkpoint debugging


## **0.1.0-alpha.29** — 2026-02-19

### Added
- New $method param for math.round-to-pixel
- Added sassValueToJS function (from scss-templater WIP)
- New sass compiler functions - js-var-dump() and debug-checkpoint()

### Fixed
- Updated build-utilities


## **0.1.0-alpha.28** — 2026-02-13

### Added
- config-valid-number function now has optional $unit param


## **0.1.0-alpha.27** — 2026-02-12

Minor bug fixes to styles.


## **0.1.0-alpha.26** — 2026-02-12

More colour converting functions.

### Added
- Colour module functions - to-hsl-list, to-rgb, to-rgb-list

### Fixed
- Bug in new do-var() function fallbacks


## **0.1.0-alpha.25** — 2026-01-31

### Added
- New do-var function
- Config var - $customPropertyPrefix_asFallbackOnly


## **0.1.0-alpha.24** — 2026-01-30

### Misc. Breaking
- Changed param from $lh to $lineHeight in mixins - snippet-button, snippet-input, snippet-label

### Added
- New mixin - snippet-focus-ring


## **0.1.0-alpha.23** — 2026-01-30

### Changed
- Added more optional parameters to snippet mixins for inputs and labels


## **0.1.0-alpha.22** — 2026-01-30

### Added
- Now sorting token maps by key for prettier css output
- Config var - $margin_base


## **0.1.0-alpha.21** — 2026-01-27

### Added
- Optional $useMarginValue param to gap-value, gap-value, gap-value (default set
  by $fn_gapValue_useMarginValue in config)

### Fixed
- Issue with new gap-value calculations for inline-layout and inline-layout-half (from 0.1.0-alpha.19)


## **0.1.0-alpha.20** — 2026-01-27

### Added
- New config value - $fn_gapValue_useMarginValue (default true)


## **0.1.0-alpha.19** — 2026-01-27

### Added
- New config vars:
    - $fn_borderWidthValue_roundToPixelFactor
    - $fn_lineHeightValue_roundToPixelFactor
- Optional $multiplier param to:
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


## **0.1.0-alpha.18** — 2026-01-26

### Added
- Optional $comment param to custom-property and cx-prop mixins
- Optional $relative param to fs-value and clamp-font-size
- Config var - $mx_tokensFontSize_printRelative - to add --fs-rel-[...] variables


## **0.1.0-alpha.17** — 2026-01-23

Updated dependencies.


## **0.1.0-alpha.16** — 2026-01-20

Minor fixes.


## **0.1.0-alpha.15** — 2026-01-20

### Added
- `--pad-[firm|soft|half]-000` vars for em versions of `--mrg-[firm|soft|half]-000`
- math scss module functions - add-unit(), always-one()


## **0.1.0-alpha.14** — 2026-01-20

Added config variables to replace token var(...) with their fallback values
instead.


## **0.1.0-alpha.13** — 2026-01-19

Switched custom-property mixin to cx-prop.


## **0.1.0-alpha.12** — 2026-01-19

Testing $customPropertyPrefix config var.


## **0.1.0-alpha.11** — 2025-12-28

### Fixed
- Switched immutable import used in sass_getCurrentVersion to avoid importing
  the whole namespace (which caused issues in dependent libraries using vite)


## **0.1.0-alpha.10** — 2025-12-28

Added immutable to dependencies (previously overlooked).


## **0.1.0-alpha.9** — 2025-12-28

### Misc. Breaking
- Switched SemVer version used in sass_getCurrentVersion to remove the Logger
  instance requirement (which caused issues in dependent libraries using vite)


## **0.1.0-alpha.8** — 2025-12-27

### Added
- Custom sass compiler functions to support advanced utilities in the modules
- Sass compiler opts builder function
- Scss function - current-version()


## **0.1.0-alpha.7** — 2025-12-02

Quick fix to link button utilities that were broken by switch to `a[href]`
selectors.


## **0.1.0-alpha.6** — 2025-12-01

'Unstyled' heading utilities, better system color fallbacks, and better list
styles.

### Added
- Added unstyled-heading utility class and $includeUnstyledHeadingProps prop in
  snippet-heading
- New snippet-unstyled-heading mixin

### Changed
- `%a` is now extended by `a[href]`, not just `a`

### Fixed
- Added explicit css supports queries for system colours with fallbacks
- Scss list style fixes for better extension of list exceptions (e.g., ol lists
  to display as ul, as in the utility-astro TableOfContents styles)


## **0.1.0-alpha.5** — 2025-11-15

### Breaking
- Changed feature-check module's js-support mixin to supports and js-no-support
  mixin to supports-not


## **0.1.0-alpha.4** — 2025-11-03

More very minor mixin tweaks.


## **0.1.0-alpha.3** — 2025-11-02

Added config var: $mx_colourModeEach_nestModeSelectors


## **0.1.0-alpha.2** — 2025-11-02

Super minor change to region comments in colour-mode-each.


## **0.1.0-alpha.1** — 2025-10-29

Trying a couple minor config updates to let this private package be installed in
gh actions to publish other packages.


## **0.1.0-alpha** — 2025-10-29

A quick pre-release before removing templates.  Version 0.1.0 won't progress
beyond alpha.


## **0.1.0-pre.5** — 2025-10-22

Fixed issue in no-motion selectors and queries causing reduced-motion to never
be respected.


## **0.1.0-pre.4** — 2025-10-22

Fixed heading style inheritance issue


## **0.1.0-pre.3** — 2025-10-22

- Button style improvements (specifically for icon pseudo elements in design-system-utilities)
- Minor scss improvements


## **0.1.0-pre.2** — 2025-10-21

Switched token values that were string-ified numbers with units to return actual
numbers.


## **0.1.0-pre.1** — 2025-10-19

Added $fn_fontSizeValue_defaultFontScale config for fs-value() function default


## **0.1.0-pre.0** — 2025-10-18

Test release during development; not for use