<script setup lang="ts">
import {
    computed,
    nextTick,
    ref,
    useAttrs,
    watch,
    type PropType,
    type Prop,
} from "vue";

import ODropdown from "../dropdown/Dropdown.vue";
import ODropdownItem from "../dropdown/DropdownItem.vue";
import OField from "../field/Field.vue";
import OInput from "../input/Input.vue";
import OSelect from "../select/Select.vue";
import OIcon from "../icon/Icon.vue";

import ODatepickerTable from "./DatepickerTable.vue";
import ODatepickerMonth from "./DatepickerMonth.vue";

import { baseComponentProps } from "@/mixins/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    usePropBinding,
    useMatchMedia,
    useVModelBinding,
    useEventListener,
    useFormInput,
} from "@/composables";

import { getMonthNames, getWeekdayNames, matchWithGroups } from "./dateHelper";
import { isClient } from "@/utils/ssr";
import type { DatepickerEvent } from ".";

const defaultDateFormatter = (date, vm) => {
    const targetDates = Array.isArray(date) ? date : [date];
    const dates = targetDates.map((date) => {
        const d = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            12,
        );
        return !vm.isTypeMonth ? vm.dtf.format(d) : vm.dtfMonth.format(d);
    });
    return !vm.multiple ? dates.join(" - ") : dates.join(", ");
};

const defaultDateParser = (date, vm) => {
    if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === "function") {
        const formatRegex = (vm.isTypeMonth ? vm.dtfMonth : vm.dtf)
            .formatToParts(new Date(2000, 11, 25))
            .map((part) => {
                if (part.type === "literal") {
                    return part.value;
                }
                return `((?!=<${part.type}>)\\d+)`;
            })
            .join("");
        const dateGroups = matchWithGroups(formatRegex, date);

        // We do a simple validation for the group.
        // If it is not valid, it will fallback to Date.parse below
        if (
            dateGroups.year &&
            dateGroups.year.length === 4 &&
            dateGroups.month &&
            dateGroups.month <= 12
        ) {
            if (vm.isTypeMonth)
                return new Date(dateGroups.year, dateGroups.month - 1);
            else if (dateGroups.day && dateGroups.day <= 31) {
                return new Date(
                    dateGroups.year,
                    dateGroups.month - 1,
                    dateGroups.day,
                    12,
                );
            }
        }
    }
    // Fallback if formatToParts is not supported or if we were not able to parse a valid date
    if (!vm.isTypeMonth) return new Date(Date.parse(date));
    if (date) {
        const s = date.split("/");
        const year = s[0].length === 4 ? s[0] : s[1];
        const month = s[0].length === 2 ? s[0] : s[1];
        if (year && month) {
            return new Date(
                parseInt(year, 10),
                parseInt(month, 10) - 1,
                1,
                0,
                0,
                0,
                0,
            );
        }
    }
    return null;
};

/**
 * An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile
 * @displayName Datepicker
 * @style _datepicker.scss
 */
defineOptions({
    isOruga: true,
    name: "OFiODatepickereld",
    configField: "datepicker",
    inheritAttrs: false,
});

