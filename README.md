# Description
Ivilution is a MediaWiki extension that brings the CPE Language experience to other MediaWiki skins. It also brings out the following:
- Themed OOUI Icons
- Checkbox and Radio styling for non-ooui ones
- Button and Input styling tweaks
- Text Selection Styling
- Partial Label Styling
- Secondary font Styling (Fonts must be installed on your PC for now)
- One static theme for use with the extension (Does not interfere with the Evelution's theming system)

# Requirements
To Run Ivilution on your wiki, you must have MediaWiki 1.36 or greater. Older versions are not supported

# Installation
To Install Ivilution, you must download the reposistory first. Make a folder called **Ivilution** in **Extensions** diractory where you have installed MediaWiki and extract the zipped file contents in **Ivilution** folder.  Lastly, put this in **LocalSettings.php**:
```php
wfLoadExtension( 'Ivilution' );
```

# More Help
Join to [our Discord Server](https://discord.gg/a6FbV6zWFs) for more help about Ivilution and Evelution

# Known Issue
- Currently, no Powered by Ivilution icon is being added to the footer even though it is intended.

# Known Limitation
- Some elements that rely on images (Particularly the Checkboxes on the default OOUI-theme will appear broken and only a mere check will appear. Checked checkboxes will have a blue background
