<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, watch, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";
import OAutocomplete from "../autocomplete/Autocomplete.vue";

import { baseComponentProps } from "@/mixins/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    useVModelBinding,
    useInputHandler,
} from "@/composables";
import { getValueByPath } from "../../utils/helpers";

/**
 * A simple tag input field that can have autocomplete functionality
 * @displayName TagInput
 * @style _taginput.scss
 */
defineOptions({
    isOruga: true,
    name: "OTagInput",
    configField: "taginput",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: { type: Array, default: () => [] },
    /** Items data */
    data: { type: Array, default: () => [] },
    /** Property of the object (if data is array of objects) to use as display text */
    field: { type: String, default: "value" },
    /** Property of the object (if <code>data</code> is array of objects) to use as display text of group */
    groupField: { type: String, default: undefined },
    /** Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional */
    groupOptions: { type: String, default: undefined },
    /**
     * Vertical size of the input control, optional
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("taginput.size"),
    },
    /**
     * Color of the each items, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("taginput.variant"),
    },
    /** Limits the number of items, plus item counter */
    maxitems: { type: Number, default: undefined },
    /** Same as native maxlength, plus character counter */
    maxlength: { type: Number, default: undefined },
    /** Show counter when maxlength or maxtags props are passed */
    hasCounter: {
        type: Boolean,
        default: () => getOption("taginput.hasCounter", true),
    } /**  Opens a dropdown with choices when the input field is focused */,
    openOnFocus: { type: Boolean, default: false },
    /** Input will be disabled */
    disabled: { type: Boolean, default: false },
    /** Makes input full width when inside a grouped or addon field */
    expanded: { type: Boolean, default: false },
    /**
     * Array of keys
     * (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
     * which will add a item when typing (default comma, tab and enter)
     */
    confirmKeys: {
        type: Array,
        default: () => getOption("taginput.confirmKeys", [",", "Tab", "Enter"]),
    },
    /** Array of chars used to split when pasting a new string */
    pasteSeparators: {
        type: Array as PropType<string[]>,
        default: () => getOption("taginput.pasteSeparators", [","]),
    },
    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst: { type: Boolean, default: false },
    /** When autocomplete, it allow to add new items */
    allowNew: { type: Boolean, default: false },
    /** Allows adding the same item multiple time */
    allowDuplicates: { type: Boolean, default: false },
    /** Add autocomplete feature (if true, any Autocomplete props may be used too) */
    allowAutocomplete: { type: Boolean, default: false },
    /** Allow removing last item when pressing given keys, if input is empty */
    removeOnKeys: {
        type: Array,
        default: () => getOption("taginput.removeOnKeys", ["Backspace"]),
    },
    /** Function to validate the value of the item before adding */
    beforeAdding: {
        type: Function as PropType<(value: string) => boolean>,
        default: () => true,
    },
    /** Function to create a new item to push into v-model (items) */
    createItem: {
        type: Function as PropType<(value: any) => any>,
        default: (item: any) => item,
    },
    /** Makes the autocomplete component check if list reached scroll end and emit infinite-scroll event */
    checkInfiniteScroll: { type: Boolean, default: false },
    /** Add close/delete button to the item */
    closable: {
        type: Boolean,
        default: () => getOption("taginput.closable", true),
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("taginput.iconPack", undefined),
    },
    /** Icon name to be shown */
    icon: {
        type: String,
        default: () => getOption("taginput.icon", undefined),
    },
    /** Icon name of close icon on selected item */
    closeIcon: {
        type: String,
        default: () => getOption("taginput.closeIcon", "close"),
    },
    /** Accessibility label for the close button */
    ariaCloseLabel: {
        type: String,
        default: () => getOption("taginput.ariaCloseLabel"),
    },
    /** Enable html 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    /** Native options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("taginput.autocomplete", "off"),
    },
    /** Append autocomplete content to body */
    appendToBody: {
        type: Boolean,
        default: () => getOption("taginput.appendToBody", false),
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "expandedClass",
        "variantClass",
        "closeClass",
        "itemClass",
        "counterClass",
    ]),
    autocompleteClasses: {
        type: Object,
        default: () => getOption("taginput.autocompleteClasses", {}),
    },
});

