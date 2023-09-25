<script setup lang="ts">
import {
    ref,
    computed,
    nextTick,
    inject,
    watch,
    onMounted,
    type StyleValue,
} from "vue";

import OIcon from "../icon/Icon.vue";

import { baseComponentProps } from "@/mixins/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    useVModelBinding,
} from "@/composables";

import type { FieldComponent } from "../field";

/**
 * Get user Input. Use with Field to access all functionalities
 * @displayName Input
 * @style _input.scss
 */
defineOptions({
    isOruga: true,
    name: "OInput",
    configField: "input",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: {
        type: [String, Number],
        default: undefined,
    },
    /**
     * Input type, like native
     * @values Any native input type, and textarea
     */
    type: {
        type: String,
        default: "text",
    },
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("input.size"),
    },
    /**
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("input.variant"),
    },
    /** Makes input full width when inside a grouped or addon field */
    expanded: { type: Boolean, default: false },
    /** Makes the element rounded */
    rounded: { type: Boolean, default: false },
    /** Native options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("input.autocompletete", "off"),
    },
    /** Adds the reveal password functionality */
    passwordReveal: { type: Boolean, default: false },
    /** Same as native maxlength, plus character counter */
    maxlength: { type: [Number, String], default: undefined },
    /** Show character counter when maxlength prop is passed */
    hasCounter: {
        type: Boolean,
        default: () => getOption("input.counter", false),
    },
    /** Automatically adjust height in textarea */
    autosize: { type: Boolean, default: false },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: { type: String, default: undefined },
    /** Icon name to be shown */
    icon: { type: String, default: undefined },
    /** Makes the icon clickable */
    iconClickable: { type: Boolean, default: false },
    /** Icon name to be added on the right side */
    iconRight: { type: String, default: undefined },
    /** Make the icon right clickable */
    iconRightClickable: { type: Boolean, default: false },
    /** Variant of right icon */
    iconRightVariant: { type: String, default: undefined },
    /** Add a button/icon to clear the inputed text */
    clearable: {
        type: Boolean,
        default: () => getOption("input.clearable", false),
    },
    /**
     * Icon name to be added on the clear button
     */
    clearIcon: {
        type: String,
        default: () => getOption("input.clearIcon", "close-circle"),
    },
    /** Enable html 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    /** The message which is shown when a validation error occurs */
    validationMessage: { type: String, default: undefined },
    /** Show status icon using field and variant prop */
    statusIcon: {
        type: Boolean,
        default: () => getOption("statusIcon", true),
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "expandedClass",
        "iconLeftSpaceClass",
        "iconRightSpaceClass",
        "inputClass",
        "roundedClass",
        "iconLeftClass",
        "iconRightClass",
        "counterClass",
        "sizeClass",
        "variantClass",
    ]),
});

const emits = defineEmits<{
    /** modelValue prop two-way binding */
    (e: "update:modelValue", value: string | number): void;
    /** on input change event */
    (e: "input", value: string | number): void;
    /** on input focus event */
    (e: "focus", value: Event): void;
    /** on input blur event */
    (e: "blur", value: Event): void;
    /** on input invalid event */
    (e: "invalid", value: Event): void;
    /** on icon click event */
    (e: "icon-click"): void;
    /** on icon right click event */
    (e: "icon-right-click"): void;
}>();

// const newValue = ref(this.modelValue);
const vmodel = useVModelBinding<string | number>(props, emits);

// inject parent field component if used inside one
const parentField = inject<FieldComponent>("$field", undefined);

/**
 * Get value length
 */
const valueLength = computed(() => {
    if (typeof vmodel.value === "string") {
        return vmodel.value.length;
    } else if (typeof vmodel.value === "number") {
        return vmodel.value.toString().length;
    }
    return 0;
});

onMounted(() => {
    /**
     * When v-model is changed:
     *  1. Set parent field filled state.
     *  2. Resize textarea input
     *  3. Check html5 valdiation
     */
    watch(
        () => vmodel.value,
        (value) => {
            if (parentField) parentField.isFilled = !!value;
            if (props.autosize) resize();
            checkHtml5Validity();
        },
        { immediate: true },
    );
});

const height = ref("auto");

function resize(): void {
    height.value = "auto";
    nextTick(() => {
        if (textareaRef.value) {
            const scrollHeight = textareaRef.value.scrollHeight;
            height.value = scrollHeight + "px";
        }
    });
}

/**
 * Computed inline styles for autoresize
 */
const computedStyles = computed(
    (): StyleValue =>
        props.autosize
            ? {
                  resize: "none",
                  height: height.value,
                  overflow: "hidden",
              }
            : {},
);

