<script setup lang="ts">
import { computed, useAttrs, type PropType, ref, watch } from "vue";

import ODropdown from "../dropdown/Dropdown.vue";
import ODropdownItem from "../dropdown/DropdownItem.vue";
import OInput from "../input/Input.vue";

import type { TimepickerProps } from "../timepicker/useTimepickerMixin";
import type { DatepickerProps } from "./useDatepickerMixin";

import { useEventListener, useInputHandler } from "@/composables";
import { isClient, isMobileAgent } from "@/utils/helpers";
import type { BindProp } from "@/types";

/**
 * This is a internal used component.
 * Used by Datepicker and Timepicker.
 */
defineOptions({
    name: "OPickerWrapper",
});

const props = defineProps({
    value: { type: [Date, Array], required: true },
    formattedValue: { type: String, required: true },
    pickerProps: {
        type: Object as PropType<DatepickerProps | TimepickerProps>,
        required: true,
    },
    nativeType: { type: String, required: true },
    nativeStep: { type: String, default: undefined },
    nativeValue: { type: [String, Number], default: undefined },
    nativeMin: { type: [String, Number], default: undefined },
    nativeMax: { type: [String, Number], default: undefined },
    stayOpen: { type: Boolean, default: false },
    rootclass: { type: String, required: true },
    rootClasses: {
        type: [String, Object] as PropType<BindProp>,
        required: true,
    },
    boxClasses: {
        type: [String, Object] as PropType<BindProp>,
        required: true,
    },
});

const emits = defineEmits<{
    /** on value change event */
    (e: "change", value: string): void;
    /** on natvie value change event */
    (e: "native-change", value: string): void;
    /** on active state change event */
    (e: "active-change", value: boolean): void;
    /** on input focus event */
    (e: "focus", evt: Event): void;
    /** on input blur event */
    (e: "blur", evt: Event): void;
    /** on input invalid event */
    (e: "invalid", evt: Event): void;
    /** on icon click event */
    (e: "icon-click", evt: Event): void;
    /** on icon right click event */
    (e: "icon-right-click", evt: Event): void;
}>();

/** the computed picker contains all chared props from the datepicker and the timepicker  */
const picker = computed<DatepickerProps | TimepickerProps>(
    () => props.pickerProps,
);

const isMobileNative = computed(
    () => picker.value.mobileNative && isMobileAgent.any(),
);

const dropdownRef = ref();
const inputRef = ref();
const nativeInputRef = ref();

const elementRef = computed(() =>
    isMobileNative.value ? nativeInputRef.value : inputRef.value,
);

// use form input functionality for native input
const { checkHtml5Validity, onBlur, onFocus, onInvalid, isValid } =
    useInputHandler(elementRef, emits, picker.value);

/**
 * When v-model is changed:
 *   1. Update internal value.
 *   2. If it's invalid, validate again.
 */
watch(
    () => props.value,
    () => {
        // toggle picker if not stay open
        if (!props.stayOpen) togglePicker(false);
        // check validation if native
        if (isMobileNative.value && !isValid.value) checkHtml5Validity();
    },
);

const ariaRole = computed(() => (!picker.value.inline ? "dialog" : undefined));

if (isClient) useEventListener("keyup", onKeyPress);

/** Keypress event that is bound to the document. */
function onKeyPress(event: KeyboardEvent): void {
    if (
        dropdownRef.value?.isActive &&
        (event.key === "Escape" || event.key === "Esc")
    )
        togglePicker(false);
}
// --- EVENT HANDLER ---

/** Toggle picker */
function togglePicker(active: boolean): void {
    if (isMobileNative.value) {
        const input = inputRef.value;
        input.focus();
        input.click();
    } else if (dropdownRef.value) {
        const isActive =
            typeof active === "boolean" ? active : !dropdownRef.value.isActive;
        if (isActive) {
            dropdownRef.value.isActive = isActive;
        } else if (picker.value.closeOnClick) {
            dropdownRef.value.isActive = isActive;
        }
    }
}

/** Avoid dropdown toggle when is already visible */
function onInputClick(event): void {
    if (dropdownRef.value.isActive) event.stopPropagation();
}

/** Emit 'blur' event on dropdown is not active (closed) */
function onActiveChange(value: boolean): void {
    if (!value) onBlur();
    else if (value) onFocus();
    emits("active-change", value);
}

/** Call default onFocus method and show datepicker */
function handleOnFocus(event: Event): void {
    onFocus(event);
    if (picker.value.openOnFocus) togglePicker(true);
}

// --- Computed Component Classes ---

const attrs = useAttrs();
const inputBind = computed(() => ({
    ...attrs,
    ...picker.value.inputClasses,
}));

const dropdownBind = computed(() => ({
    "root-class": props.rootclass,
    ...picker.value.dropdownClasses,
}));
</script>

<template>
    <div :class="rootClasses">
        <o-dropdown
            v-if="!isMobileNative || picker.inline"
            ref="dropdownRef"
            v-bind="dropdownBind"
            :position="picker.position"
            :disabled="picker.disabled"
            :inline="picker.inline"
            :mobile-modal="picker.mobileModal"
            :trap-focus="picker.trapFocus"
            :aria-role="ariaRole"
            :aria-modal="!picker.inline"
            :trigger-tabindex="-1"
            :append-to-body="picker.appendToBody"
            append-to-body-copy-parent
            @active-change="onActiveChange">
            <template v-if="!picker.inline" #trigger>
                <slot name="trigger">
                    <o-input
                        ref="inputRef"
                        v-bind="inputBind"
                        autocomplete="off"
                        :model-value="formattedValue"
                        :placeholder="picker.placeholder"
                        :size="picker.size"
                        :icon-pack="picker.iconPack"
                        :icon="picker.icon"
                        :icon-right="picker.iconRight"
                        :icon-right-clickable="picker.iconRightClickable"
                        :expanded="picker.expanded"
                        :rounded="picker.rounded"
                        :disabled="picker.disabled"
                        :readonly="picker.readonly"
                        :use-html5-validation="false"
                        @click="onInputClick"
                        @keyup.enter="togglePicker(true)"
                        @change="$emit('change', $event.target.value)"
                        @focus="handleOnFocus"
                        @blur="onBlur"
                        @icon-click="$emit('icon-click', $event)"
                        @icon-right-click="$emit('icon-right-click', $event)" />
                </slot>
            </template>
            <o-dropdown-item
                override
                tag="div"
                :item-class="boxClasses"
                :disabled="picker.disabled"
                :clickable="false">
                <slot />
            </o-dropdown-item>
        </o-dropdown>

        <!-- Native Picker -->
        <o-input
            v-else
            ref="nativeInputRef"
            v-bind="inputBind"
            :type="nativeType"
            autocomplete="off"
            :model-value="nativeValue"
            :min="nativeMin"
            :max="nativeMax"
            :step="nativeStep"
            :placeholder="picker.placeholder"
            :size="picker.size"
            :icon-pack="picker.iconPack"
            :icon="picker.icon"
            :icon-right="picker.iconRight"
            :icon-right-clickable="picker.iconRightClickable"
            :rounded="picker.rounded"
            :disabled="picker.disabled"
            :readonly="false"
            :use-html5-validation="false"
            @change="$emit('native-change', $event.target.value)"
            @focus="onFocus"
            @blur="onBlur"
            @invalid="onInvalid"
            @icon-click="$emit('icon-click', $event)"
            @icon-right-click="$emit('icon-right-click', $event)" />
    </div>
</template>