const emits = defineEmits<{
    /** modelValue prop two-way binding */
    (e: "update:modelValue", value: any[]): void;
    /** on input change event */
    (e: "input", value: any): void;
    /** the scroll list inside the dropdown reached it's end */
    (e: "infinite-scroll"): void;
    /** new item got added */
    (e: "add", value: any): void;
    /** item got removed */
    (e: "remove", value: any): void;
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

const autocompleteRef = ref();

const items = useVModelBinding<any[]>(props, emits);

// use form input functionality
const { onFocus, onBlur, onInvalid } = useInputHandler(
    autocompleteRef,
    emits,
    props,
);

const newItem = ref("");
const isComposing = ref(false);

const valueLength = computed(() => newItem.value.trim().length);
const itemsLength = computed(() => items.value.length);

/** When modelValue is changed set internal value. */
watch(
    () => props.modelValue,
    (value) => {
        items.value = Array.isArray(value) ? value.slice(0) : value || [];
    },
);

/** Show the input field if a maxitems hasn't been set or reached. */
const hasInput = computed(
    () => props.maxitems == null || itemsLength.value < props.maxitems,
);

watch(
    () => hasInput.value,
    () => {
        // blur if input is empty
        if (!hasInput.value) onBlur();
    },
);

/**
 * If input has pasteSeparators prop,
 * returning new RegExp used to split pasted string.
 */
const separatorsAsRegExp = computed(() =>
    props.pasteSeparators.length
        ? new RegExp(
              props.pasteSeparators
                  .map((s) =>
                      s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : null,
                  )
                  .join("|"),
              "g",
          )
        : null,
);

function addItem(item?: string): void {
    item = item || newItem.value.trim();

    if (item) {
        if (!props.allowAutocomplete) {
            const reg = separatorsAsRegExp.value;
            if (reg && item.match(reg)) {
                item.split(reg)
                    .map((t) => t.trim())
                    .filter((t) => t.length !== 0)
                    .map(addItem);
                return;
            }
        }
        // Add the item input if it is not blank
        // or previously added (if not allowDuplicates).
        const itemToAdd = props.createItem(item);
        const add = !props.allowDuplicates
            ? items.value.indexOf(itemToAdd) === -1
            : true;
        if (add && props.beforeAdding(item)) {
            items.value.push(itemToAdd);
            emits("add", itemToAdd);
        }
    }

    // after autocomplete events
    requestAnimationFrame(() => {
        newItem.value = "";
        emits("input", newItem.value);
    });
}

function getNormalizedItemText(item: any): string {
    if (typeof item === "object") item = getValueByPath(item, props.field);
    return `${item}`;
}

function customOnBlur(event: Event): void {
    // Add item on-blur if not select only
    if (!props.allowAutocomplete) addItem();
    onBlur(event);
}

function onSelect(option?: string): void {
    if (!option) return;
    addItem(option);
    nextTick(() => (newItem.value = ""));
}

function removeItem(index: number, event?: Event): void {
    const item = items.value.splice(index, 1)[0];
    emits("remove", item);
    if (event) event.stopPropagation();
    if (props.openOnFocus && autocompleteRef.value) {
        autocompleteRef.value.focus();
    }
}

function removeLastItem(): void {
    if (itemsLength.value > 0) removeItem(itemsLength.value - 1);
}

function onKeydown(event: KeyboardEvent): void {
    if (
        props.removeOnKeys.indexOf(event.key) !== -1 &&
        !newItem.value?.length
    ) {
        removeLastItem();
    }
    // Stop if is to accept select only
    if (props.allowAutocomplete && !props.allowNew) return;

    if (props.confirmKeys.indexOf(event.key) >= 0) {
        // Allow Tab to advance to next field regardless
        if (event.key !== "Tab") event.preventDefault();
        if (event.key === "Enter" && isComposing.value) return;
        addItem();
    }
}

function onInput(value: string): void {
    emits("input", value.trim());
}

// --- Computed Component Classes ---

const attrs = useAttrs();
const autocompleteBind = computed(() => ({
    ...attrs,
    "root-class": useComputedClass(
        "autocompleteClasses.rootClass",
        "o-taginput__autocomplete",
    ),
    "input-classes": {
        "input-class": useComputedClass(
            "autocompleteClasses.inputClasses.inputClass",
            "o-taginput__input",
        ),
    },
    ...props.autocompleteClasses,
}));

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-taginput"),
    {
        [useComputedClass("expandedClass", "o-taginput--expanded")]:
            props.expanded,
    },
]);

