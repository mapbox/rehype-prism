# Changelog

## HEAD

- **Breaking:** Add `options.ignoreMissing` which defaults to `false`.
  If you are relying on *silent* failures to highlight when the language is not defined, you'll need to use this option.
- **Breaking:** Remove support for `nohighlight` and `no-highlight` classes.
  You can skip highlighting for any given `<code>` by *not* putting a `language-*` class on it.
- Under the hood, use [refractor](https://github.com/wooorm/refractor) instead of Parse5 and PrismJS directly.

## 0.1.0

- Initial release.