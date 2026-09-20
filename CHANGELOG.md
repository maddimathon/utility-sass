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


## **0.1.0-beta.1** — 2026-09-19

Dependency updates.


## **0.1.0-beta.0** — 2026-09-19

Tons of new config vars, tons of new selector module functions, plus list, map,
math, meta, string module functions, and more.

### Removed
- Removed functions - mapToObject(), mapToObjectAsync() (now in utility-typescript instead)
- Removed type - RecursiveRecord (now in utility-typescript instead)
- Removed config vars:
    - $cxPropPre
    - $internal_customTokensDefault
    - $fn_clampFontSize_multiplier_svw
    - $fn_gapValue_useMarginValue
    - $page_top
- Removed template config var - $template_internal_supressCredit
- Removed functions:
    - token-map()
- Removed mixins:
    - snippet-centre-callout-block (was an overcomplication that creates downstream issues)
    - breakpoint (replaced with breakpoint-min-or-max and breakpoint-minmax-range)
- Removed module functions:
    - list.text-join (replaced by string.join and string.concat)
- Removed unnecessary interpolation in property values

### Moved & Renamed
- Moved extend-selectors mixin to template (for better config) - also changed param names
- Merged template config vars $template_include_buttons and
  $template_include_headings into $template_styles map
- Moved from config to tokens:
    - $breakpoints
- Moved from config to tokens (and renamed):
    - $fn_fontSizeValue_defaultFontScale → $fontSize_base
- Moved from lib config to modules config (and renamed):
    - $fn_clampFontSize_multiplier_max → $math_clampFontSize_multiplier_max
    - $fn_clampFontSize_multiplier_min → $math_clampFontSize_multiplier_min
    - $fn_clampFontSize_svw_rem → $math_clampFontSize_baseRem
    - $fn_fontSizeValue_roundToPixelFactor → $math_fontSize_roundingFactor
- Moved from lib config to template config (and renamed):
    - $print_globals → $template_globals
    - $print_headings → $template_cssHeadings
    - $print_normalize → $template_normalize
    - $print_tokens → $template_tokens
    - $print_utils → $template_utils
- Renamed config vars (for more consistency in their impacts/casing):
    - $customPropertyPrefix_asFallbackOnly → $customPropertyPrefix_asFallback
    - $fn_debugCheckpoint → $debug_checkpoints
    - $fn_debugCheckpoint_verbose → $debug_checkpoints_verbose
    - $include_defaultMediaQueries → $mx_colourMode_includeLightModeQuery
    - $include_noPreferenceMediaQueries → $mx_colourMode_includeNoPreferenceQueries
    - $mx_colourMode_includeQuery_default → $mx_colourMode_includeQuery
    - $mx_colourMode_includeSelectors_default → $mx_colourMode_includeSelectors
    - $mx_colourModeEach_includeSelectors_forcedColors → $mx_colourModeEach_includeForcedColorsSelectors
    - $mx_colourModeEach_nestModeSelectors → $fn_colourMode_selectorsAsChildren
    - $mx_extendHeadingsByRole → $selector_headingsByRole
    - $mx_interactive_states_include_fallbacks → $mx_focusVisible_includeFallbacks
    - $mx_interactive_states_include_fallbacks_only → $mx_focusVisible_fallbacksOnly
    - $mx_tokensFontSize_printRelative → $mx_tokens_fontSize_printRelative
- Renamed template config vars (for more consistency in their impacts/casing):
    - $print_templateDocBlock → $template_docBlock
- Renamed token vars (for more consistency with design-system-utilities):
    - $border_widths → $border_width
    - $customTokens → $style
    - $font_sizes → $font_size
    - $gaps → $gap
    - $line_heights → $line_height
    - $margins → $margin
    - $strokes_relative → $stroke_relative
    - $widths → $width
- Moved from lib to modules and renamed:
    - call-global-util-fn() → meta.call-global-compiler-fn()
    - get-global-util-fn() → meta.get-global-compiler-fn()
- Moved from lib to module:
    - js-var-dump() → meta.js-var-dump()
