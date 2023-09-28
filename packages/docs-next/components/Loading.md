---
title: Loading
---

# Loading

<div class="vp-doc">

> A simple loading overlay

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-loading />

</div>
<div class="vp-example">

## Class props

<inspector-loading-viewer />

</div>

<div class="vp-doc">

## Loading component

```html
<o-loading></o-loading>
```

### Props

| Prop name | Description                                                                         | Type        | Values | Default                                                                                                                                              |
| --------- | ----------------------------------------------------------------------------------- | ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| active    | Whether loading is active or not,<br/>use v-model:active to make it two-way binding | boolean     | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| animation |                                                                                     | string      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>  |
| canCancel | Can close Loading by pressing escape or clicking outside                            | boolean     | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;canCancel: false<br>}</code>   |
| container | Container element to mount the component in                                         | HTMLElement | -      |                                                                                                                                                      |
| fullPage  | Loader will overlay the full page                                                   | boolean     | -      | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                           |
| icon      | Icon name                                                                           | string      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;icon: "loading"<br>}</code>    |
| iconSize  | Override the icon size                                                              | string      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;iconSize: "medium"<br>}</code> |
| iconSpin  | Enable spin effect on icon                                                          | boolean     | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;iconSpin: true<br>}</code>     |

### Events

| Event name      | Properties | Description                                                     |
| --------------- | ---------- | --------------------------------------------------------------- |
| update:active   |            | active prop two-way binding                                     |
| update:fullPage |            | fullPage prop two-way binding                                   |
| close           |            | Callback after user canceled (pressed escape / clicked outside) |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable            | Default                  |
| ------------------------ | ------------------------ |
| $loading-overlay-legacy  | #7f7f7f                  |
| $loading-overlay         | rgba(255, 255, 255, 0.5) |
| $loading-zindex          | 29                       |
| $loading-fullpage-zindex | 999                      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_loading.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable            | Default                  |
| ------------------------ | ------------------------ |
| $loading-overlay-legacy  | #7f7f7f                  |
| $loading-overlay         | rgba(255, 255, 255, 0.5) |
| $loading-zindex          | 29                       |
| $loading-fullpage-zindex | 999                      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_loading.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable            | Default                  |
| ------------------------ | ------------------------ |
| $loading-zindex          | $zindex-sticky           |
| $loading-zindex-fullpage | $zindex-fixed            |
| $loading-overlay         | rgba(255, 255, 255, 0.5) |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_loading.scss)

</div>

</div>
