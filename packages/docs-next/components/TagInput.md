---
title: TagInput
---

# TagInput

<div class="vp-doc">

> A simple tag input field that can have autocomplete functionality

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-taginput />

</div>
<div class="vp-example">

## Class props

<inspector-taginput-viewer />

</div>

<div class="vp-doc">

## TagInput component

```html
<o-tag-input></o-tag-input>
```

### Props

| Prop name           | Description                                                                                                                                                            | Type                          | Values                                                                          | Default                                                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowAutocomplete   | Add autocomplete feature (if true, any Autocomplete props may be used too)                                                                                             | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| allowDuplicates     | Allows adding the same item multiple time                                                                                                                              | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| allowNew            | When autocomplete, it allow to add new items                                                                                                                           | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| appendToBody        | Append autocomplete content to body                                                                                                                                    | boolean                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;appendToBody: false<br>}</code>         |
| ariaCloseLabel      | Accessibility label for the close button                                                                                                                               | string                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;ariaCloseLabel: undefined<br>}</code>   |
| autocomplete        | Native options to use in HTML5 validation                                                                                                                              | string                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>         |
| beforeAdding        | Function to validate the value of the item before adding                                                                                                               | (value: string) =&gt; boolean | -                                                                               | Default function (see source code)                                                                                                                             |
| checkInfiniteScroll | Makes the autocomplete component check if list reached scroll end and emit infinite-scroll event                                                                       | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| closable            | Add close/delete button to the item                                                                                                                                    | boolean                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;closable: true<br>}</code>              |
| closeIcon           | Icon name of close icon on selected item                                                                                                                               | string                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>          |
| confirmKeys         | Array of keys<br/>(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)<br/>which will add a item when typing (default comma, tab and enter) | array                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;confirmKeys: ["<br>}</code>             |
| createItem          | Function to create a new item to push into v-model (items)                                                                                                             | (value: any) =&gt; any        | -                                                                               | Default function (see source code)                                                                                                                             |
| data                | Items data                                                                                                                                                             | array                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>[]</code>                                                                                                       |
| disabled            | Input will be disabled                                                                                                                                                 | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| expanded            | Makes input full width when inside a grouped or addon field                                                                                                            | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| field               | Property of the object (if data is array of objects) to use as display text                                                                                            | string                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>"value"</code>                                                                                                  |
| groupField          | Property of the object (if &lt;code&gt;data&lt;/code&gt; is array of objects) to use as display text of group                                                          | string                        | -                                                                               |                                                                                                                                                                |
| groupOptions        | Property of the object (if &lt;code&gt;data&lt;/code&gt; is array of objects) to use as key to get items array of each group, optional                                 | string                        | -                                                                               |                                                                                                                                                                |
| hasCounter          | Show counter when maxlength or maxtags props are passed                                                                                                                | boolean                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;hasCounter: true<br>}</code>            |
| icon                | Icon name to be shown                                                                                                                                                  | string                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>             |
| iconPack            | Icon pack to use                                                                                                                                                       | string                        | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>         |
| keepFirst           | The first option will always be pre-selected (easier to just hit enter or tab)                                                                                         | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| maxitems            | Limits the number of items, plus item counter                                                                                                                          | number                        | -                                                                               |                                                                                                                                                                |
| maxlength           | Same as native maxlength, plus character counter                                                                                                                       | number                        | -                                                                               |                                                                                                                                                                |
| openOnFocus         | Opens a dropdown with choices when the input field is focused                                                                                                          | boolean                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| pasteSeparators     | Array of chars used to split when pasting a new string                                                                                                                 | string[]                      | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;pasteSeparators: ["<br>}</code>         |
| removeOnKeys        | Allow removing last item when pressing given keys, if input is empty                                                                                                   | array                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;removeOnKeys: ["Backspace"]<br>}</code> |
| size                | Vertical size of input, optional                                                                                                                                       | string                        | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;size: undefined<br>}</code>             |
| useHtml5Validation  | Enable html 5 native validation                                                                                                                                        | boolean                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>              |
| v-model             |                                                                                                                                                                        | array                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>[]</code>                                                                                                       |
| variant             | Color of the each items, optional                                                                                                                                      | string                        | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>          |

### Events

| Event name        | Properties | Description                     |
| ----------------- | ---------- | ------------------------------- |
| infinite-scroll   |            |
| icon-right-click  |            | on icon right click event       |
| update:modelValue |            | modelValue prop two-way binding |
| input             |            | on input change event           |
| add               |            |
| remove            |            |
| focus             |            | on input focus event            |
| blur              |            | on input blur event             |
| invalid           |            | on input invalid event          |
| icon-click        |            | on icon click event             |

### Slots

| Name     | Description | Bindings |
| -------- | ----------- | -------- |
| selected |             |          |
| header   |             |          |
| default  |             | <br/>    |
| empty    |             |          |
| footer   |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable               | Default            |
| --------------------------- | ------------------ |
| $taginput-badge-bg          | $light             |
| $taginput-badge-color       | $dark              |
| $taginput-badge-font-size   | 0.9em              |
| $taginput-badge-margin      | 0.25em             |
| $taginput-badge-icon-space  | 0.25em             |
| $taginput-counter-margin    | 0.25rem 0 0 0.5rem |
| $taginput-counter-font-size | 0.75rem            |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_taginput.scss)

</div>

</div>