- Moved template config directory to `src/config/` directory
- Renamed functions:
    - is-colour-mode-included() → is-colour-mode-active()
    - token-value() → style-value()
    - var-token() → var-style()
- Renamed mixins:
    - tokens-custom → tokens-style
- Removed params from extend-selectors-* mixins: $additional_optional, $optional
- Renamed colour mode functions & mixins args:
    - $nestParentSelector → $addGlobalModeSelector
    - $unifyParentSelector → $unifySelectors
    - $wrapParentSelector → $nestModeSelector

### Misc. Breaking
- Templates no longer forward config or lib
- New config var $featureCheck_jsOnlyAsNeeded now defaults to true, which will
  change output for feature-check.supports and feature-check.supports-not mixins
- Better template structure: created new scss/lib/04-templates directory for
  better modular output & cascading in output stylesheets of libraries that
  extend this one

### Added

#### Added to Scss
- New module: demo
- New config functions:
    - config-enforce-type-or-warn()
    - config-get-template-styles()
    - config-valid-function()
    - config-valid-mixin()
    - config-valid-token-level()
    - custom-property-prefix-all-exists()
    - custom-property-prefix-exists()
    - custom-property-prefix-fallback-exists()
- New config vars:
    - $breakpoints_attributeOverrides
    - $breakpoints_attributeOverrides_includeRoot
    - $colour_allowModernOpacitySyntax
    - $colour_channelLists_separator
    - $config_validTokenLevels (used only by config-valid-token-level)
    - $customPropertyPrefix_fallback
    - $demo_includeNameWithContent
    - $demo_separateSignature
    - $demo_signatureAsRegion
    - $demo_signatureAtRoot
    - $demo_wrapCallSignature_mixin
    - $demo_wrapOutput
    - $demo_wrapOutput_function_withName
    - $featureCheck_defaultToJS
    - $featureCheck_defaultToJS_supports
    - $featureCheck_defaultToJS_supports_not
    - $featureCheck_includeNoWhereSelectorFallback
    - $featureCheck_includeNoWhereSelectorFallback_supports_not
    - $featureCheck_jsOnlyAsNeeded
    - $featureCheck_jsScreenMediaQuery
    - $featureCheck_neverUseJS
    - $featureCheck_supports
    - $featureCheck_supportsQueries
    - $fn_breakpoints_gapDoubler
    - $fn_breakpointValue_roundToPixelFactor
    - $fn_var_replaceWithValue_resist
    - $include_linkVisitedState
    - $internal_utilitySass_stylesheetPath
    - $math_clampFontSize_viewport_max
    - $math_clampFontSize_viewport_min
    - $mx_colourModeCombo_includeForcedColorsSelectors
    - $mx_focusVisible_includeNoWhereSelectorFallback
    - $mx_focusWithin_useHas
    - $mx_interactive_isolateSelector_active
    - $mx_interactive_isolateSelector_focus
    - $mx_interactiveStates_featureCheck_viaQuery
    - $mx_normalizeOrReset_codeFontFamily_usePseudo
    - $mx_normalizeOrReset_includeColorScheme
    - $mx_normalizeOrReset_includeFontFamily
    - $mx_normalizeOrReset_includeFontSize
    - $mx_normalizeOrReset_includeFontSmoothing
    - $mx_prop_useCustom_display
    - $mx_prop_useCustom_display
    - $mx_prop_useCustom_never
    - $mx_reset_doUniversalBoxSizing
    - $mx_reset_headingsByRole
    - $mx_reset_useHeadingPseudo
    - $mx_tokens_print_atProperty
    - $mx_tokens_print_atProperty
    - $mx_tokens_print_borderWidth
    - $mx_tokens_print_borderWidth
    - $mx_tokens_print_fontSize
    - $mx_tokens_print_fontSize
    - $mx_tokens_print_gap
    - $mx_tokens_print_gap
    - $mx_tokens_print_lineHeight
    - $mx_tokens_print_lineHeight
    - $mx_tokens_print_margin
    - $mx_tokens_print_margin
    - $mx_tokens_print_strokeRelative
    - $mx_tokens_print_strokeRelative
    - $mx_tokens_print_style
    - $mx_tokens_print_style
    - $mx_tokens_print_sysColours
    - $mx_tokens_print_sysColours
    - $mx_tokens_print_width
    - $mx_tokens_print_width
    - $mx_tokens_printAll
    - $mx_tokens_printAll
    - $selector_a
    - $selector_a_current
    - $selector_a_disabled
    - $selector_body_aliases
    - $selector_button_disabled
    - $selector_input_disabled
    - $selector_input_readonly
    - $selector_interactiveState_active
    - $selector_interactiveState_focus
    - $selector_root_aliases
    - $template_extendSelectors
    - $template_slug
    - $template_title
    - $warnOnMissingCompilerFunctions
