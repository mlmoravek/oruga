<script setup lang="ts">
import { computed, ref } from "vue";

import { baseComponentProps } from "@/mixins/SharedProps";
import { getOption } from "@/utils/config";
import { uuid } from "@/utils/helpers";
import {
    useComputedClass,
    useClassProps,
    usePropBinding,
    useVModelBinding,
} from "@/composables";
/**
 * Select a single or grouped options
 * @displayName Checkbox
 * @style _checkbox.scss
 */
defineOptions({
    isOruga: true,
    name: "OCheckbox",
    configField: "checkbox",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: { type: Boolean, default: undefined },
    /**
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("checkbox.variant"),
    },
    /**
     * Size of the control
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("checkbox.size"),
    },
    /** Input label, optional when default slot is used */
    label: { type: String, default: undefined },
    /** Same as native indeterminate */
    indeterminate: { type: Boolean, default: false },
    /** Same as native value */
    nativeValue: {
        type: [String, Number, Boolean, Array],
        default: undefined,
    },
    /** Same as native disabled */
    disabled: { type: Boolean, default: false },
    /** Same as native required */
    required: { type: Boolean, default: false },
    /** Same as native name */
    name: { type: String, default: undefined },
    /** Overrides the returned value when it's checked */
    trueValue: { type: [String, Number, Boolean], default: true },
    /** Overrides the returned value when it's not checked */
    falseValue: { type: [String, Number, Boolean], default: false },
    /**
     * Accessibility label to establish relationship between the checkbox and control label
     */
    ariaLabelledby: { type: String, default: () => uuid() },
    /** Same as native autocomplete */
    autocomplete: { type: String, default: undefined },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "disabledClass",
        "checkClass",
        "checkedClass",
        "checkCheckedClass",
        "checkIndeterminateClass",
        "labelClass",
        "sizeClass",
        "variantClass",
    ]),
});

const emits = defineEmits<{
    /** modelValue prop two-way binding */
    (e: "update:modelValue", value: boolean): void;
    /** indeterminate prop two-way binding */
    (e: "update:indeterminate", value: boolean): void;
}>();

const vmodel = useVModelBinding(props, emits);

const isIndeterminate = usePropBinding("indeterminate", props, emits);

const inputRef = ref();

const isChecked = computed(
    () =>
        vmodel.value === props.trueValue ||
        (Array.isArray(vmodel.value) &&
            vmodel.value.indexOf(props.nativeValue) !== -1),
);

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-chk"),
    {
        [useComputedClass("checkedClass", "o-chk--checked")]: isChecked.value,
    },
    {
        [useComputedClass("sizeClass", "o-chk--", props.size)]: props.size,
    },
    {
        [useComputedClass("disabledClass", "o-chk--disabled")]: props.disabled,
    },
    {
        [useComputedClass("variantClass", "o-chk--", props.variant)]:
            props.variant,
    },
]);

const checkClasses = computed(() => [
    useComputedClass("checkClass", "o-chk__check"),
    {
        [useComputedClass("checkCheckedClass", "o-chk__check--checked")]:
            isChecked.value,
    },
    {
        [useComputedClass(
            "checkIndeterminateClass",
            "o-chk__check--indeterminate",
        )]: isIndeterminate.value,
    },
]);

const labelClasses = computed(() =>
    useComputedClass("labelClass", "o-chk__label"),
);

function focus(): void {
    // MacOS FireFox and Safari do not focus when clicked
    inputRef.value.input.focus();
}
</script>

<template>
    <label
        :class="rootClasses"
        @click.stop="focus"
        @keydown.prevent.enter="focus">
        <input
            v-bind="$attrs"
            ref="inputRef"
            v-model="vmodel"
            type="checkbox"
            :class="checkClasses"
            :disabled="disabled"
            :required="required"
            :name="name"
            :autocomplete="autocomplete"
            :value="nativeValue"
            :indeterminate.prop="indeterminate"
            :true-value="trueValue"
            :false-value="falseValue"
            :aria-labelledby="ariaLabelledby"
            @click.stop />
        <span
            v-if="label || $slots.default"
            :id="ariaLabelledby"
            :class="labelClasses">
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>
