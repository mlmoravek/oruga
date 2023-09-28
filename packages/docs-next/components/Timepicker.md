---
title: Timepicker
---

# Timepicker

<div class="vp-doc">

> An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-timepicker />

</div>
<div class="vp-example">

## Class props

<inspector-timepicker-viewer />

</div>

<div class="vp-doc">

## Timepicker component

```html
<o-timepicker></o-timepicker>
```

### Props

| Prop name             | Description                                                 | Type           | Values                                            | Default                                                                                                                                                      |
| --------------------- | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| appendToBody          |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| autocomplete          | Native options to use in HTML5 validation                   | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| defaultMinutes        |                                                             | number         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| defaultSeconds        |                                                             | number         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| disabled              |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| editable              |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| enableSeconds         |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| expanded              | Makes input full width when inside a grouped or addon field | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| hourFormat            |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| icon                  | Icon name to be added                                       | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| iconPack              | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| incrementHours        |                                                             | number         | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                      |
| incrementMinutes      |                                                             | number         | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                      |
| incrementSeconds      |                                                             | number         | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                      |
| inline                |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| maxTime               |                                                             | date           | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| maxlength             | Same as native maxlength, plus character counter            | number\|string | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| minTime               |                                                             | date           | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| mobileBreakpoint      | Mobile breakpoint as max-width value                        | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| mobileNative          |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "timepicker: {<br>&nbsp;&nbsp;mobileNative": true, <br>}</code> |
| openOnFocus           |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| override              |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| placeholder           |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| position              |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| resetOnMeridianChange |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                  |
| rounded               | Makes the element rounded                                   | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| size                  | Size of button, optional                                    | string         | `small`, `medium`, `large`                        | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| statusIcon            | Show status icon using field and variant prop               | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>                 |
| timeCreator           |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                           |
| timeFormatter         |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                           |
| timeParser            |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                           |
| unselectableTimes     |                                                             | array          | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| useHtml5Validation    | Enable html 5 native validation                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>         |
| v-model               |                                                             | date           | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |
| validationMessage     | The message which is shown when a validation error occurs   | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                       |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| blur              |            |
| focus             |            |
| invalid           |            |
| update:modelValue |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| default |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                                               |
| -------------------------------------- | ----------------------------------------------------- |
| $timepicker-font-size                  | $base-font-size                                       |
| $timepicker-box-line-height            | $base-line-height                                     |
| $timepicker-box-padding                | 0.375rem 1rem                                         |
| $timepicker-footer-padding             | 0 0.5rem                                              |
| $timepicker-footer-margin              | 0.875rem 0 0 0                                        |
| $timepicker-select-line-height         | $base-line-height                                     |
| $timepicker-select-padding             | $control-padding-vertical $control-padding-horizontal |
| $timepicker-select-color               | #363636                                               |
| $timepicker-select-font-weight         | 600                                                   |
| $timepicker-select-placeholder-opacity | $base-disabled-opacity                                |
| $timepicker-separator-font-weight      | 600                                                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_timepicker.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                                               |
| -------------------------------------- | ----------------------------------------------------- |
| $timepicker-font-size                  | $base-font-size                                       |
| $timepicker-box-line-height            | $base-line-height                                     |
| $timepicker-box-padding                | 0.375rem 1rem                                         |
| $timepicker-footer-padding             | 0 0.5rem                                              |
| $timepicker-footer-margin              | 0.875rem 0 0 0                                        |
| $timepicker-select-line-height         | $base-line-height                                     |
| $timepicker-select-padding             | $control-padding-vertical $control-padding-horizontal |
| $timepicker-select-color               | #363636                                               |
| $timepicker-select-font-weight         | 600                                                   |
| $timepicker-select-placeholder-opacity | $base-disabled-opacity                                |
| $timepicker-separator-font-weight      | 600                                                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_timepicker.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable | Default |
| ------------- | ------- |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_timepicker.scss)

</div>

</div>