- New token functions:
    - tokens-get-at-properties()
- New token vars:
    - $atProperties
    - $brightnessMode_options
    - $contrastMode_options
    - $lineHeight_multiplier
    - $systemFontList
    - $systemFontList_append
    - $systemFontList_monospace
    - $systemFontList_monospace_append
    - $systemFontList_monospace_prepend
    - $systemFontList_prepend
- New module functions:
    - colour.is-colour-like()
    - colour.is-keyword()
    - colour.is-system-color()
    - demo.args-dump()
    - demo.content-args-dump()
    - demo.mixin-signature-dump()
    - list.except-any()
    - list.only-any()
    - list.repeat()
    - list.slice()
    - map.pick()
    - map.regex-divide()
    - map.regex-pick()
    - map.regex-remove()
    - math.clamp-font-size() - was in the lib
    - math.coerce-unit()
    - math.to-percent()
    - meta.arglist-append()
    - meta.arglist-prepend()
    - meta.defined-else()
    - meta.enforce-type-or-warn()
    - meta.if-else()
    - meta.is-truthy()
    - meta.keywords-list-to-arglist()
    - meta.keywords-list()
    - meta.warning-message-bad-type()
    - selector.add-body-selector()
    - selector.add-root-selector()
    - selector.except-has-body()
    - selector.except-has-root-or-body()
    - selector.except-has-root()
    - selector.except-is-body()
    - selector.except-is-root-or-body()
    - selector.except-is-root()
    - selector.except-superselector()
    - selector.except()
    - selector.exists()
    - selector.extend-simple-selector()
    - selector.has-any-body()
    - selector.has-any-root-or-body()
    - selector.has-any-root()
    - selector.has-body()
    - selector.has-root-or-body()
    - selector.has-root()
    - selector.includes()
    - selector.is-any-body()
    - selector.is-any-root-or-body()
    - selector.is-any-root()
    - selector.is-multi()
    - selector.is-root-or-body()
    - selector.is-simple()
    - selector.is-superselector-any()
    - selector.omit-simple-selector()
    - selector.only-has-body()
    - selector.only-has-root-or-body()
    - selector.only-has-root()
    - selector.only-is-body()
    - selector.only-is-root-or-body()
    - selector.only-is-root()
    - selector.only-superselector()
    - selector.only()
    - selector.parent-except-superselector()
    - selector.parent-except()
    - selector.parent-has-body()
    - selector.parent-has-root-or-body()
    - selector.parent-has-root()
    - selector.parent-includes()
    - selector.parent-is-multi()
    - selector.parent-is-root-or-body()
    - selector.parent-only-superselector()
    - selector.parent-only()
    - selector.pop()
    - selector.popped()
    - selector.replace-simple-selector()
    - selector.unify-all()
    - string.concat()
    - string.is-quoted()
    - string.join()
    - string.match()
    - string.regex-replace()
    - string.regex-split()
- New module mixins:
    - demo.function
    - demo.mixin
    - demo.selector-function
    - meta.docblock-printer
    - meta.var-dump
    - selector.add-body-selector
    - selector.add-root-selector
    - selector.except-superselector
    - selector.only-superselector
    - selector.popped
- New functions:
    - selector-add-visited()
    - selector-buttons-basic()
