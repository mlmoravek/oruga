---
title: Datetimepicker
---

# Datetimepicker

<div class="vp-doc">

> An input with a simple dropdown/modal for selecting a date and time, uses native datetimepicker for mobile

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-datetimepicker />

</div>
<div class="vp-example">

## Class props

<inspector-datetimepicker-viewer />

</div>

<div class="vp-doc">

## Datetimepicker component

```html
<o-datetimepicker></o-datetimepicker>
```

### Props

| Prop name          | Description                                                 | Type           | Values                                            | Default                                                                                                                               |
| ------------------ | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody       |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| autocomplete       | Native options to use in HTML5 validation                   | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| datepicker         |                                                             | object         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| datetimeCreator    |                                                             | func           | -                                                 | Default function (see source code)                                                                                                    |
| datetimeFormatter  |                                                             | func           | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| datetimeParser     |                                                             | func           | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| disabled           |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| editable           |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                           |
| expanded           | Makes input full width when inside a grouped or addon field | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| icon               | Icon name to be added                                       | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| iconPack           | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| iconRight          |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| iconRightClickable |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| inline             |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| locale             |                                                             | string\|array  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;): undefined<br>}</code> |
| maxDatetime        |                                                             | date           | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| maxlength          | Same as native maxlength, plus character counter            | number\|string | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| minDatetime        |                                                             | date           | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| mobileNative       |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                            |
| modelValue         |                                                             | date           | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| openOnFocus        |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| override           |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| placeholder        |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| position           |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| rounded            | Makes the element rounded                                   | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| size               |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| statusIcon         | Show status icon using field and variant prop               | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;): true<br>}</code>      |
| timepicker         |                                                             | object         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |
| useHtml5Validation | Enable html 5 native validation                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;): true<br>}</code>      |
| validationMessage  | The message which is shown when a validation error occurs   | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| active-change     |            |
| icon-right-click  |            |
| change-month      |            |
| change-year       |            |
| blur              |            |
| focus             |            |
| invalid           |            |
| update:modelValue |            |

### Slots

| Name   | Description | Bindings |
| ------ | ----------- | -------- |
| footer |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable | Default |
| ------------- | ------- |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_datetimepicker.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable | Default |
| ------------- | ------- |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_datetimepicker.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>