// provide() {
//         return {
//             $datepicker: this,
//         };
//     }

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: {
        type: [Date, Array] as PropType<Date | Date[]>,
        default: undefined,
    },
    dayNames: {
        type: Array,
        default: () => getOption("datepicker.dayNames", undefined),
    },
    monthNames: {
        type: Array,
        default: () => getOption("datepicker.monthNames", undefined),
    },
    firstDayOfWeek: {
        type: Number,
        default: () => getOption("datepicker.firstDayOfWeek", 0),
    },
    /**
     * Size of the control input, optional
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("autocomplete.size"),
    },
    /** Display datepicker inline */
    inline: Boolean,
    mobileNative: {
        type: Boolean,
        default: () => getOption("datepicker.mobileNative", true),
    },
    /** Min date to select */
    minDate: { type: Date as PropType<Date>, default: undefined },
    /** Max date to select */
    maxDate: { type: Date as PropType<Date>, default: undefined },
    focusedDate: { type: Date as PropType<Date>, default: undefined },
    events: { type: Array as PropType<DatepickerEvent[]>, default: undefined },
    placeholder: String,
    position: String,
    editable: Boolean,
    range: { type: Boolean, default: false },
    /** Same as native, also push new item to v-model instead of replacing */
    multiple: { type: Boolean, default: false },
    /** Same as native disabled */
    disabled: Boolean,
    closeOnClick: { type: Boolean, default: true },
    openOnFocus: Boolean,
    unselectableDates: [Array, Function],
    unselectableDaysOfWeek: {
        type: Array,
        default: () =>
            getOption("datepicker.unselectableDaysOfWeek", undefined),
    },
    indicators: { type: String, default: "dots" },
    type: {
        type: String,
        default: undefined,
        validator: (value: string) => ["month"].indexOf(value) >= 0,
    },
    locale: {
        type: String,
        default: () => getOption("locale", ""),
    },
    yearsRange: {
        type: Array as PropType<number[]>,
        default: () => getOption("datepicker.yearsRange", [-100, 10]),
    },
    selectableDates: [Array, Function],
    dateFormatter: {
        type: Function as PropType<(date: string) => string>,
        default: (date: string) => {
            const dateFormatter = getOption(
                "datepicker.dateFormatter",
                undefined,
            );
            return typeof dateFormatter === "function"
                ? dateFormatter(date)
                : defaultDateFormatter(date, vm);
        },
    },
    dateParser: {
        type: Function,
        default: (date: string, vm: App) => {
            const dateParser = getOption("datepicker.dateParser", undefined);
            return typeof dateParser === "function"
                ? dateParser(date)
                : defaultDateParser(date, vm);
        },
    },
    dateCreator: {
        type: Function as PropType<() => Date>,
        default: () => {
            const dateCreator = getOption("datepicker.dateCreator", undefined);
            return typeof dateCreator === "function"
                ? dateCreator()
                : new Date();
        },
    },
    nearbyMonthDays: {
        type: Boolean,
        default: () => getOption("datepicker.nearbyMonthDays", true),
    },
    nearbySelectableMonthDays: {
        type: Boolean,
        default: () => getOption("datepicker.nearbySelectableMonthDays", false),
    },
    showWeekNumber: {
        type: Boolean,
        default: () => getOption("datepicker.showWeekNumber", false),
    },
    weekNumberClickable: {
        type: Boolean,
        default: () => getOption("datepicker.weekNumberClickable", false),
    },
    rulesForFirstWeek: { type: Number, default: () => 4 },
    mobileModal: {
        type: Boolean,
        default: () => getOption("datepicker.mobileModal", true),
    },
    trapFocus: {
        type: Boolean,
        default: () => getOption("datepicker.trapFocus", true),
    },
    /** Icon name to be added on the right side */
    iconRight: {
        type: String,
        default: () => getOption("datepicker.iconRight", undefined),
    },
    /** Make the icon right clickable */
    iconRightClickable: { type: Boolean, default: false },
    /** Icon name for previous icon */
    iconPrev: {
        type: String,
        default: () => getOption("datepicker.iconPrev", "chevron-left"),
    },
    /** Icon name for next icon */
    iconNext: {
        type: String,
        default: () => getOption("datepicker.iconNext", "chevron-right"),
    },
    /** Enable html 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    /** Append autocomplete content to body */
    appendToBody: {
        type: Boolean,
        default: () => getOption("datepicker.appendToBody", false),
    },
    ariaNextLabel: String,
    ariaPreviousLabel: String,

    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "sizeClass",
        "boxClass",
        "headerClass",
        "headerButtonsClass",
        "headerButtonsSizeClass",
        "prevBtnClass",
        "nextBtnClass",
        "listsClass",
        "footerClass",
        "tableClass",
        "tableHeadClass",
        "tableHeadCellClass",
        "tableBodyClass",
        "tableRowClass",
        "tableCellClass",
        "tableCellSelectedClass",
        "tableCellFirstSelectedClass",
        "tableCellInvisibleClass",
        "tableCellWithinSelectedClass",
        "tableCellLastSelectedClass",
        "tableCellFirstHoveredClass",
        "tableCellWithinHoveredClass",
        "tableCellLastHoveredClass",
        "tableCellTodayClass",
        "tableCellSelectableClass",
        "tableCellUnselectableClass",
        "tableCellNearbyClass",
        "tableCellEventsClass",
        "tableEventsClass",
        "tableEventVariantClass",
        "tableEventClass",
        "tableEventIndicatorsClass",
        "mobileClass",
        /* datapickermonth classes */
        "monthClass",
        "monthBodyClass",
        "monthTableClass",
        "monthCellClass",
        "monthCellSelectedClass",
        "monthCellFirstSelectedClass",
        "monthCellWithinSelectedClass",
        "monthCellLastSelectedClass",
        "monthCellWithinHoveredRangeClass",
        "monthCellFirstHoveredClass",
        "monthCellWithinHoveredClass",
        "monthCellLastHoveredClass",
        "monthCellTodayClass",
        "monthCellSelectableClass",
        "monthCellUnselectableClass",
        "monthCellEventsClass",
    ]),
    inputClasses: {
        type: Object,
        default: () => getOption("datepicker.inputClasses", {}),
    },
    dropdownClasses: {
        type: Object,
        default: () => getOption("datepicker.dropdownClasses", {}),
    },
    selectListClasses: {
        type: Object,
        default: () => getOption("datepicker.selectListClasses", {}),
    },
});

