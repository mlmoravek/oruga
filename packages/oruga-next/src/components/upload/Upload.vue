<script setup lang="ts">
import { computed, ref, watch, type PropType } from "vue";
import { baseComponentProps } from "@/mixins/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    useVModelBinding,
    useFormInput,
} from "@/composables";
import { File } from "../../utils/ssr";

/**
 * Upload one or more files
 * @displayName Upload
 * @style _upload.scss
 */
defineOptions({
    isOruga: true,
    name: "OUpload",
    configField: "upload",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: {
        type: [Object, Array] as PropType<
            object | typeof File | object[] | (typeof File)[]
        >,
        default: undefined,
    },
    /**
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("upload.variant"),
    },
    /** Same as native, also push new item to v-model instead of replacing */
    multiple: { type: Boolean, default: false },
    /** Same as native disabled */
    disabled: { type: Boolean, default: false },
    /** Same as native accept */
    accept: { type: String, default: undefined },
    /** Accepts drag & drop and change its style */
    dragDrop: { type: Boolean, default: false },
    /** Upload will be expanded (full-width) */
    expanded: { type: Boolean, default: false },
    /** Replace last chosen files every time (like native file input element) */
    native: { type: Boolean, default: true },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "draggableClass",
        "variantClass",
        "expandedClass",
        "disabledClass",
        "hoveredClass",
    ]),
});

const emits = defineEmits<{
    /** modelValue prop two-way binding */
    (e: "update:modelValue", value: Object | Object[] | File | File[]): void;
    /** on input focus event */
    (e: "focus", evt: Event): void;
    /** on input blur event */
    (e: "blur", evt: Event): void;
    /** on input invalid event */
    (e: "invalid", evt: Event): void;
}>();
const inputRef = ref();

const vmodel = useVModelBinding<Object | Object[] | File | File[]>(
    props,
    emits,
);

// use form input functionality
const { checkHtml5Validity, isValid } = useFormInput(inputRef, emits);

const dragDropFocus = ref(false);

/**
 *   When v-model is changed:
 *   1. Reset interna input file value
 *   2. If it's invalid, validate again.
 */
watch(
    () => props.modelValue,
    (value) => {
        if (!value || (Array.isArray(value) && value.length === 0))
            inputRef.value.value = null;
        if (!isValid.value && !props.dragDrop) checkHtml5Validity();
    },
);

/**
 * Listen change event on input type 'file',
 * emit 'input' event and validate
 */
function onFileChange(event): void {
    if (props.disabled) return;
    if (props.dragDrop) updateDragDropFocus(false);
    const value = event.target.files || event.dataTransfer.files;
    // no file selected
    if (value.length === 0) {
        if (!vmodel.value) return;
        if (props.native) vmodel.value = null;
    }
    // single uplaod
    else if (!props.multiple) {
        // only one element in case drag drop mode and isn't multiple
        if (props.dragDrop && value.length !== 1) return;
        else {
            const file = value[0];
            if (checkType(file)) vmodel.value = file;
            else if (vmodel.value) {
                vmodel.value = null;
                clearInput();
            } else {
                // Force input back to empty state and recheck validity
                clearInput();
                checkHtml5Validity();
                return;
            }
        }
    }
    // multiple upload
    else {
        // always new values if native or undefined local
        let newValues = false;
        if (props.native || !vmodel.value || !Array.isArray(vmodel.value)) {
            vmodel.value = [] as any;
            newValues = true;
        }
        for (let i = 0; i < value.length; i++) {
            const file = value[i];
            if (checkType(file) && Array.isArray(vmodel.value)) {
                vmodel.value.push(file);
                newValues = true;
            }
        }
        if (!newValues) return;
    }

    if (!props.dragDrop) checkHtml5Validity();
}

/*
 * Reset file input value
 */
function clearInput(): void {
    inputRef.value.value = null;
}

/**
 * Listen drag-drop to update internal variable
 */
function updateDragDropFocus(focus): void {
    if (!props.disabled) dragDropFocus.value = focus;
}

/**
 * Check mime type of file
 */
function checkType(file: File): boolean {
    if (!props.accept) return true;
    const types = props.accept.split(",");
    if (types.length === 0) return true;
    for (let i = 0; i < types.length; i++) {
        const type = types[i].trim();
        if (type) {
            if (type.substring(0, 1) === ".") {
                const extension = file.name.toLowerCase().slice(-type.length);
                if (extension === type.toLowerCase()) return true;
            } else {
                // check mime type
                if (file.type.match(type)) return true;
            }
        }
    }
    return false;
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-upl"),
    {
        [useComputedClass("expandedClass", "o-upl--expanded")]: props.expanded,
    },
    {
        [useComputedClass("disabledClass", "o-upl--disabled")]: props.disabled,
    },
]);

const draggableClasses = computed(() => [
    useComputedClass("draggableClass", "o-upl__draggable"),
    {
        [useComputedClass("hoveredClass", "o-upl__draggable--hovered")]:
            !props.variant && dragDropFocus.value,
    },
    {
        [useComputedClass(
            "variantClass",
            "o-upl__draggable--hovered-",
            props.variant,
        )]: props.variant && dragDropFocus.value,
    },
]);
</script>

<template>
    <label :class="rootClasses">
        <template v-if="!dragDrop">
            <slot />
        </template>

        <div
            v-else
            :class="draggableClasses"
            @mouseenter="updateDragDropFocus(true)"
            @mouseleave="updateDragDropFocus(false)"
            @dragover.prevent="updateDragDropFocus(true)"
            @dragleave.prevent="updateDragDropFocus(false)"
            @dragenter.prevent="updateDragDropFocus(true)"
            @drop.prevent="onFileChange">
            <slot />
        </div>

        <input
            ref="inputRef"
            type="file"
            v-bind="$attrs"
            :multiple="multiple"
            :accept="accept"
            :disabled="disabled"
            @change="onFileChange" />
    </label>
</template>
