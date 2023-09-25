---
title: Upload
---

# Upload

<div class="vp-doc">

> Upload one or more files

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-upload />

</div>
<div class="vp-example">

## Class props

<inspector-upload-viewer />

</div>

<div class="vp-doc">

## Upload component

```html
<o-upload></o-upload>
```

### Props

| Prop name          | Description                                                           | Type                | Values                                                                          | Default                                                                                                                          |
| ------------------ | --------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| accept             | Same as native accept                                                 | string              | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |
| autocomplete       | Native options to use in HTML5 validation                             | string              | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |
| disabled           | Same as native disabled                                               | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |
| dragDrop           | Accepts drag & drop and change its style                              | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |
| expanded           | Upload will be expanded (full-width)                                  | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                      |
| icon               | Icon name to be added                                                 | string              | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |
| iconPack           | Icon pack to use                                                      | string              | `mdi`, `fa`, `fas and any other custom icon pack`                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |
| maxlength          | Same as native maxlength, plus character counter                      | number\|string      | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |
| multiple           | Same as native, also push new item to v-model instead of replacing    | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |
| native             | Replace last chosen files every time (like native file input element) | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                      |
| override           |                                                                       | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |
| rounded            | Makes the element rounded                                             | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |
| statusIcon         | Show status icon using field and variant prop                         | boolean             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;): true<br>}</code> |
| useHtml5Validation | Enable html 5 native validation                                       | boolean             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;): true<br>}</code> |
| v-model            |                                                                       | object\|File\|array | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |
| validationMessage  | The message which is shown when a validation error occurs             | string              | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |
| variant            | Color of the control, optional                                        | string              | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <code style='white-space: nowrap; padding: 0;'></code>                                                                           |

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
| default |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                        | Default                |
| ------------------------------------ | ---------------------- |
| $upload-draggable-border             | 1px dashed $grey-light |
| $upload-draggable-border-radius      | $base-border-radius    |
| $upload-draggable-disabled-opacity   | $base-disabled-opacity |
| $upload-draggable-hover-border-color | $grey                  |
| $upload-draggable-padding            | 0.25em                 |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_upload.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                        | Default                |
| ------------------------------------ | ---------------------- |
| $upload-draggable-border             | 1px dashed $grey-light |
| $upload-draggable-border-radius      | $base-border-radius    |
| $upload-draggable-disabled-opacity   | $base-disabled-opacity |
| $upload-draggable-hover-border-color | $grey                  |
| $upload-draggable-padding            | 0.25em                 |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_upload.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                        | Default                         |
| ------------------------------------ | ------------------------------- |
| $upload-draggable-bg                 | transparent                     |
| $upload-draggable-bg-hover           | transparent                     |
| $upload-draggable-border-color       | var(--#{$prefix}border-color)   |
| $upload-draggable-border-color-hover | var(--#{$prefix}dark-bg-subtle) |
| $upload-draggable-border-width       | var(--#{$prefix}border-width)   |
| $upload-draggable-border-radius      | var(--#{$prefix}border-radius)  |
| $upload-draggable-padding            | 2em                             |
| $upload-disabled-opacity             | 0.5                             |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_upload.scss)

</div>

</div>