const emits = defineEmits<{
    /** modelValue prop two-way binding */
    (e: "update:modelValue", value: Date | Date[]): void;
    (e: "range-start", value: Date): void;
    (e: "range-end", value: Date): void;
    (e: "change-month", value: number): void;
    (e: "change-year", value: number): void;
    (e: "active-change", value: Date): void;
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

const _initialDate =
    (Array.isArray(props.modelValue)
        ? props.modelValue[0]
        : props.modelValue) ||
    props.focusedDate ||
    props.dateCreator();

if (
    !props.modelValue &&
    props.maxDate &&
    props.maxDate.getFullYear() < _initialDate.getFullYear()
) {
    _initialDate.setFullYear(props.maxDate.getFullYear());
}

const dropdownRef = ref();
const inputRef = ref();

// use form input functionality
const { checkHtml5Validity, onBlur, onFocus, onInvalid } = useFormInput(
    inputRef,
    emits,
);

// dateSelected
const vmodel = useVModelBinding<Date | Date[]>(props, emits);

const focusedDateData = ref({
    day: _initialDate.getDate(),
    month: _initialDate.getMonth(),
    year: _initialDate.getFullYear(),
});

/**
 * When v-model is changed:
 *   1. Update internal value.
 *   2. If it's invalid, validate again.
 */
watch(
    () => props.modelValue,
    (value) => {
        // updateInternalState
        if (vmodel.value !== value) {
            const isArray = Array.isArray(value);
            const currentDate = isArray
                ? !value.length
                    ? props.dateCreator()
                    : value[value.length - 1]
                : !value
                ? props.dateCreator()
                : value;
            if (
                !isArray ||
                (isArray &&
                    Array.isArray(vmodel.value) &&
                    value.length > vmodel.value.length)
            ) {
                focusedDateData.value = {
                    day: currentDate.getDate(),
                    month: currentDate.getMonth(),
                    year: currentDate.getFullYear(),
                };
            }
        }
        // toggle picker if not multiple
        if (!props.multiple) togglePicker(false);
        // check validation
        checkHtml5Validity();
    },
);

watch(
    () => props.focusedDate,
    (value) => {
        if (value) {
            focusedDateData.value = {
                day: value.getDate(),
                month: value.getMonth(),
                year: value.getFullYear(),
            };
        }
    },
);

/*
 * Emit input event on month and/or year change
 */
watch(
    () => focusedDateData.value.month,
    (value) => emits("change-month", value),
);
watch(
    () => focusedDateData.value.year,
    (value) => emits("change-year", value),
);

if (isClient) useEventListener("keyup", keyPress);

/*
 * Format date into string
 */
const formattedValue = computed(() => {
    if (Array.isArray(vmodel.value)) {
        const isArrayWithValidDates =
            Array.isArray(vmodel.value) && vmodel.value.every((v) => !isNaN(v));
        return isArrayWithValidDates
            ? props.dateFormatter([...vmodel.value])
            : null;
    }
    return vmodel.value && !isNaN(vmodel.value)
        ? props.dateFormatter(vmodel.value)
        : null;
});

const localeOptions = computed(() =>
    new Intl.DateTimeFormat(props.locale, {
        year: "numeric",
        month: "numeric",
    }).resolvedOptions(),
);

const dtf = computed(
    () => new Intl.DateTimeFormat(props.locale /*, { timeZone: 'UTC' }*/),
);

const dtfMonth = computed(
    () =>
        new Intl.DateTimeFormat(props.locale, {
            year: localeOptions.value.year || "numeric",
            month: localeOptions.value.month || "2-digit",
            // timeZone: 'UTC'
        }),
);

const computedMonthNames = computed(() =>
    Array.isArray(props.monthNames)
        ? props.monthNames
        : getMonthNames(props.locale),
);

const listOfMonths = computed(() => {
    let minMonth = 0;
    let maxMonth = 12;
    if (
        props.minDate &&
        focusedDateData.value.year === props.minDate.getFullYear()
    ) {
        minMonth = props.minDate.getMonth();
    }
    if (
        props.maxDate &&
        focusedDateData.value.year === props.maxDate.getFullYear()
    ) {
        maxMonth = props.maxDate.getMonth();
    }
    return computedMonthNames.value.map((name, index) => ({
        name: name,
        index: index,
        disabled: index < minMonth || index > maxMonth,
    }));
});

const computedDayNames = computed(() => {
    if (Array.isArray(props.dayNames)) {
        return props.dayNames;
    }
    return getWeekdayNames(props.locale);
});

/*
 * Returns an array of years for the year dropdown. If earliest/latest
 * dates are set by props, range of years will fall within those dates.
 */
const listOfYears = computed(() => {
    let latestYear = focusedDateData.value.year + props.yearsRange[1];
    if (props.maxDate && props.maxDate.getFullYear() < latestYear) {
        latestYear = Math.max(
            props.maxDate.getFullYear(),
            focusedDateData.value.year,
        );
    }

    let earliestYear = focusedDateData.value.year + props.yearsRange[0];
    if (props.minDate && props.minDate.getFullYear() > earliestYear) {
        earliestYear = Math.min(
            props.minDate.getFullYear(),
            focusedDateData.value.year,
        );
    }

    return Array.from(
        { length: latestYear - earliestYear },
        (value, index) => 1 + earliestYear + index,
    ).reverse();
});

const isMobile = computed(() => props.mobileNative && isMobile.value.any());

const isTypeMonth = computed(() => props.type === "month");

const ariaRole = computed(() => (!props.inline ? "dialog" : undefined));

/*
 * Parse string into date
 */
function onChange(value) {
    const date = this.dateParser(value, this);
    if (
        date &&
        (!isNaN(date) ||
            (Array.isArray(date) &&
                date.length === 2 &&
                !isNaN(date[0]) &&
                !isNaN(date[1])))
    ) {
        this.computedValue = date;
    } else {
        // Force refresh input value when not valid date
        this.computedValue = null;
        if (this.$refs.input) {
            this.$refs.input.newValue = this.computedValue;
        }
    }
}

const showPrev = computed(() => {
    if (!props.minDate) return false;
    if (isTypeMonth.value) {
        return focusedDateData.value.year <= props.minDate.getFullYear();
    }
    const dateToCheck = new Date(
        focusedDateData.value.year,
        focusedDateData.value.month,
    );
    const date = new Date(
        props.minDate.getFullYear(),
        props.minDate.getMonth(),
    );
    return dateToCheck <= date;
});

/*
 * Either decrement month by 1 if not January or decrement year by 1
 * and set month to 11 (December) or decrement year when 'month'
 */
function prev(): void {
    if (props.disabled) return;

    if (isTypeMonth.value) {
        focusedDateData.value.year -= 1;
    } else {
        if (focusedDateData.value.month > 0) {
            focusedDateData.value.month -= 1;
        } else {
            focusedDateData.value.month = 11;
            focusedDateData.value.year -= 1;
        }
    }
}

const showNext = computed(() => {
    if (!props.maxDate) return false;
    if (isTypeMonth.value) {
        return focusedDateData.value.year >= props.maxDate.getFullYear();
    }
    const dateToCheck = new Date(
        focusedDateData.value.year,
        focusedDateData.value.month,
    );
    const date = new Date(
        props.maxDate.getFullYear(),
        props.maxDate.getMonth(),
    );
    return dateToCheck >= date;
});

/*
 * Either increment month by 1 if not December or increment year by 1
 * and set month to 0 (January) or increment year when 'month'
 */
function next(): void {
    if (props.disabled) return;

    if (isTypeMonth.value) {
        focusedDateData.value.year += 1;
    } else {
        if (focusedDateData.value.month < 11) {
            focusedDateData.value.month += 1;
        } else {
            focusedDateData.value.month = 0;
            focusedDateData.value.year += 1;
        }
    }
}

function formatNative(value: string): string {
    return isTypeMonth.value ? formatYYYYMM(value) : formatYYYYMMDD(value);
}

/*
 * Format date into string 'YYYY-MM-DD'
 */
function formatYYYYMMDD(value: string): string {
    const date = new Date(value);
    if (value && !isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return (
            year +
            "-" +
            ((month < 10 ? "0" : "") + month) +
            "-" +
            ((day < 10 ? "0" : "") + day)
        );
    }
    return "";
}

/*
 * Format date into string 'YYYY-MM'
 */
function formatYYYYMM(value: string): string {
    const date = new Date(value);
    if (value && !isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return year + "-" + ((month < 10 ? "0" : "") + month);
    }
    return "";
}

// --- Event Handler ---

/*
 * Parse date from string
 */
function onChangeNativePicker(event) {
    const date = event.target.value;
    const s = date ? date.split("-") : [];
    if (s.length === 3) {
        const year = parseInt(s[0], 10);
        const month = parseInt(s[1]) - 1;
        const day = parseInt(s[2]);
        this.computedValue = new Date(year, month, day);
    } else {
        this.computedValue = null;
    }
}

/*
 * Toggle datepicker
 */
function togglePicker(active) {
    if (this.$refs.dropdown) {
        const isActive =
            typeof active === "boolean"
                ? active
                : !this.$refs.dropdown.isActive;
        if (isActive) {
            this.$refs.dropdown.isActive = isActive;
        } else if (this.closeOnClick) {
            this.$refs.dropdown.isActive = isActive;
        }
    }
}

/*
 * Call default onFocus method and show datepicker
 */
function handleOnFocus(event) {
    this.onFocus(event);
    if (this.openOnFocus) {
        this.togglePicker(true);
    }
}

/*
 * Toggle dropdown
 */
function toggle(): void {
    if (props.mobileNative && isMobile) {
        const input = inputRef.value;
        input.focus();
        input.click();
        return;
    }
    dropdownRef.value.toggle();
}

/*
 * Avoid dropdown toggle when is already visible
 */
function onInputClick(event): void {
    if (dropdownRef.value.isActive) event.stopPropagation();
}

/**
 * Keypress event that is bound to the document.
 */
function keyPress(event: KeyboardEvent): void {
    if (
        dropdownRef.value &&
        dropdownRef.value.isActive &&
        (event.key === "Escape" || event.key === "Esc")
    )
        togglePicker(false);
}

/**
 * Emit 'blur' event on dropdown is not active (closed)
 */
function onActiveChange(value): void {
    if (!value) onBlur();
    emits("active-change", value);
}

function changeFocus(date: Date): void {
    focusedDateData.value = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
    };
}