// --- Icon Feature ---

/**
 * Get the type prop from parent if it's a Field.
 */
const statusVariant = computed(() => {
    if (!parentField) return undefined;
    else if (!parentField.fieldVariant) return undefined;
    else {
        if (typeof parentField.fieldVariant === "string") {
            return parentField.fieldVariant;
        } else if (Array.isArray(parentField.fieldVariant)) {
            for (const key in parentField.fieldVariant as any) {
                if (parentField.fieldVariant[key]) {
                    return key;
                }
            }
        }
    }
    return undefined;
});

/**
 * Icon name based on the variant.
 */
const statusVariantIcon = computed(() => {
    const statusVariantIcon = getOption("statusVariantIcon", {
        success: "check",
        danger: "alert-circle",
        info: "information",
        warning: "alert",
    });
    return statusVariantIcon[statusVariant.value] || "";
});

const hasIconRight = computed(
    () =>
        props.passwordReveal ||
        (props.statusIcon && statusVariantIcon.value) ||
        (props.clearable && vmodel.value && props.clearIcon) ||
        props.iconRight,
);

const rightIcon = computed(() => {
    if (props.passwordReveal) {
        return passwordVisibleIcon.value;
    } else if (props.clearable && vmodel.value && props.clearIcon) {
        return props.clearIcon;
    } else if (props.iconRight) {
        return props.iconRight;
    }
    return statusVariantIcon.value;
});

const rightIconVariant = computed(() => {
    if (props.passwordReveal || props.iconRight) {
        return props.iconRightVariant || props.variant || null;
    }
    return statusVariant.value;
});

function iconClick(emit, event): void {
    emits(emit, event);
    nextTick(() => focus());
}

function rightIconClick(event): void {
    if (props.passwordReveal) {
        togglePasswordVisibility();
    } else if (props.clearable) {
        vmodel.value = "";
    }
    if (props.iconRightClickable) {
        iconClick("icon-right-click", event);
    }
}

// --- Password Visability Feature ---

const isPasswordVisible = ref(false);
const inputType = ref(props.type);

/**
 * Current password-reveal icon name.
 */
const passwordVisibleIcon = computed(() =>
    !isPasswordVisible.value ? "eye" : "eye-off",
);

/**
 * Toggle the visibility of a password-reveal input
 * by changing the type and focus the input right away.
 */
function togglePasswordVisibility(): void {
    isPasswordVisible.value = !isPasswordVisible.value;
    inputType.value = isPasswordVisible.value ? "text" : "password";
    nextTick(() => focus());
}

// --- Input Focus Feature ---

const isFocused = ref(false);

/**
 * Focus method that work dynamically depending on the component.
 */
function focus(): void {
    nextTick(() => {
        if (elementRef.value) elementRef.value.focus();
    });
}

function onBlur(event: Event): void {
    isFocused.value = false;
    if (parentField) parentField.isFocused = false;
    emits("blur", event);
    checkHtml5Validity();
}

function onFocus(event: Event): void {
    isFocused.value = true;
    if (parentField) parentField.isFocused = true;
    emits("focus", event);
}

// --- Validation Feature ---

const isValid = ref(true);
const inputRef = ref<HTMLInputElement>();
const textareaRef = ref<HTMLInputElement>();

const elementRef = computed<HTMLInputElement>(() =>
    props.type === "textarea" ? textareaRef.value : inputRef.value,
);

// This should cover all types of HTML elements that have properties related to
// HTML constraint validation, e.g. .form and .validity.
const validatableFormElementTypes =
    typeof window === "undefined"
        ? []
        : [
              HTMLButtonElement,
              HTMLFieldSetElement,
              HTMLInputElement,
              HTMLObjectElement,
              HTMLOutputElement,
              HTMLSelectElement,
              HTMLTextAreaElement,
          ];

type ValidatableFormElement = InstanceType<
    (typeof validatableFormElementTypes)[number]
>;

function asValidatableFormElement(el: unknown): ValidatableFormElement | null {
    return validatableFormElementTypes.some((t) => el instanceof t)
        ? (el as ValidatableFormElement)
        : null;
}

/**
 * Check HTML5 validation, set isValid property.
 * If validation fail, send 'danger' type,
 * and error message to parent if it's a Field.
 */
function checkHtml5Validity(): boolean {
    if (!props.useHtml5Validation) return;

    if (elementRef.value.validity.valid) {
        setValidity(null, null);
        isValid.value = true;
    } else {
        setInvalid();
        isValid.value = false;
    }

    return isValid.value;
}