const containerClasses = computed(() => [
    useComputedClass("containerClass", "o-taginput__container"),
    {
        [useComputedClass("sizeClass", "o-taginput__container--", props.size)]:
            props.size,
    },
]);

const itemClasses = computed(() => [
    useComputedClass("itemClass", "o-taginput__item"),
    {
        [useComputedClass("variantClass", "o-taginput__item--", props.variant)]:
            props.variant,
    },
]);

const closeClasses = computed(() => [
    useComputedClass("closeClass", "o-taginput__item__close"),
]);

const counterClasses = computed(() => [
    useComputedClass("counterClass", "o-taginput__counter"),
]);
</script>

<template>
    <div :class="rootClasses">
        <div :class="containerClasses" @click="hasInput && onFocus()">
            <slot name="selected" :items="items">
                <span
                    v-for="(item, index) in items"
                    :key="getNormalizedItemText(item) + index"
                    :class="itemClasses">
                    <span>{{ getNormalizedItemText(item) }}</span>
                    <o-icon
                        v-if="closable"
                        :class="closeClasses"
                        clickable
                        :pack="iconPack"
                        :icon="closeIcon"
                        :aria-label="ariaCloseLabel"
                        both
                        @click="removeItem(index, $event)" />
                </span>
            </slot>

            <o-autocomplete
                v-if="hasInput"
                ref="autocompleteRef"
                v-model="newItem"
                v-bind="autocompleteBind"
                :data="data"
                :field="field"
                :icon="icon"
                :icon-pack="iconPack"
                :maxlength="maxlength"
                :has-counter="false"
                :size="size"
                :disabled="disabled"
                :autocomplete="autocomplete"
                :open-on-focus="openOnFocus"
                :keep-first="keepFirst"
                :keep-open="openOnFocus"
                :group-field="groupField"
                :group-options="groupOptions"
                :use-html5-validation="useHtml5Validation"
                :check-infinite-scroll="checkInfiniteScroll"
                :append-to-body="appendToBody"
                :confirm-keys="confirmKeys"
                @input="onInput"
                @focus="onFocus"
                @blur="customOnBlur"
                @invalid="onInvalid"
                @keydown="onKeydown"
                @compositionstart="isComposing = true"
                @compositionend="isComposing = false"
                @select="onSelect($event as string)"
                @infinite-scroll="$emit('infinite-scroll')"
                @icon-click="$emit('icon-click', $event)"
                @icon-right-click="$emit('icon-right-click', $event)">
                <template v-if="$slots.header" #header>
                    <slot name="header" />
                </template>
                <template v-if="$slots.default" #default="props">
                    <slot :option="props.option" :index="props.index" />
                </template>
                <template v-if="$slots.empty" #empty>
                    <slot name="empty" />
                </template>
                <template v-if="$slots.footer" #footer>
                    <slot name="footer" />
                </template>
            </o-autocomplete>
        </div>

        <small
            v-if="hasCounter && (maxitems || maxlength)"
            :class="counterClasses">
            <template v-if="maxlength && valueLength > 0">
                {{ valueLength }} / {{ maxlength }}
            </template>
            <template v-else-if="maxitems">
                {{ itemsLength }} / {{ maxitems }}
            </template>
        </small>
    </div>
</template>