// --- Computed Component Classes ---

const attrs = useAttrs();
const inputBind = computed(() => ({
    ...attrs,
    ...props.inputClasses,
}));

const dropdownBind = computed(() => ({
    "root-class": useComputedClass(
        "dropdownClasses.rootClass",
        "o-dpck__dropdown",
    ),
    ...props.dropdownClasses,
}));

const selectListBind = computed(() => ({
    ...props.selectListClasses,
}));

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-dpck"),
    {
        [useComputedClass("sizeClass", "o-dpck--", props.size)]: props.size,
    },
    {
        [useComputedClass("mobileClass", "o-dpck--mobile")]: this.isMatchMedia,
    },
]);

const boxClasses = computed(() => [
    useComputedClass("boxClass", "o-dpck__box"),
]);

const headerClasses = computed(() => [
    useComputedClass("headerClass", "o-dpck__header"),
]);

const headerButtonsClasses = computed(() => [
    useComputedClass("headerButtonsClass", "o-dpck__header__buttons"),
    {
        [useComputedClass(
            "headerButtonsSizeClass",
            "o-dpck__header__buttons--",
            props.size,
        )]: props.size,
    },
]);

const prevBtnClasses = computed(() => [
    useComputedClass("prevBtnClass", "o-dpck__header__previous"),
]);