function setInvalid(): void {
    const variant = "danger";
    const message =
        props.validationMessage || elementRef.value.validationMessage;
    setValidity(variant, message);
}

function setValidity(variant, message): void {
    nextTick(() => {
        if (parentField) {
            // Set type only if not defined
            if (!parentField.variant) {
                parentField.fieldVariant = variant;
            }
            // Set message only if not defined
            if (!parentField.message) {
                parentField.fieldMessage = message;
            }
        }
    });
}

function onInvalid(event: Event): void {
    checkHtml5Validity();
    const validatable = asValidatableFormElement(event.target);
    if (validatable && parentField && props.useHtml5Validation) {
        // We provide our own error message on the field, so we should suppress the browser's default tooltip.
        // We still want to focus the form's first invalid input, though.
        event.preventDefault();
        let isFirstInvalid = false;
        if (validatable.form != null) {
            const formElements = validatable.form.elements;
            for (let i = 0; i < formElements.length; ++i) {
                const element = asValidatableFormElement(formElements.item(i));
                if (element?.willValidate && !element.validity.valid) {
                    isFirstInvalid = validatable === element;
                    break;
                }
            }
        }
        if (isFirstInvalid) {
            const fieldElement = parentField.$el;
            const invalidHandler = getOption("reportInvalidInput");
            if (invalidHandler instanceof Function) {
                invalidHandler(validatable, fieldElement);
            } else {
                // We'll scroll to put the whole field in view, not just the element that triggered the event,
                // which should mean that the message will be visible onscreen.
                // scrollIntoViewIfNeeded() is a non-standard method (but a very common extension).
                // If we can't use it, we'll just fall back to focusing the field.
                const canScrollToField = fieldElement
                    ? fieldElement.scrollIntoViewIfNeeded != undefined
                    : false;
                validatable.focus({ preventScroll: canScrollToField });
                if (canScrollToField) {
                    fieldElement.scrollIntoViewIfNeeded();
                }
            }
        }
    }
    emits("invalid", event);
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-ctrl-input"),
    {
        [useComputedClass("expandedClass", "o-ctrl-input--expanded")]:
            props.expanded,
    },
]);

const inputClasses = computed(() => [
    useComputedClass("inputClass", "o-input"),
    {
        [useComputedClass("roundedClass", "o-input--rounded")]: props.rounded,
    },
    {
        [useComputedClass("sizeClass", "o-input--", props.size)]: props.size,
    },
    {
        [useComputedClass(
            "variantClass",
            "o-input--",
            statusVariant.value || props.variant,
        )]: statusVariant.value || props.variant,
    },
    {
        [useComputedClass("textareaClass", "o-input__textarea")]:
            props.type === "textarea",
    },
    {
        [useComputedClass("iconLeftSpaceClass", "o-input-iconspace-left")]:
            props.icon,
    },
    {
        [useComputedClass("iconRightSpaceClass", "o-input-iconspace-right")]:
            hasIconRight.value,
    },
]);

const iconLeftClasses = computed(() => [
    useComputedClass("iconLeftClass", "o-input__icon-left"),
]);

const iconRightClasses = computed(() => [
    useComputedClass("iconRightClass", "o-input__icon-right"),
]);

const counterClasses = computed(() => [
    useComputedClass("counterClass", "o-input__counter"),
]);
</script>

<template>
    <div :class="rootClasses">
        <o-icon
            v-if="icon"
            :class="iconLeftClasses"
            :clickable="iconClickable"
            :icon="icon"
            :pack="iconPack"
            :size="size"
            @click="iconClick('icon-click', $event)" />

        <input
            v-if="type !== 'textarea'"
            v-bind="$attrs"
            ref="inputRef"
            v-model="vmodel"
            :class="inputClasses"
            :type="inputType"
            :autocomplete="autocomplete"
            :maxlength="maxlength"
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid" />

        <textarea
            v-else
            v-bind="$attrs"
            ref="textareaRef"
            v-model="vmodel"
            :class="inputClasses"
            :maxlength="maxlength"
            :style="computedStyles"
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid" />

        <o-icon
            v-if="hasIconRight"
            :class="iconRightClasses"
            :clickable="passwordReveal || clearable || iconRightClickable"
            :icon="rightIcon"
            :pack="iconPack"
            :size="size"
            :variant="rightIconVariant"
            both
            @click="rightIconClick" />

        <small
            v-if="maxlength && hasCounter && isFocused && type !== 'number'"
            :class="counterClasses">
            {{ valueLength }} / {{ maxlength }}
        </small>
    </div>
</template>
