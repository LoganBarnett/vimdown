***vimdown***
----
An attempt at making a live-updating markdown preview backed by a vim editor, all within a browser.


Here be dragons.

TODO:
[ ] Find out why watchify only kicks off a few times and then stops. Promising leads:
* https://github.com/substack/watchify/issues/216
* https://github.com/strongloop/fsevents/issues/63
[ ] Tests need to fire even if impl files were changed.
[ ] Dark colors. Please use dark colors.
* Examples of themes: https://github.com/securingsincity/react-ace
[ ] Proper styling.
[ ] Server can load and save to the fs.
[X] Server reloads on change
[ ] Server reloads also cause UI reloads
[X] Server tests
[ ] Browser-sync for dev-mode.
[ ] Scrolling is followed on both sides.