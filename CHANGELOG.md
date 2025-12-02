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
- Added explicit @supports for system colours with fallbacks
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