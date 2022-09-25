Starting from 25/9//2022, this project will no longer be maintained because the main DB trasmitter of that project burned out. You should uninstall the extension from your wiki, if you have it installed as Ivilution may break in future MW Versions despite working in MW 1.38

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
To Run Ivilution on your wiki, you must have MediaWiki 1.36 or greater. Older versions are not supported. You must also have installed a MediaWiki skin other than the following ones as this extension is blocked running inside those skins:
- Evelution
- Tunic

# Installation
To Install Ivilution, you must download the reposistory first. Make a folder called **Ivilution** in **Extensions** diractory where you have installed MediaWiki and extract the zipped file contents in **Ivilution** folder.  Lastly, put this in **LocalSettings.php**:
```php
wfLoadExtension( 'Ivilution' );
```

# Giving your skin a true support to Ivilution
- For things that can be seen without Ivilution installed (Such as general styling), you can add such support in your skin's stylesheet files.
- For things that can only be seen using the CPE Language/Ivilution installed, you must send us a PR including the variables for the new skin at the end of Ivilution.css. Additional CSS/JS files will be allowed to be hosted on the Ivilution Extension on certain circumstances. This will ensure that Ivilution-only styling will not show on wikis without the extension installed.

# More Help
Join to [our Discord Server](https://discord.gg/a6FbV6zWFs) for more help about Ivilution and Evelution

# Known Issue
- Currently, no Powered by Ivilution icon is being added to the footer even though it is intended.

# Known Limitation
- Some elements that rely on images (Particularly the Checkboxes on the default OOUI-theme will appear broken and only a mere check will appear. Checked checkboxes will have a blue background
