---
title: Icon
---

# Icon

<div class="vp-doc">

> Icons take an important role of any application

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-icon />

</div>
<div class="vp-example">

## Class props

<inspector-icon-viewer />

</div>

<div class="vp-doc">

## Icon component

```html
<o-icon></o-icon>
```

### Props

| Prop name   | Description                               | Type                | Values                                                                                                                             | Default                                                                                                                                           |
| ----------- | ----------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| clickable   | Makes the icon clickable                  | boolean             | -                                                                                                                                  | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                       |
| component   | Set a specific icon component             | string \| Component | -                                                                                                                                  |                                                                                                                                                   |
| customClass | Add a custom class to icon font, optional | string              | -                                                                                                                                  |                                                                                                                                                   |
| customSize  | Overrides icon font size, optional        | string              | `Depends on library: null (smallest)`, `fa-lg`, `fa-2x`, `fa-3x`, `fa-4x`, `fa-5x`, `mdi-18px`, `mdi-24px`, `mdi-36px`, `mdi-48px` |                                                                                                                                                   |
| icon        | The icon name to use                      | string              | -                                                                                                                                  |                                                                                                                                                   |
| pack        | The icon pack to use                      | string              | `mdi`, `fa`, `fas and any other custom icon pack`                                                                                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>icon: {<br>&nbsp;&nbsp;pack: undefined<br>}</code>    |
| rotation    | Icon Rotation 0-360                       | number\|string      | -                                                                                                                                  |                                                                                                                                                   |
| size        | Icon size by pack, optional               | string              | `small`, `medium`, `large`                                                                                                         | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>icon: {<br>&nbsp;&nbsp;size: undefined<br>}</code>    |
| spin        | Enable spin effect                        | boolean             | -                                                                                                                                  | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                       |
| variant     | Color of the icon, optional               | string              | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color`                                                    | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>icon: {<br>&nbsp;&nbsp;variant: undefined<br>}</code> |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable       | Default |
| ------------------- | ------- |
| $icon-spin-duration | 2s      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_icon.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable       | Default |
| ------------------- | ------- |
| $icon-spin-duration | 2s      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_icon.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable       | Default |
| ------------------- | ------- |
| $icon-spin-duration | 2s      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_icon.scss)

</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                 | Default |
| ----------------------------- | ------- |
| $icon-spin-animation-duration | 1.5s    |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_icon.scss)

</div>

</div>
