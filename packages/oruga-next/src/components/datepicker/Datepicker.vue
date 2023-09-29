<script setup lang="ts">
import { computed, ref, useAttrs, watch, type PropType } from "vue";

import ODropdown from "../dropdown/Dropdown.vue";
import ODropdownItem from "../dropdown/DropdownItem.vue";
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
    useVModelBinding,
    useEventListener,
    useFormInput,
    useMatchMedia,
} from "@/composables";

import { getMonthNames, getWeekdayNames } from "./datepickerUtils";
import { isClient } from "@/utils/ssr";
import { isMobileAgent } from "@/utils/helpers";

import {
    useDatepickerMixins,
    type DatepickerEvent,
    type FocusedDate,
} from "./useDatepickerMixin";

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

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: {
        type: [Date, Array] as PropType<Date | Date[]>,
        default: undefined,
    },
    /**
     * Define picker mode
     * @values date, month
     */
    type: {
        type: String,
        default: "date",
        validator: (value: string) => ["month", "date"].indexOf(value) >= 0,
    },
    /** Set custom day names, else use names based on locale */
    dayNames: {
        type: Array as PropType<string[]>,
        default: () => getOption("datepicker.dayNames", undefined),
    },
    /** Set custom month names, else use names based on locale */
    monthNames: {
        type: Array as PropType<string[]>,
        default: () => getOption("datepicker.monthNames", undefined),
    },
    /**
     * Size of the control input, optional
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("autocomplete.size"),
    },
    /** Set default date to focus on */
    focusedDate: { type: Date as PropType<Date>, default: undefined },
    /** Events to display on picker */
    events: { type: Array as PropType<DatepickerEvent[]>, default: undefined },
    /** Event indicators for style class definiton */
    indicators: { type: String, default: "dots" },
    /** Min date to select */
    minDate: { type: Date as PropType<Date>, default: undefined },
    /** Max date to select */
    maxDate: { type: Date as PropType<Date>, default: undefined },
    /** Enable date range selection */
    range: { type: Boolean, default: false },
    /** Makes input full width when inside a grouped or addon field */
    expanded: { type: Boolean, default: false },
    /** Makes the element rounded */
    rounded: { type: Boolean, default: false },
    /** Display datepicker inline */
    inline: { type: Boolean, default: false },
    /** Input placeholder */
    placeholder: { type: String, default: undefined },
    /** Same as native input readonly */
    readonly: { type: Boolean, default: true },
    /** Same as native, also push new item to v-model instead of replacing */
    multiple: { type: Boolean, default: false },
    /** Same as native disabled */
    disabled: { type: Boolean, default: true },
    closeOnClick: {
        type: Boolean,
        default: () => getOption("datepicker.closeOnClick", true),
    },
    openOnFocus: {
        type: Boolean,
        default: () => getOption("datepicker.openOnFocus", true),
    },
    /** Date format locale */
    locale: {
        type: String,
        default: () => getOption("locale", ""),
    },
    /** Custom function to format a date into a string */
    dateFormatter: {
        type: Function as PropType<(date: Date | Date[]) => string>,
        default: () => getOption("datepicker.dateFormatter", undefined),
    },
    /** Custom function to parse a string into a date */
    dateParser: {
        type: Function as PropType<(date: string) => Date>,
        default: () => getOption("datepicker.dateParser", undefined),
    },
    /** Date creator function, default is `new Date()` */
    dateCreator: {
        type: Function as PropType<() => Date>,
        default: () => {
            const dateCreator = getOption("datepicker.dateCreator", undefined);
            return typeof dateCreator === "function"
                ? dateCreator()
                : new Date();
        },
    },
    /** Define a list of dates which can be selected */
    selectableDates: {
        type: [Array, Function] as PropType<Date[] | ((date: Date) => boolean)>,
        default: () => [],
    },
    /** Define a list of dates which can not be selected */
    unselectableDates: {
        type: [Array, Function] as PropType<Date[] | ((date: Date) => boolean)>,
        default: () => [],
    },
    /** Define a list of weeks which can not be selected */
    unselectableDaysOfWeek: {
        type: Array as PropType<number[]>,
        default: () =>
            getOption("datepicker.unselectableDaysOfWeek", undefined),
    },
    /** Show nearby month days */
    nearbyMonthDays: {
        type: Boolean,
        default: () => getOption("datepicker.nearbyMonthDays", true),
    },
    /** Define if nearby month days can be selected */
    nearbySelectableMonthDays: {
        type: Boolean,
        default: () => getOption("datepicker.nearbySelectableMonthDays", false),
    },
    /** Show weeek numbers */
    showWeekNumber: {
        type: Boolean,
        default: () => getOption("datepicker.showWeekNumber", false),
    },
    /** Define if weeek numbers are clickable */
    weekNumberClickable: {
        type: Boolean,
        default: () => getOption("datepicker.weekNumberClickable", false),
    },
    /** Set the first day of a week */
    firstDayOfWeek: {
        type: Number,
        default: () => getOption("datepicker.firstDayOfWeek", 0),
    },
    /** Rules for the first week : 1 for the 1st January, 4 for the 4th January */
    rulesForFirstWeek: { type: Number, default: () => 4 },
    /** Define the range of years to show */
    yearsRange: {
        type: Array as PropType<number[]>,
        default: () => getOption("datepicker.yearsRange", [-100, 10]),
    },
    trapFocus: {
        type: Boolean,
        default: () => getOption("datepicker.trapFocus", true),
    },
    /** Dropdown position */
    position: { type: String, default: undefined },
    /** Enable dropdown mobile modal */
    mobileModal: {
        type: Boolean,
        default: () => getOption("datepicker.mobileModal", true),
    },
    /** Enable mobile native input if mobile agent */
    mobileNative: {
        type: Boolean,
        default: () => getOption("datepicker.mobileNative", true),
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("datepicker.iconPack", undefined),
    },
    /** Icon name to be shown */
    icon: {
        type: String,
        default: () => getOption("input.icon", undefined),
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
    /** A11y next button aria label */
    ariaNextLabel: { type: String, default: "Next Page" },
    /** A11y previous button aria label  */
    ariaPreviousLabel: { type: String, default: "Previous Page" },
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
    /** on range start is selected event */
    (e: "range-start", value: Date): void;
    /** on range end is selected event */
    (e: "range-end", value: Date): void;
    /** on month change event */
    (e: "change-month", value: number): void;
    /** on year change event */
    (e: "change-year", value: number): void;
    /** on active state change event */
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

const dropdownRef = ref();
const inputRef = ref();

// use form input functionality
const { checkHtml5Validity, onBlur, onFocus, onInvalid } = useFormInput(
    inputRef,
    emits,
);

const { defaultDateFormatter, defaultDateParser } = useDatepickerMixins(props);

const { isMobile } = useMatchMedia();

const isMobileNative = computed(
    () => props.mobileNative && isMobileAgent.any(),
);

const vmodel = useVModelBinding<Date | Date[]>(props, emits);

/** modelValue formated into string */
const formattedValue = computed(() => {
    const formatter =
        typeof props.dateFormatter === "function"
            ? props.dateFormatter
            : defaultDateFormatter;
    return Array.isArray(props.modelValue)
        ? formatter([...props.modelValue])
        : formatter(props.modelValue);
});

const isTypeMonth = computed(() => props.type === "month");

const ariaRole = computed(() => (!props.inline ? "dialog" : undefined));

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

const focusedDateData = ref<FocusedDate>({
    day: _initialDate.getDate(),
    month: _initialDate.getMonth(),
    year: _initialDate.getFullYear(),
});

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

if (isClient) useEventListener("keyup", onKeyPress);

/**
 * Keypress event that is bound to the document.
 */
function onKeyPress(event: KeyboardEvent): void {
    if (
        dropdownRef.value?.isActive &&
        (event.key === "Escape" || event.key === "Esc")
    )
        togglePicker(false);
}

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
    if (Array.isArray(props.dayNames)) return props.dayNames;
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

const showPrev = computed(() => {
    if (!props.minDate) return false;
    if (isTypeMonth.value)
        return focusedDateData.value.year <= props.minDate.getFullYear();

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

/**
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
    if (isTypeMonth.value)
        return focusedDateData.value.year >= props.maxDate.getFullYear();

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

/**
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

function formatNative(value: Date | Date[]): string {
    if (Array.isArray(value)) value = value[0];

    const date = new Date(value);
    if (!value || !isNaN(date.getTime())) return "";

    if (isTypeMonth.value) {
        // Format date into string 'YYYY-MM'
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return year + "-" + ((month < 10 ? "0" : "") + month);
    } else {
        // Format date into string 'YYYY-MM-DD'
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
}

// --- Event Handler ---

/** Parse string into date */
function onChange(value: string): void {
    const parser =
        typeof props.dateParser === "function"
            ? props.dateParser
            : defaultDateParser;
    const date = parser(value);

    if (
        date &&
        Array.isArray(date) &&
        date.length === 2 &&
        !isNaN(date[0]) &&
        !isNaN(date[1])
    ) {
        vmodel.value = date;
    } else {
        vmodel.value = null;
    }
}

/** Parse date from string */
function onChangeNativePicker(event: Event): void {
    const date = (event.target as HTMLInputElement).value;
    const s = date ? date.split("-") : [];
    if (s.length === 3) {
        const year = parseInt(s[0], 10);
        const month = parseInt(s[1]) - 1;
        const day = parseInt(s[2]);
        vmodel.value = new Date(year, month, day);
    } else {
        vmodel.value = null;
    }
}

/** Toggle datepicker */
function togglePicker(active): void {
    if (isMobileNative.value) {
        const input = inputRef.value;
        input.focus();
        input.click();
    } else if (dropdownRef.value) {
        const isActive =
            typeof active === "boolean" ? active : !dropdownRef.value.isActive;
        if (isActive) {
            dropdownRef.value.isActive = isActive;
        } else if (props.closeOnClick) {
            dropdownRef.value.isActive = isActive;
        }
    }
}

/** Call default onFocus method and show datepicker */
function handleOnFocus(event: Event): void {
    onFocus(event);
    if (props.openOnFocus) togglePicker(true);
}

/** Avoid dropdown toggle when is already visible */
function onInputClick(event): void {
    if (dropdownRef.value.isActive) event.stopPropagation();
}

/**
 * Emit 'blur' event on dropdown is not active (closed)
 */
function onActiveChange(value): void {
    if (!value) onBlur();
    else if (value) onFocus();
    emits("active-change", value);
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
        [useComputedClass("mobileClass", "o-dpck--mobile")]: isMobile.value,
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
            v-if="!isMobileNative || inline"
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
                        v-bind="inputBind"
                        ref="inputRef"
                        autocomplete="off"
                        :model-value="formattedValue"
                        :placeholder="placeholder"
                        :size="size"
                        :icon="icon"
                        :icon-right="iconRight"
                        :icon-right-clickable="iconRightClickable"
                        :icon-pack="iconPack"
                        :expanded="expanded"
                        :rounded="rounded"
                        :disabled="disabled"
                        :readonly="readonly"
                        :use-html5-validation="false"
                        @click="onInputClick"
                        @icon-right-click="$emit('icon-right-click', $event)"
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
                                v-if="!disabled"
                                :class="prevBtnClasses"
                                role="button"
                                href="#"
                                :disabled="!showPrev"
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
                                v-if="!disabled"
                                :class="nextBtnClasses"
                                role="button"
                                href="#"
                                :disabled="!showNext"
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
                <slot name="body">
                    <o-datepicker-month
                        v-if="isTypeMonth"
                        v-model="vmodel"
                        v-model:focused-date="focusedDateData"
                        :month-names="computedMonthNames"
                        :datepicker-props="props"
                        @range-start="(date) => $emit('range-start', date)"
                        @range-end="(date) => $emit('range-end', date)" />
                    <o-datepicker-table
                        v-else
                        v-model="vmodel"
                        v-model:focused-date="focusedDateData"
                        :day-names="computedDayNames"
                        :month-names="computedMonthNames"
                        :datepicker-props="props"
                        @range-start="(date) => $emit('range-start', date)"
                        @range-end="(date) => $emit('range-end', date)" />
                </slot>
                <footer v-if="$slots.footer" :class="footerClasses">
                    <slot name="footer" />
                </footer>
            </o-dropdown-item>
        </o-dropdown>

        <!-- Native Picker -->
        <o-input
            v-else
            ref="input"
            v-bind="$attrs"
            :type="!isTypeMonth ? 'date' : 'month'"
            autocomplete="off"
            :value="formatNative(vmodel)"
            :max="formatNative(maxDate)"
            :min="formatNative(minDate)"
            :placeholder="placeholder"
            :size="size"
            :icon="icon"
            :icon-pack="iconPack"
            :rounded="rounded"
            :disabled="disabled"
            :readonly="false"
            :use-html5-validation="false"
            @change="onChangeNativePicker"
            @focus="onFocus"
            @blur="onBlur"
            @invalid="onInvalid" />
    </div>
</template>
