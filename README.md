![](./docs/Directus-Extension-Field-Actions.png)


# 🐰 Directus extension: Text action display & interface
> 💡 A directus interface + display adding `copy to clipboard` and `link` actions to your values.
> 
> The actions can be performed by a button next to the items or by clicking on the value.

<br />

![](./docs/screenshots/display-copy.png)
*↑ Add copy-to-clipboard and link functions to your data*

<br />

## ✨ Supports
### 📋 Copy action
Each value can be copied by a custom button. If enabled it's also possible to copy a value by just clickung on it (click-action)

### ➡️ Links
When using the link-option it supports ➡️ HTTP-, 📧 mail-, and 📞 phone- links. Each link can be opened by the custom button. If enabled it's also possible to open the link by just clicking on the value (click-action).

*Note: The extensions currently won't parse invalid links into valid ones!*

### 🖱 Click-Action
Displays and disabled interfaces (== readonly) support a custom click-action. This can be one of:
* default action (does nothing custom)
* Copy-action (copied the value)
* Link-action (openes the link in a new tab)

### ⚙ Settings
#### Icon position
- The icons can be placed before or after the content
- The setting can be set for the interface and display, as well as the copy and link button indipendently
- Example in the screenshots below

#### Custom prefix
- You can set custom prefixes for copy-/ and link-actions.
- Prefixes can be entered manually or use a defined variable ([Project URL setting](https://docs.directus.io/configuration/project-settings.html#general))
- The setting can be set for the interface and display, as well as the copy and link button indipendently
- Example in the screenshots below

#### Link target
- Set the link-target to the same, or a new tab

#### Hide field value (_display only_)
- Hides the field value for a button only mode
- Mostly to be used in combinaiton with button lables

#### Button lables (_display only_)
- Add custom lables to the copy-/ and link icons for the display
- Mostly to be used in combinaiton with the "Hide field value" option for a button only mode

<br />

## ⚙️ Installation (npm)
```
npm i directus-extension-field-actions
```

or

```
pnpm i directus-extension-field-actions
```

## ⚙️ Installation (manually)
1. Download the `app.js`, `api.js` and `package.json` from the [latest release](https://github.com/utomic-media/directus-extension-field-actions/releases)

2. Create a folder named `directus-extension-field-actions` in your extension folder (e.g  `/extensions/directus-extension-field-actions`) and a `/dist` folder inside.
   
3. Move the `package.json` to the created extension folder and the `app.js` and `api.js` into the `/dist` folder.

4. Restart directus

**The result should look like this:**
```
├── extensions
│   ├── directus-extension-field-actions
│   │   ├── dist
│   │   │   ├── app.js
│   │   │   ├── api.js
│   │   ├── package.json
```


<br />

## 🖼 Screenshots
![](./docs/screenshots/display-copy.png)
*↑ Copy values from table views directly by clicking on them or an icon (configurable)*

---

![](./docs/screenshots/item-copy-hover.png)
*↑ Copy field-values by clicking on it (only for readonly-fields and displays)*

---

![](./docs/screenshots/item-copy-button.png)
*↑ Add link- and copy-to-clipboard buttons to each field*

---

![](./docs/screenshots/interface-config-2023-03.png)
*↑ Interfaces settings*

---

![](./docs/screenshots/display-config-2023-03.png)
*↑ Displays settings*

---