const nextBtnClasses = computed(() => [
    useComputedClass("nextBtnClass", "o-dpck__header__next"),
]);

const listsClasses = computed(() => [
    useComputedClass("listsClass", "o-dpck__header__list"),
]);

const footerClasses = computed(() => [
    useComputedClass("footerClass", "o-dpck__footer"),
]);
</script>

<template>
    <div :class="rootClasses">
        <o-dropdown
            v-if="!isMobile || inline"
            ref="dropdownRef"
            v-bind="dropdownBind"
            :position="position"
            :disabled="disabled"
            :inline="inline"
            :mobile-modal="mobileModal"
            :trap-focus="trapFocus"
            :aria-role="ariaRole"
            :aria-modal="!inline"
            :trigger-tabindex="-1"
            :append-to-body="appendToBody"
            append-to-body-copy-parent
            @active-change="onActiveChange">
            <template v-if="!inline" #trigger>
                <slot name="trigger">
                    <o-input
                        ref="inputRef"
                        autocomplete="off"
                        :model-value="formattedValue"
                        :expanded="expanded"
                        :placeholder="placeholder"
                        :size="size"
                        :icon="icon"
                        :icon-right="iconRight"
                        :icon-right-clickable="iconRightClickable"
                        :icon-pack="iconPack"
                        :rounded="rounded"
                        :disabled="disabled"
                        :readonly="!editable"
                        v-bind="inputBind"
                        :use-html5-validation="false"
                        @click="onInputClick"
                        @icon-right-click="$emit('icon-right-click')"
                        @keyup.enter="togglePicker(true)"
                        @change="onChange($event.target.value)"
                        @focus="handleOnFocus" />
                </slot>
            </template>
            <o-dropdown-item
                override
                tag="div"
                :item-class="boxClasses"
                :disabled="disabled"
                :clickable="false">
                <header :class="headerClasses">
                    <slot name="header">
                        <div :class="headerButtonsClasses">
                            <a
                                v-show="!showPrev && !disabled"
                                :class="prevBtnClasses"
                                role="button"
                                href="#"
                                :aria-label="ariaPreviousLabel"
                                @click.prevent="prev"
                                @keydown.enter.prevent="prev"
                                @keydown.space.prevent="prev">
                                <o-icon
                                    :icon="iconPrev"
                                    :pack="iconPack"
                                    both
                                    clickable />
                            </a>
                            <a
                                v-show="!showNext && !disabled"
                                :class="nextBtnClasses"
                                role="button"
                                href="#"
                                :aria-label="ariaNextLabel"
                                @click.prevent="next"
                                @keydown.enter.prevent="next"
                                @keydown.space.prevent="next">
                                <o-icon
                                    :icon="iconNext"
                                    :pack="iconPack"
                                    both
                                    clickable />
                            </a>
                            <div :class="listsClasses">
                                <o-select
                                    v-if="!isTypeMonth"
                                    v-model="focusedDateData.month"
                                    :disabled="disabled"
                                    :size="size"
                                    v-bind="selectListBind">
                                    <option
                                        v-for="month in listOfMonths"
                                        :key="month.name"
                                        :value="month.index"
                                        :disabled="month.disabled">
                                        {{ month.name }}
                                    </option>
                                </o-select>
                                <o-select
                                    v-model="focusedDateData.year"
                                    :disabled="disabled"
                                    :size="size"
                                    v-bind="selectListBind">
                                    <option
                                        v-for="year in listOfYears"
                                        :key="year"
                                        :value="year">
                                        {{ year }}
                                    </option>
                                </o-select>
                            </div>
                        </div>
                    </slot>
                </header>
                <slot name="table">
                    <o-datepicker-table
                        v-if="!isTypeMonth"
                        v-model="vmodel"
                        :day-names="computedDayNames"
                        :month-names="computedMonthNames"
                        :first-day-of-week="firstDayOfWeek"
                        :rules-for-first-week="rulesForFirstWeek"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :focused="focusedDateData"
                        :disabled="disabled"
                        :unselectable-dates="unselectableDates"
                        :unselectable-days-of-week="unselectableDaysOfWeek"
                        :selectable-dates="selectableDates"
                        :events="events"
                        :indicators="indicators"
                        :date-creator="dateCreator"
                        :type-month="isTypeMonth"
                        :nearby-month-days="nearbyMonthDays"
                        :nearby-selectable-month-days="
                            nearbySelectableMonthDays
                        "
                        :show-week-number="showWeekNumber"
                        :week-number-clickable="weekNumberClickable"
                        :range="range"
                        :multiple="multiple"
                        :table-class="tableClass"
                        :table-head-class="tableHeadClass"
                        :table-head-cell-class="tableHeadCellClass"
                        :table-body-class="tableBodyClass"
                        :table-row-class="tableRowClass"
                        :table-cell-class="tableCellClass"
                        :table-cell-selected-class="tableCellSelectedClass"
                        :table-cell-first-selected-class="
                            tableCellFirstSelectedClass
                        "
                        :table-cell-invisible-class="tableCellInvisibleClass"
                        :table-cell-within-selected-class="
                            tableCellWithinSelectedClass
                        "
                        :table-cell-last-selected-class="
                            tableCellLastSelectedClass
                        "
                        :table-cell-first-hovered-class="
                            tableCellFirstHoveredClass
                        "
                        :table-cell-within-hovered-class="
                            tableCellWithinHoveredClass
                        "
                        :table-cell-last-hovered-class="
                            tableCellLastHoveredClass
                        "
                        :table-cell-today-class="tableCellTodayClass"
                        :table-cell-selectable-class="tableCellSelectableClass"
                        :table-cell-unselectable-class="
                            tableCellUnselectableClass
                        "
                        :table-cell-nearby-class="tableCellNearbyClass"
                        :table-cell-events-class="tableCellEventsClass"
                        :table-events-class="tableEventsClass"
                        :table-event-variant-class="tableEventVariantClass"
                        :table-event-class="tableEventClass"
                        :table-event-indicators-class="
                            tableEventIndicatorsClass
                        "
                        @range-start="(date) => $emit('range-start', date)"
                        @range-end="(date) => $emit('range-end', date)"
                        @close="togglePicker(false)"
                        @update:focused="focusedDateData = $event" />
                    <o-datepicker-month
                        v-if="isTypeMonth"
                        v-model="computedValue"
                        :month-names="newMonthNames"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :focused="focusedDateData"
                        :disabled="disabled"
                        :unselectable-dates="unselectableDates"
                        :unselectable-days-of-week="unselectableDaysOfWeek"
                        :selectable-dates="selectableDates"
                        :events="events"
                        :indicators="indicators"
                        :date-creator="dateCreator"
                        :range="range"
                        :multiple="multiple"
                        :month-class="monthClass"
                        :month-body-class="monthBodyClass"
                        :month-table-class="monthTableClass"
                        :month-cell-class="monthCellClass"
                        :month-cell-selected-class="monthCellSelectedClass"
                        :month-cell-first-selected-class="
                            monthCellFirstSelectedClass
                        "
                        :month-cell-within-selected-class="
                            monthCellWithinSelectedClass
                        "
                        :month-cell-last-selected-class="
                            monthCellLastSelectedClass
                        "
                        :month-cell-within-hovered-range-class="
                            monthCellWithinHoveredRangeClass
                        "
                        :month-cell-first-hovered-class="
                            monthCellFirstHoveredClass
                        "
                        :month-cell-within-hovered-class="
                            monthCellWithinHoveredClass
                        "
                        :month-cell-last-hovered-class="
                            monthCellLastHoveredClass
                        "
                        :month-cell-today-class="monthCellTodayClass"
                        :month-cell-selectable-class="monthCellSelectableClass"
                        :month-cell-unselectable-class="
                            monthCellUnselectableClass
                        "
                        :month-cell-events-class="monthCellEventsClass"
                        @range-start="(date) => $emit('range-start', date)"
                        @range-end="(date) => $emit('range-end', date)"
                        @close="togglePicker(false)"
                        @change-focus="changeFocus"
                        @update:focused="focusedDateData = $event" />
                </slot>
                <footer
                    v-if="$slots.footer !== undefined"
                    :class="footerClasses">
                    <slot name="footer" />
                </footer>
            </o-dropdown-item>
        </o-dropdown>

        <o-input
            v-else
            ref="input"
            :type="!isTypeMonth ? 'date' : 'month'"
            autocomplete="off"
            :value="formatNative(computedValue)"
            :placeholder="placeholder"
            :size="size"
            :icon="icon"
            :icon-pack="iconPack"
            :rounded="rounded"
            :max="formatNative(maxDate)"
            :min="formatNative(minDate)"
            :disabled="disabled"
            :readonly="false"
            v-bind="$attrs"
            :use-html5-validation="false"
            @change="onChangeNativePicker"
            @focus="onFocus"
            @blur="onBlur"
            @invalid="onInvalid" />
    </div>
</template>
