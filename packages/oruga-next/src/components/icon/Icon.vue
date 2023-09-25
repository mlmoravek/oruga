<script setup lang="ts">
import { computed, type Component, type PropType } from "vue";

import getIcons from "@/utils/icons";
import { getOption } from "@/utils/config";
import { useComputedClass, useClassProps } from "@/composables";
import { baseComponentProps } from "@/mixins/SharedProps";

/**
 * Icons take an important role of any application
 * @displayName Icon
 * @style _icon.scss
 */
defineOptions({
    isOruga: true,
    name: "OIcon",
    configField: "icon",
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /**
     * Set a specific icon component
     */
    component: {
        type: [String, Object, Function] as PropType<string | Component>,
        default: undefined,
    },
    /**
     * The icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    pack: {
        type: String,
        default: () => getOption("icon.pack"),
    },
    /**
     * The icon name to use
     */
    icon: { type: String, default: undefined },
    /**
     * 	Color of the icon, optional
     *  @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("icon.variant"),
    },
    /**
     * Icon size by pack, optional
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("icon.size"),
    },
    /**
     * Overrides icon font size, optional
     * @values Depends on library: null (smallest), fa-lg, fa-2x, fa-3x, fa-4x, fa-5x, mdi-18px, mdi-24px, mdi-36px, mdi-48px
     */
    customSize: { type: String, default: undefined },
    /**
     * Add a custom class to icon font, optional
     */
    customClass: { type: String, default: undefined },
    /**
     * Makes the icon clickable
     */
    clickable: { type: Boolean, default: false },
    /**
     * Enable spin effect
     */
    spin: { type: Boolean, default: false },
    /**
     * Icon Rotation 0-360
     */
    rotation: { type: [Number, String], default: undefined },
    /**
     * This is used internally
     * @ignore
     */
    both: { type: Boolean, default: false },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "clickableClass",
        "spinClass",
        "sizeClass",
        "variantClass",
    ]),
});

const rootStyle = computed(() =>
    props.rotation ? { transform: `rotate(${props.rotation}deg)` } : {},
);

const iconConfig = computed(() => getIcons()[computedPack.value]);

const iconPrefix = computed(() =>
    iconConfig.value?.iconPrefix ? iconConfig.value.iconPrefix : "",
);

/**
 * Internal icon name based on the pack.
 * If pack is 'fa', gets the equivalent FA icon name of the MDI,
 * internal icons are always MDI.
 */
const computedIcon = computed(
    () => `${iconPrefix.value}${getEquivalentIconOf(props.icon)}`,
);

const computedPack = computed(() => props.pack || getOption("iconPack", "mdi"));

const computedVariant = computed(() => {
    if (!props.variant) return;
    let newVariant = "";
    if (typeof props.variant === "string") {
        newVariant = props.variant;
    } else {
        newVariant = Object.keys(props.variant).filter(
            (key) => props.variant[key],
        )[0];
    }
    return newVariant;
});

const computedCustomSize = computed(
    () => props.customSize || customSizeByPack.value,
);

const customSizeByPack = computed(() => {
    if (iconConfig.value?.sizes) {
        if (props.size && iconConfig.value.sizes[props.size] !== undefined) {
            return iconConfig.value.sizes[props.size];
        } else if (iconConfig.value.sizes.default) {
            return iconConfig.value.sizes.default;
        }
    }
    return null;
});

const iconComponent = computed(() => {
    if (props.component) return props.component;
    const component = getOption("iconComponent");
    if (component) return component;
    return null;
});

/**
 * Equivalent icon name of the MDI.
 */
function getEquivalentIconOf(value) {
    // Only transform the class if the both prop is set to true
    if (!props.both) return value;

    if (
        iconConfig.value?.internalIcons &&
        iconConfig.value?.internalIcons[value]
    )
        return iconConfig.value.internalIcons[value];

    return value;
}

// --- Computed Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-icon"),
    {
        [useComputedClass("clickableClass", "o-icon--clickable")]:
            props.clickable,
    },
    {
        [useComputedClass("spinClass", "o-icon--spin")]: props.spin,
    },
    {
        [useComputedClass("sizeClass", "o-icon--", props.size)]: props.size,
    },
    {
        [useComputedClass("variantClass", "o-icon--", computedVariant.value)]:
            computedVariant.value,
    },
]);
</script>

<template>
    <span :class="rootClasses" :style="rootStyle">
        <!-- custom icon component -->
        <component
            :is="iconComponent"
            v-if="iconComponent"
            :icon="[computedPack, computedIcon]"
            :size="computedCustomSize"
            :class="[customClass]" />
        <i
            v-else
            :class="[
                computedPack,
                computedIcon,
                computedCustomSize,
                customClass,
            ]" />
    </span>
</template>
