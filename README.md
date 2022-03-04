## Locked dependencies:

- eslint 7 won’t work with our config
- faker 5 doesn’t have a changelog
- history 5 doesn’t work with connected-react-router
- query-string 6 drops support for old browsers that our users use
- react-image-crop API redesign, too hard to migrate
- react-phone-number-input 3 uses css variables, that’s not supported by old IE browsers, we can bypass that with PostCSS, didn’t have luck with it a year ago
- react-sortablejs 6 no sane changelog, API redesign, too much effort to upgrade, I think 1.5.1 works fine.