- New template functions:
    - get-extend-selectors-headings-global()
    - get-extend-selectors-headings-utils()
- New mixins:
    - active
    - active-hover-focus-visible
    - active-hover-focus-visible-or-within
    - active-within
    - at-property
    - colour-mode-combo
    - container-query-cx-prop
    - container-query-cx-prop-list
    - container-query-cx-prop-map
    - cx-prop-bulk
    - each-motion
    - extend-selectors-globals--focus-ring
    - focus
    - focus-within
    - prop
    - prop-display
    - selector-all-headings
    - tokens-at-property
    - visited
- New template mixins:
    - extend-selectors-globals--focus-ring
- New snippets:
    - snippet-add-pseudo-file-selector-button
    - snippet-blockquote
    - snippet-pre
    - snippet-support-focus-ring
- New pseudo selectors:
    - input--file
    - input-base
- New optional param(s) for:
    - apply-interactive-mixin - $self, $visited
    - breakpoint mixin - $unit
    - colour-mode-each mixin - $includeForcedColorsSelectors
    - do-var() - $fallbackOnly
    - selector.parent-or-body() and selector.parent-or-root() - $asPseudoSelector
- New modules-only config at `@maddimathon/utility-sass/config/modules`
- New $template_styles props for all template output!
- New calc() to FeatureCheck
- New demo stylesheet (tests) for apply-interactive-mixin
- New option for multiple content blocks (i.e., content blocks with a $location parameter) to interactive mixins
- Added list input to feature-check.supports() and feature-check.supports-not()
- Added option to use has instead of focus-within
- Added $important param to mixins: custom-property, prop, etc.
- Added backdrop-filter style token
- Added custom property support for page-top

#### Added to TS
- New ts {@link CssColours} namespace with types and sets for css colour
  strings (from design-system-utilities)
- New props to {@link JsonToScss.Opts} - alwaysQuoteKeys, alwaysQuoteNumberKeys,
  convertZeroStringsToNumbers, cssFunctionsAsStrings, onlyQuoteAsNeeded,
  requiredQuotesRegex, requiredQuotesKeyRegex, unquoteNumberString,
  useStringModule
- New {@link jsValueToSass.Opts} for configuration of conversion - e.g., quotes on
  strings and colour objects
- Added tests to the {@link CssColour} utilities
- Added better returns to {@link CssColour.parseFunction} and better regexes for matching
- {@link FeatureCheck} improvements:
    - Added variableFonts to FeatureCheck
    - Added touch support to FeatureCheck class
    - Added test result caching to FeatureCheck
    - Added better test method logic to FeatureCheck

### Changed
- Summarized 0.1.0-pre.# and 0.1.0-alpha.# releases in changelog
- math.clamp-font-size() formula improvements
- Simplified output for apply-interactive-mixin and related mixins to reduce redundancy
- `%a` is now extended by config.$selector_a (defaults to`a[href]`), not just `a`
- Added option for multiple content blocks (i.e., content blocks with a
  $location parameter) to interactive mixins
- Added breakpoint override selectors to root aliases

### Fixed
- Updated with utility-typescript
- Added ':visited' states to buttons to fix a bug with visited link buttons
- Adding actual type warning to config.config-valid-bool()
- Fix to default of $unifySelectors param in colour mode args when parent is root
- Fixed error handling in meta.js-var-dump()
- Added demo stylesheets for custom property prefixes
- Improved custom property prefix system
- Updated dependencies
- Interactive mixins improvements
- Improvements to heading selector extending
- Improvements to breakpoint tokens & utilities
- Minor changes to scroll padding


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
- Button style improvements (specifically for icon pseudo elements in
  design-system-utilities) [0.1.0-pre.3 — 2025-10-22]
- Minor scss improvements [0.1.0-pre.3 — 2025-10-22]
- Fixed heading style inheritance issue [0.1.0-pre.4 — 2025-10-22]
- Fixed issue in no-motion selectors and queries causing reduced-motion to never
  be respected. [0.1.0-pre.5 — 2025-10-22]