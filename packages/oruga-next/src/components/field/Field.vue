<script setup lang="ts">
import {
    computed,
    provide,
    inject,
    ref,
    useSlots,
    watch,
    getCurrentInstance,
} from "vue";

import OFieldBody from "./FieldBody.vue";

import { baseComponentProps } from "@/mixins/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    usePropBinding,
    useMatchMedia,
} from "@/composables";

import type { FieldComponent } from "./index";

/**
 * Fields are used to add functionality to controls and to attach/group components and elements together
 * @displayName Field
 * @style _field.scss
 */
defineOptions({
    isOruga: true,
    name: "OField",
    configField: "field",
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Mobile breakpoint as max-width value */
    mobileBreakpoint: {
        type: String,
        default: () => getOption("field.mobileBreakpoint"),
    },
    /**
     * Color of the field and help message, also adds a matching icon, optional.
     * Used by Input, Select and Autocomplete.
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: { type: String, default: undefined },
    /** Field label */
    label: { type: String, default: undefined },
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    labelSize: {
        type: String,
        default: () => getOption("field.labelsize"),
    },
    /** Same as native for set on the label */
    labelFor: { type: String, default: undefined },
    /** Help message text */
    message: { type: String, default: undefined },
    /**
     * Direct child components/elements of Field will be grouped horizontally
     * (see which ones at the top of the page).
     */
    grouped: { type: Boolean, default: false },
    /** Allow controls to fill up multiple lines, making it responsive */
    groupMultiline: { type: Boolean, default: false },
    /** Group label and control on the same line for horizontal forms */
    horizontal: { type: Boolean, default: false },
    /** Field automatically attach controls together */
    addons: { type: Boolean, default: true },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "horizontalClass",
        "groupedClass",
        "groupMultilineClass",
        "labelClass",
        "labelSizeClass",
        "labelHorizontalClass",
        "bodyClass",
        "bodyHorizontalClass",
        "addonsClass",
        "messageClass",
        "variantMessageClass",
        "variantLabelClass",
        "mobileClass",
        "focusedClass",
        "filledClass",
    ]),
});

const emits = defineEmits<{
    /** variant prop two-way binding */
    (e: "update:variant", value: boolean): void;
    /** message prop two-way binding */
    (e: "update:message", value: boolean): void;
}>();

const { isMobile } = useMatchMedia();

/** Set internal variant when prop change. */
const fieldVariant = usePropBinding<string>("variant", props, emits);

/** Set internal message when prop change. */
const fieldMessage = usePropBinding<string>("message", props, emits);

/** this can be set from outside to update the focus state. */
const isFocused = ref(false);
/** this can be set from outside to update the filled state. */
const isFilled = ref(false);

// inject parent field component if used inside one
const parentField = inject<FieldComponent>("$field", undefined);

// provide field component via dependency injection
const vm = getCurrentInstance();
provide("$field", Object.assign(vm.proxy, vm.exposed));

/** Set parent message if we use Field in Field. */
watch(
    () => fieldMessage.value,
    (value) => {
        if (parentField?.hasInnerField) {
            if (!parentField.fieldVariant)
                parentField.fieldVariant = fieldVariant.value;
            if (!parentField.fieldMessage) parentField.fieldMessage = value;
        }
    },
);

const slots = useSlots();

const hasLabel = computed(() => props.label || !!slots.label);

const hasMessage = computed(
    () =>
        (!parentField?.hasInnerField && fieldMessage.value) || !!slots.message,
);

const hasInnerField = computed(
    () => props.grouped || props.groupMultiline || hasAddons(),
);

function hasAddons(): boolean {
    let renderedNode = 0;
    const slot = slots.default();
    if (slot) {
        const children =
            slot.length === 1 && Array.isArray(slot[0].children)
                ? slot[0].children
                : slot;
        renderedNode = children.filter((n) => !!n).length;
    }
    return renderedNode > 1 && props.addons && !props.horizontal;
}

// make some functionality externally accessible
defineExpose({
    hasInnerField,
    isFocused,
    isFilled,
    fieldVariant,
    fieldMessage,
});

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-field"),
    {
        [useComputedClass("horizontalClass", "o-field--horizontal")]:
            props.horizontal,
    },
    {
        [useComputedClass("mobileClass", "o-field--mobile")]: isMobile.value,
    },
    {
        [useComputedClass("focusedClass", "o-field--focused")]: isFocused.value,
    },
    {
        [useComputedClass("filledClass", "o-field--filled")]: isFilled.value,
    },
]);

const messageClasses = computed(() => [
    useComputedClass("messageClass", "o-field__message"),
    {
        [useComputedClass(
            "variantMessageClass",
            "o-field__message-",
            fieldVariant.value,
        )]: fieldVariant.value,
    },
]);

const labelClasses = computed(() => [
    useComputedClass("labelClass", "o-field__label"),
    {
        [useComputedClass(
            "labelSizeClass",
            "o-field__label-",
            props.labelSize,
        )]: props.labelSize,
    },
    {
        [useComputedClass(
            "variantLabelClass",
            "o-field__label-",
            fieldVariant.value,
        )]: fieldVariant.value,
    },
]);

const labelHorizontalClasses = computed(() => [
    useComputedClass("labelHorizontalClass", "o-field__horizontal-label"),
]);

const bodyClasses = computed(() => [
    useComputedClass("bodyClass", "o-field__body"),
]);

const bodyHorizontalClasses = computed(() => [
    useComputedClass("bodyHorizontalClass", "o-field__horizontal-body"),
]);

const innerFieldClasses = computed(() => [
    useComputedClass("rootClass", "o-field"),
    {
        [useComputedClass("groupMultilineClass", "o-field--grouped-multiline")]:
            props.groupMultiline,
    },
    {
        [useComputedClass("groupedClass", "o-field--grouped")]: props.grouped,
    },
    {
        [useComputedClass("addonsClass", "o-field--addons")]:
            !props.grouped && hasAddons(),
    },
]);
</script>

<template>
    <div :class="rootClasses">
        <div v-if="horizontal" :class="labelHorizontalClasses">
            <label v-if="hasLabel" :for="labelFor" :class="labelClasses">
                <slot name="label">{{ label }}</slot>
            </label>
        </div>
        <template v-else>
            <label v-if="hasLabel" :for="labelFor" :class="labelClasses">
                <slot name="label">{{ label }}</slot>
            </label>
        </template>

        <o-field-body v-if="horizontal" :classes="bodyHorizontalClasses">
            <slot />
        </o-field-body>

        <div v-else-if="hasInnerField" :class="bodyClasses">
            <div :class="innerFieldClasses">
                <slot />
            </div>
        </div>

        <template v-else>
            <slot />
        </template>

        <p v-if="hasMessage && !horizontal" :class="messageClasses">
            <slot name="message"> {{ fieldMessage }} </slot>
        </p>
    </div>
</template>
