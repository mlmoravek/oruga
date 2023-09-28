---
title: Datepicker
---

# Datepicker

<div class="vp-doc">

> An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-datepicker />

</div>
<div class="vp-example">

## Class props

<inspector-datepicker-viewer />

</div>

<div class="vp-doc">

## Datepicker component

```html
<o-datepicker></o-datepicker>
```

### Props

| Prop name                 | Description                                                 | Type           | Values                                            | Default                                                                                                                                                                    |
| ------------------------- | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody              |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| ariaNextLabel             |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| ariaPreviousLabel         |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| autocomplete              | Native options to use in HTML5 validation                   | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| closeOnClick              |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                                 |
| dateCreator               |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                                         |
| dateFormatter             |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                                         |
| dateParser                |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                                         |
| dayNames                  |                                                             | array          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;dayNames": undefined,<br>}</code>               |
| disabled                  |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| editable                  |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| events                    |                                                             | array          | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| expanded                  | Makes input full width when inside a grouped or addon field | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| firstDayOfWeek            |                                                             | number         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;firstDayOfWeek": 0, <br>}</code>                |
| focusedDate               |                                                             | Date           | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| icon                      | Icon name to be added                                       | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| iconNext                  |                                                             | string         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;iconNext": "chevron-right", <br>}</code>        |
| iconPack                  | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| iconPrev                  |                                                             | string         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;iconPrev": "chevron-left", <br>}</code>         |
| iconRight                 |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| iconRightClickable        |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| indicators                |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'>"dots"</code>                                                                                                               |
| inline                    |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| locale                    |                                                             | string\|array  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "locale": undefined<br>}</code>                              |
| maxDate                   |                                                             | Date           | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| maxlength                 | Same as native maxlength, plus character counter            | number\|string | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| minDate                   |                                                             | Date           | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| mobileBreakpoint          | Mobile breakpoint as max-width value                        | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| mobileModal               |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;mobileModal": true, <br>}</code>                |
| mobileNative              |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;mobileNative": true, <br>}</code>               |
| modelValue                |                                                             | date\|array    | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| monthNames                |                                                             | array          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;monthNames": undefined,<br>}</code>             |
| multiple                  |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                |
| nearbyMonthDays           |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;nearbyMonthDays": true, <br>}</code>            |
| nearbySelectableMonthDays |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;nearbySelectableMonthDays": false, <br>}</code> |
| openOnFocus               |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| override                  |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| placeholder               |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| position                  |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| range                     |                                                             | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                |
| rounded                   | Makes the element rounded                                   | boolean        | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| rulesForFirstWeek         |                                                             | number         | -                                                 | Default function (see source code)                                                                                                                                         |
| selectableDates           |                                                             | array\|func    | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| showWeekNumber            |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;showWeekNumber": false, <br>}</code>            |
| size                      | Size of button, optional                                    | string         | `small`, `medium`, `large`                        | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| statusIcon                | Show status icon using field and variant prop               | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>                               |
| trapFocus                 |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;trapFocus": true, <br>}</code>                  |
| type                      |                                                             | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| unselectableDates         |                                                             | array\|func    | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| unselectableDaysOfWeek    |                                                             | array          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;unselectableDaysOfWeek": undefined,<br>}</code> |
| useHtml5Validation        | Enable html 5 native validation                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>                       |
| validationMessage         | The message which is shown when a validation error occurs   | string         | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                                     |
| weekNumberClickable       |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;weekNumberClickable": false, <br>}</code>       |
| yearsRange                |                                                             | array          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> "datepicker: {<br>&nbsp;&nbsp;yearsRange": [-100, 10],<br>}</code>            |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| icon-right-click  |            |
| range-start       |            |
| range-end         |            |
| blur              |            |
| focus             |            |
| invalid           |            |
| update:modelValue |            |
| change-month      |            |
| change-year       |            |
| active-change     |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| header  |             |          |
| table   |             |          |
| footer  |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                                     | Default                                                |
| ------------------------------------------------- | ------------------------------------------------------ |
| $datepicker-font-size                             | $base-font-size                                        |
| $datepicker-box-line-height                       | $base-line-height                                      |
| $datepicker-box-padding                           | 0.375rem 1rem                                          |
| $datepicker-header-padding                        | 0 0 0.875rem 0                                         |
| $datepicker-header-margin                         | 0 0 0.875rem 0                                         |
| $datepicker-header-border-bottom                  | 1px solid $grey-lighter                                |
| $datepicker-footer-padding                        | 0.875rem 0.5rem 0 0.5rem                               |
| $datepicker-footer-margin                         | 0.875rem 0 0.875rem 0                                  |
| $datepicker-footer-border-top                     | 1px solid $grey-lighter                                |
| $datepicker-table-head-padding                    | 0 0 0.875rem 0                                         |
| $datepicker-table-head-margin                     | 0 0 0.875rem 0                                         |
| $datepicker-table-head-border-bottom              | 1px solid $grey-lighter                                |
| $datepicker-table-head-item-color                 | $grey                                                  |
| $datepicker-table-head-item-font-weight           | 600                                                    |
| $datepicker-item-today-border                     | solid 1px rgba($primary, 0.5)                          |
| $datepicker-item-selectable-color                 | $grey-dark                                             |
| $datepicker-item-disabled-color                   | $grey-light                                            |
| $datepicker-item-border-radius                    | $base-border-radius                                    |
| $datepicker-item-padding                          | 0.5rem 0.75rem                                         |
| $datepicker-item-selected-color                   | $primary-invert                                        |
| $datepicker-item-selected-background-color        | $primary                                               |
| $datepicker-item-selected-border-radius           | 0                                                      |
| $datepicker-item-selected-within-background-color | rgba( $datepicker-item-selected-background-color, 0.5) |
| $datepicker-item-hovered-background-color         | $grey                                                  |
| $datepicker-item-hovered-color                    | $grey-lighter                                          |
| $datepicker-item-hovered-background-color         | #f5f5f5                                                |
| $datepicker-item-hovered-within-background-color  | rgba( $datepicker-item-hovered-background-color, 0.5)  |
| $datepicker-item-nearby-color                     | $grey-light                                            |
| $datepicker-events-item-padding                   | 0.3rem 0.75rem 0.75rem                                 |
| $datepicker-event-background-color                | $grey-light                                            |
| $datepicker-event-dots-size                       | 0.35em                                                 |
| $datepicker-event-dots-margin                     | 0 0.1em                                                |
| $datepicker-event-bars-height                     | 0.25em                                                 |
| $datepicker-btn-border-color                      | $grey-lighter                                          |
| $datepicker-btn-border-radius                     | $base-border-radius                                    |
| $datepicker-btn-border                            | 1px solid transparent                                  |
| $datepicker-btn-color                             | #363636                                                |
| $datepicker-btn-height                            | 2.25em                                                 |
| $datepicker-btn-hover-border-color                | $grey-light                                            |
| $datepicker-btn-hover-color                       | #363636                                                |
| $datepicker-btn-line-height                       | $base-line-height                                      |
| $datepicker-btn-margin                            | 0.25rem                                                |
| $datepicker-btn-min-width                         | 2.25em                                                 |
| $datepicker-btn-padding                           | 0.5em 0.5em                                            |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_datepicker.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                                     | Default                                                |
| ------------------------------------------------- | ------------------------------------------------------ |
| $datepicker-font-size                             | $base-font-size                                        |
| $datepicker-box-line-height                       | $base-line-height                                      |
| $datepicker-box-padding                           | 0.375rem 1rem                                          |
| $datepicker-header-padding                        | 0 0 0.875rem 0                                         |
| $datepicker-header-margin                         | 0 0 0.875rem 0                                         |
| $datepicker-header-border-bottom                  | 1px solid $grey-lighter                                |
| $datepicker-footer-padding                        | 0.875rem 0.5rem 0 0.5rem                               |
| $datepicker-footer-margin                         | 0.875rem 0 0.875rem 0                                  |
| $datepicker-footer-border-top                     | 1px solid $grey-lighter                                |
| $datepicker-table-head-padding                    | 0 0 0.875rem 0                                         |
| $datepicker-table-head-margin                     | 0 0 0.875rem 0                                         |
| $datepicker-table-head-border-bottom              | 1px solid $grey-lighter                                |
| $datepicker-table-head-item-color                 | $grey                                                  |
| $datepicker-table-head-item-font-weight           | 600                                                    |
| $datepicker-item-today-border                     | solid 1px rgba($primary, 0.5)                          |
| $datepicker-item-selectable-color                 | $grey-dark                                             |
| $datepicker-item-disabled-color                   | $grey-light                                            |
| $datepicker-item-border-radius                    | $base-border-radius                                    |
| $datepicker-item-padding                          | 0.5rem 0.75rem                                         |
| $datepicker-item-selected-color                   | $primary-invert                                        |
| $datepicker-item-selected-background-color        | $primary                                               |
| $datepicker-item-selected-border-radius           | 0                                                      |
| $datepicker-item-selected-within-background-color | rgba( $datepicker-item-selected-background-color, 0.5) |
| $datepicker-item-hovered-background-color         | $grey                                                  |
| $datepicker-item-hovered-color                    | $grey-lighter                                          |
| $datepicker-item-hovered-background-color         | #f5f5f5                                                |
| $datepicker-item-hovered-within-background-color  | rgba( $datepicker-item-hovered-background-color, 0.5)  |
| $datepicker-item-nearby-color                     | $grey-light                                            |
| $datepicker-events-item-padding                   | 0.3rem 0.75rem 0.75rem                                 |
| $datepicker-event-background-color                | $grey-light                                            |
| $datepicker-event-dots-size                       | 0.35em                                                 |
| $datepicker-event-dots-margin                     | 0 0.1em                                                |
| $datepicker-event-bars-height                     | 0.25em                                                 |
| $datepicker-btn-border-color                      | $grey-lighter                                          |
| $datepicker-btn-border-radius                     | $base-border-radius                                    |
| $datepicker-btn-border                            | 1px solid transparent                                  |
| $datepicker-btn-color                             | #363636                                                |
| $datepicker-btn-height                            | 2.25em                                                 |
| $datepicker-btn-hover-border-color                | $grey-light                                            |
| $datepicker-btn-hover-color                       | #363636                                                |
| $datepicker-btn-line-height                       | $base-line-height                                      |
| $datepicker-btn-margin                            | 0.25rem                                                |
| $datepicker-btn-min-width                         | 2.25em                                                 |
| $datepicker-btn-padding                           | 0.5em 0.5em                                            |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_datepicker.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                   | Default                                 |
| ------------------------------- | --------------------------------------- |
| $datepicker-background-color    | var(--#{$prefix}body-bg)                |
| $datepicker-pagination-spacer   | calc($spacer \* 0.5)                    |
| $datepicker-section-spacer      | calc($spacer \* 0.75)                   |
| $datepicker-section-border      | 1px solid var(--#{$prefix}border-color) |
| $datepicker-cell-padding        | 0.5rem 0.75rem                          |
| $datepicker-cell-width          | calc(#{100%} / 7)                       |
| $datepicker-cell-border-radius  | var(--#{$prefix}border-radius)          |
| $datepicker-cell-font-weight    | 400                                     |
| $datepicker-cell-color          | var(--#{$prefix}black)                  |
| $datepicker-cell-hovered-color  | var(--#{$prefix}secondary)              |
| $datepicker-cell-selected-color | var(--#{$prefix}primary)                |
| $datepicker-month-width         | 20rem                                   |
| $datepicker-month-cell-spacer   | calc($spacer \* 0.5)                    |
| $datepicker-month-cell-height   | 2.5rem                                  |
| $datepicker-dropdown-width      | calc(100vw - 40px)                      |
| $datepicker-dropdown-max-width  | 460px                                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_datepicker.scss)

</div>

</div>
