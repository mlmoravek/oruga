---
title: Autocomplete
---

# Autocomplete

<div class="vp-doc">

> Extended input that provide suggestions while the user types

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-autocomplete />

</div>
<div class="vp-example">

## Class props

<inspector-autocomplete-viewer />

</div>

<div class="vp-doc">

## Autocomplete component

```html
<o-autocomplete></o-autocomplete>
```

### Props

| Prop name | Description                               | Type   | Values | Default                                                                                                         |
| --------- | ----------------------------------------- | ------ | ------ | --------------------------------------------------------------------------------------------------------------- |
| animation | Transition name to apply on dropdown list | string | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;): |

        "fade",
    <br>}</code> |

| appendToBody | Append autocomplete content to body | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| autocomplete | Native options to use in HTML5 validation | string | - | <code style='white-space: nowrap; padding: 0;'></code> |
| checkInfiniteScroll | Makes the component check if list reached scroll end and emit infinite-scroll event. | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| clearIcon | Icon name to be added on the clear button | string | - | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;):
"close-circle",
<br>}</code> |
| clearOnSelect | Clear input text on select | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| clearable | Add a button/icon to clear the inputed text | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| confirmKeys | Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) | array | - | <code style='white-space: nowrap; padding: 0;'>["Tab", "Enter"]</code> |
| customFormatter | Function to format an option to a string for display in the input as alternative to field prop) | func | - | <code style='white-space: nowrap; padding: 0;'></code> |
| data | Options / suggestions | array | - | <code style='white-space: nowrap; padding: 0;'>[]</code> |
| debounceTyping | Number of milliseconds to delay before to emit typing event | number | - | <code style='white-space: nowrap; padding: 0;'></code> |
| expanded | Makes input full width when inside a grouped or addon field | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| field | Property of the object (if data is array of objects) to use as display text, and to keep track of selected option | string | - | <code style='white-space: nowrap; padding: 0;'>"value"</code> |
| groupField | Property of the object (if &lt;code&gt;data&lt;/code&gt; is array of objects) to use as display text of group | string | - | <code style='white-space: nowrap; padding: 0;'></code> |
| groupOptions | Property of the object (if &lt;code&gt;data&lt;/code&gt; is array of objects) to use as key to get items array of each group, optional | string | - | <code style='white-space: nowrap; padding: 0;'></code> |
| icon | Icon name to be added | string | - | <code style='white-space: nowrap; padding: 0;'></code> |
| iconPack | Icon pack to use | string | `mdi`, `fa`, `fas and any other custom icon pack` | <code style='white-space: nowrap; padding: 0;'></code> |
| iconRight | Icon name to be added on the right side | string | - | <code style='white-space: nowrap; padding: 0;'></code> |
| iconRightClickable | Clickable icon right if exists | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| itemTag | Menu item tag name | string \| Component | - | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;):
"div",
<br>}</code> |
| keepFirst | The first option will always be pre-selected (easier to just hit enter or tab) | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| keepOpen | Keep open dropdown list after select | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| maxHeight | Max height of dropdown content | string\|number | - | <code style='white-space: nowrap; padding: 0;'></code> |
| maxlength | Same as native maxlength, plus character counter | number\|string | - | <code style='white-space: nowrap; padding: 0;'></code> |
| menuPosition | Position of dropdown | string | `auto`, `top`, `bottom` | <code style='white-space: nowrap; padding: 0;'>"auto"</code> |
| menuTag | Menu tag name | string \| Component | - | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;):
"div",
<br>}</code> |
| openOnFocus | Open dropdown list on focus | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| override | | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| rounded | Makes the element rounded | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| selectOnClickOutside | Trigger the select event for the first pre-selected option when clicking outside and &lt;code&gt;keep-first&lt;/code&gt; is enabled | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| selectableFooter | Allows the footer in the autocomplete to be selectable | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| selectableHeader | Allows the header in the autocomplete to be selectable | boolean | - | <code style='white-space: nowrap; padding: 0;'></code> |
| size | Vertical size of input, optional | string | `small`, `medium`, `large` | <code style='white-space: nowrap; padding: 0;'></code> |
| statusIcon | Show status icon using field and variant prop | boolean | - | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;): true<br>}</code> |
| type | Input type | string | - | <code style='white-space: nowrap; padding: 0;'>"text"</code> |
| useHtml5Validation | Enable html 5 native validation | boolean | - | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;): true<br>}</code> |
| v-model | | number\|string | - | <code style='white-space: nowrap; padding: 0;'></code> |
| validationMessage | The message which is shown when a validation error occurs | string | - | <code style='white-space: nowrap; padding: 0;'></code> |

### Events

| Event name        | Properties                                                                   | Description |
| ----------------- | ---------------------------------------------------------------------------- | ----------- |
| icon-click        |                                                                              |
| blur              |                                                                              |
| focus             |                                                                              |
| invalid           |                                                                              |
| update:modelValue |                                                                              |
| select            | **selected** `Object` - selected option<br/>**event** `Event` - native event |
| select-header     |                                                                              |
| select-footer     |                                                                              |
| infinite-scroll   |                                                                              |
| typing            |                                                                              |
| icon-right-click  |                                                                              |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| header  |             |          |
| group   |             | <br/>    |
| default |             | <br/>    |
| empty   |             |          |
| footer  |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                             | Default                                                                      |
| ----------------------------------------- | ---------------------------------------------------------------------------- |
| $autocomplete-item-color                  | #000000                                                                      |
| $autocomplete-item-disabled-opacity       | $base-disabled-opacity                                                       |
| $autocomplete-item-font-size              | $base-font-size                                                              |
| $autocomplete-item-hover-background-color | #f5f5f5                                                                      |
| $autocomplete-item-hover-color            | #000000                                                                      |
| $autocomplete-item-line-height            | $base-line-height                                                            |
| $autocomplete-item-padding                | 0.375rem 1rem                                                                |
| $autocomplete-menu-background             | #ffffff                                                                      |
| $autocomplete-menu-border-radius          | $base-border-radius                                                          |
| $autocomplete-menu-box-shadow             | 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02) |
| $autocomplete-menu-margin                 | 0                                                                            |
| $autocomplete-menu-max-height             | 200px                                                                        |
| $autocomplete-menu-padding                | 0.5rem 0 0.5rem 0                                                            |
| $autocomplete-menu-zindex                 | 20                                                                           |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_autocomplete.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                             | Default                                                                      |
| ----------------------------------------- | ---------------------------------------------------------------------------- |
| $autocomplete-item-color                  | #000000                                                                      |
| $autocomplete-item-disabled-opacity       | $base-disabled-opacity                                                       |
| $autocomplete-item-font-size              | $base-font-size                                                              |
| $autocomplete-item-hover-background-color | #f5f5f5                                                                      |
| $autocomplete-item-hover-color            | #000000                                                                      |
| $autocomplete-item-line-height            | $base-line-height                                                            |
| $autocomplete-item-padding                | 0.375rem 1rem                                                                |
| $autocomplete-menu-background             | #ffffff                                                                      |
| $autocomplete-menu-border-radius          | $base-border-radius                                                          |
| $autocomplete-menu-box-shadow             | 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02) |
| $autocomplete-menu-margin                 | 0                                                                            |
| $autocomplete-menu-max-height             | 200px                                                                        |
| $autocomplete-menu-padding                | 0.5rem 0 0.5rem 0                                                            |
| $autocomplete-menu-zindex                 | 20                                                                           |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_autocomplete.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                 | Default |
| ----------------------------- | ------- |
| $autocomplete-menu-max-height | 200px   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_autocomplete.scss)

</div>

</div>
