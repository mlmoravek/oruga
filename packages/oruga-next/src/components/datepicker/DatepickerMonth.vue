<script setup lang="ts">
import {
    computed,
    ref,
<<<<<<< HEAD
    type PropType,
    nextTick,
    watch,
    type ComponentPublicInstance,
} from "vue";
import { useComputedClass } from "@/composables";

import { isDefined } from "../../utils/helpers";

import {
    type DatepickerProps,
    type DatepickerEvent,
    type FocusedDate,
} from "./useDatepickerMixin";

=======
    nextTick,
    watch,
    type PropType,
    type ComponentPublicInstance,
} from "vue";
import { useComputedClass } from "@/composables";
import { isDefined } from "@/utils/helpers";
import {
    type DatepickerProps,
    type DatepickerEvent,
    type FocusedDate,
} from "./useDatepickerShare";
import type { BindProp } from "@/types";

>>>>>>> develop
defineOptions({
    name: "ODatepickerMonth",
    configField: "datepicker",
    inheritAttrs: false,
});

const props = defineProps({
    modelValue: {
        type: [Date, Array] as PropType<Date | Date[]>,
        default: undefined,
    },
    monthNames: { type: Array as PropType<string[]>, required: true },
    focusedDate: { type: Object as PropType<FocusedDate>, required: true },
<<<<<<< HEAD
    datepickerProps: {
=======
    pickerProps: {
>>>>>>> develop
        type: Object as PropType<DatepickerProps>,
        required: true,
    },
});

const emits = defineEmits<{
    /** modelValue prop two-way binding */
    (e: "update:modelValue", value: Date | Date[]): void;
    /** focusedDate prop two-way binding */
    (e: "update:focusedDate", value: FocusedDate): void;
    (e: "range-start", value: Date): void;
    (e: "range-end", value: Date): void;
}>();

const selectedBeginDate = ref<Date>();
const selectedEndDate = ref<Date>();
const hoveredEndDate = ref<Date>();

<<<<<<< HEAD
const datepicker = computed<DatepickerProps>(() => props.datepickerProps);
=======
const datepicker = computed<DatepickerProps>(() => props.pickerProps);
>>>>>>> develop

const hasEvents = computed(() => !!datepicker.value.events?.length);

const monthRefs = ref(new Map());

function setMonthRef(date: Date, el: Element | ComponentPublicInstance): void {
    const refKey = `month-${date.getMonth()}`;
    if (el) monthRefs.value.set(refKey, el);
}

watch(
    () => props.focusedDate.month,
    (month) => {
        const refKey = `month-${month}`;
        nextTick(() => {
            // $nextTick is needed when month is changed
            const ref = monthRefs.value.get(refKey);
            if (ref?.length > 0 && ref[0]) {
                ref[0].focus();
            }
        });
    },
);

/** Return array of all events in the specified month */
const eventsInThisYear = computed(() => {
    if (!datepicker.value.events) return [];

    return datepicker.value.events
        .map((event) => {
            if (!event.date && event instanceof Date) event = { date: event };
            if (!event.type) event.type = "is-primary";
            return event;
        })
        .filter((event) => event.date.getFullYear() === props.focusedDate.year);
});

const monthDates = computed(() => {
    const year = props.focusedDate.year;
    const months = [];
    for (let i = 0; i < 12; i++) {
        const d = new Date(year, i, 1);
        d.setHours(0, 0, 0, 0);
        months.push(d);
    }
    return months;
});

const hoveredDateRange = computed(() => {
    if (!datepicker.value.range || !selectedEndDate.value) return [];

    return (
        hoveredEndDate.value < selectedBeginDate.value
            ? [hoveredEndDate.value, selectedBeginDate.value]
            : [selectedBeginDate.value, hoveredEndDate.value]
    ).filter(isDefined);
});

function eventsDateMatch(day): DatepickerEvent[] {
    if (!eventsInThisYear.value.length) return [];
    return eventsInThisYear.value.filter(
        (event) => event.date.getMonth() === day.getMonth(),
    );
}

function isDateSelectable(date: Date): boolean {
    const validity = [];

<<<<<<< HEAD
    if (this.minDate) validity.push(date >= datepicker.value.minDate);
    if (this.maxDate) validity.push(date <= datepicker.value.maxDate);
=======
    if (datepicker.value.minDate)
        validity.push(date >= datepicker.value.minDate);
    if (datepicker.value.maxDate)
        validity.push(date <= datepicker.value.maxDate);
>>>>>>> develop

    validity.push(date.getFullYear() === props.focusedDate.year);

    if (datepicker.value.selectableDates) {
        if (typeof datepicker.value.selectableDates === "function") {
            if (datepicker.value.selectableDates(date)) return true;
            else validity.push(false);
        } else {
<<<<<<< HEAD
            for (let i = 0; i < this.selectableDates.length; i++) {
                const enabledDate = this.selectableDates[i];
                if (
                    date.getFullYear() === enabledDate.getFullYear() &&
                    date.getMonth() === enabledDate.getMonth()
                ) {
                    return true;
                } else {
                    validity.push(false);
                }
=======
            for (let i = 0; i < datepicker.value.selectableDates.length; i++) {
                const enabledDate = datepicker.value.selectableDates[i];
                if (
                    date.getFullYear() === enabledDate.getFullYear() &&
                    date.getMonth() === enabledDate.getMonth()
                )
                    return true;
                else validity.push(false);
>>>>>>> develop
            }
        }
    }

    if (datepicker.value.unselectableDates) {
        if (typeof datepicker.value.unselectableDates === "function") {
            validity.push(!datepicker.value.unselectableDates(date));
        } else {
<<<<<<< HEAD
            for (let i = 0; i < this.unselectableDates.length; i++) {
                const disabledDate = this.unselectableDates[i];
=======
            for (
                let i = 0;
                i < datepicker.value.unselectableDates.length;
                i++
            ) {
                const disabledDate = datepicker.value.unselectableDates[i];
>>>>>>> develop
                validity.push(
                    date.getFullYear() !== disabledDate.getFullYear() ||
                        date.getMonth() !== disabledDate.getMonth(),
                );
            }
        }
    }

<<<<<<< HEAD
    if (this.unselectableDaysOfWeek) {
        for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
            const dayOfWeek = this.unselectableDaysOfWeek[i];
=======
    if (datepicker.value.unselectableDaysOfWeek) {
        for (
            let i = 0;
            i < datepicker.value.unselectableDaysOfWeek.length;
            i++
        ) {
            const dayOfWeek = datepicker.value.unselectableDaysOfWeek[i];
>>>>>>> develop
            validity.push(date.getDay() !== dayOfWeek);
        }
    }

    return validity.indexOf(false) < 0;
}

// --- Events ---

function onKeydown(event: KeyboardEvent, weekDay: Date): void {
    let preventDefault = true;
    switch (event.key) {
        case "Tab": {
            preventDefault = false;
            break;
        }
        case " ":
        case "Space":
        case "Spacebar":
        case "Enter": {
            selectDate(weekDay);
            break;
        }

        case "ArrowLeft":
        case "Left": {
            changeFocus(weekDay, -1);
            break;
        }
        case "ArrowRight":
        case "Right": {
            changeFocus(weekDay, 1);
            break;
        }
        case "ArrowUp":
        case "Up": {
            changeFocus(weekDay, -7);
            break;
        }
        case "ArrowDown":
        case "Down": {
            changeFocus(weekDay, 7);
            break;
        }
    }
    if (preventDefault) event.preventDefault();
}

/*
 * Emit update:modelValue event with selected date as payload for v-model in parent
 */
function selectDate(date: Date): void {
    if (datepicker.value.disabled) return;
    if (
        !datepicker.value.range &&
        !datepicker.value.multiple &&
        isDateSelectable(date)
    )
        emits("update:modelValue", date);
    else if (datepicker.value.range) handleSelectRangeDate(date);
    else if (datepicker.value.multiple) handleSelectMultipleDates(date);
}

/*
 * If both begin and end dates are set, reset the end date and set the begin date.
 * If only begin date is selected, emit an array of the begin date and the new date.
 * If not set, only set the begin date.
 */
function handleSelectRangeDate(date: Date): void {
    if (selectedBeginDate.value && selectedEndDate.value) {
        selectedBeginDate.value = date;
        selectedEndDate.value = undefined;
        emits("range-start", date);
    } else if (selectedBeginDate.value && !selectedEndDate.value) {
        if (selectedBeginDate.value > date) {
            selectedEndDate.value = selectedBeginDate.value;
            selectedBeginDate.value = date;
        } else {
            selectedEndDate.value = date;
        }
        emits("range-end", date);
        emits("update:modelValue", [
            selectedBeginDate.value,
            selectedEndDate.value,
        ]);
    } else {
        selectedBeginDate.value = date;
        emits("range-start", date);
    }
}

const multipleSelectedDates = computed(() =>
    datepicker.value.multiple && props.modelValue ? props.modelValue : [],
);

function handleSelectMultipleDates(date: Date): void {
    if (!Array.isArray(props.modelValue)) return;
    let multipleSelectedDates = props.modelValue;

    const multipleSelect = multipleSelectedDates.filter(
        (selectedDate) =>
            selectedDate.getDate() === date.getDate() &&
            selectedDate.getFullYear() === date.getFullYear() &&
            selectedDate.getMonth() === date.getMonth(),
    );
    if (multipleSelect.length) {
<<<<<<< HEAD
        multipleSelectedDates = this.multipleSelectedDates.filter(
=======
        multipleSelectedDates = multipleSelectedDates.filter(
>>>>>>> develop
            (selectedDate) =>
                selectedDate.getDate() !== date.getDate() ||
                selectedDate.getFullYear() !== date.getFullYear() ||
                selectedDate.getMonth() !== date.getMonth(),
        );
    } else {
        multipleSelectedDates.push(date);
    }
    emits("update:modelValue", multipleSelectedDates);
}

function changeFocus(month: Date, inc: number): void {
    month.setMonth(month.getMonth() + inc);
    const focused = {
        day: month.getDate(),
        month: month.getMonth(),
        year: month.getFullYear(),
    };
    emits("update:focusedDate", focused);
}

<<<<<<< HEAD
function onRangeHoverEndDate(day): void {
=======
function onRangeHoverEndDate(day: Date): void {
>>>>>>> develop
    if (datepicker.value.range) hoveredEndDate.value = day;
}

// --- Computed Component Classes ---

/**
 * Build cellClasses for cell using validations
 */
<<<<<<< HEAD
function cellClasses(day) {
    function dateMatch(dateOne, dateTwo, multiple = false) {
        // if either date is null or undefined, return false
        if (!dateOne || !dateTwo || multiple) {
            return false;
        }
        if (Array.isArray(dateTwo)) {
=======
function cellClasses(day: Date): BindProp {
    function dateMatch(dateOne, dateTwo, multiple = false): boolean {
        // if either date is null or undefined, return false
        if (!dateOne || !dateTwo || multiple) return false;
        if (Array.isArray(dateTwo))
>>>>>>> develop
            return dateTwo.some(
                (date) =>
                    dateOne.getFullYear() === date.getFullYear() &&
                    dateOne.getMonth() === date.getMonth(),
            );
<<<<<<< HEAD
        }
=======
>>>>>>> develop
        return (
            dateOne.getFullYear() === dateTwo.getFullYear() &&
            dateOne.getMonth() === dateTwo.getMonth()
        );
    }
<<<<<<< HEAD
    function dateWithin(dateOne, dates, multiple = false) {
        if (!Array.isArray(dates) || multiple) {
            return false;
        }

        return dateOne > dates[0] && dateOne < dates[1];
    }
    function dateMultipleSelected(dateOne, dates, multiple = false) {
        if (!Array.isArray(dates) || !multiple) {
            return false;
        }
=======
    function dateWithin(dateOne, dates, multiple = false): boolean {
        if (!Array.isArray(dates) || multiple) return false;
        return dateOne > dates[0] && dateOne < dates[1];
    }
    function dateMultipleSelected(dateOne, dates, multiple = false): boolean {
        if (!Array.isArray(dates) || !multiple) return false;
>>>>>>> develop
        return dates.some(
            (date) =>
                dateOne.getDate() === date.getDate() &&
                dateOne.getFullYear() === date.getFullYear() &&
                dateOne.getMonth() === date.getMonth(),
        );
    }

    return [
        ...monthCellClasses.value,
        {
            [useComputedClass(
                "monthCellSelectedClass",
                "o-dpck__month__cell--selected",
            )]:
                dateMatch(day, props.modelValue, datepicker.value.multiple) ||
                dateWithin(day, props.modelValue, datepicker.value.multiple) ||
                dateMultipleSelected(
                    day,
                    multipleSelectedDates.value,
                    datepicker.value.multiple,
                ),
<<<<<<< HEAD
        },
        {
            [useComputedClass(
                "monthCellFirstSelectedClass",
                "o-dpck__month__cell--first-selected",
            )]: dateMatch(
                day,
                Array.isArray(props.modelValue) && props.modelValue[0],
                datepicker.value.multiple,
            ),
        },
        {
            [useComputedClass(
                "monthCellWithinSelectedClass",
                "o-dpck__month__cell--within-selected",
            )]: dateWithin(day, props.modelValue, datepicker.value.multiple),
        },
        {
            [useComputedClass(
                "monthCellLastSelectedClass",
                "o-dpck__month__cell--last-selected",
            )]: dateMatch(
                day,
                Array.isArray(props.modelValue) && props.modelValue[1],
                datepicker.value.multiple,
            ),
        },
        {
            [useComputedClass(
                "monthCellWithinHoveredRangeClass",
                "o-dpck__month__cell--within-hovered-range",
            )]:
                hoveredDateRange.value &&
                hoveredDateRange.value.length === 2 &&
                (dateMatch(day, hoveredDateRange.value) ||
                    dateWithin(day, hoveredDateRange.value)),
        },
        {
            [useComputedClass(
                "monthCellFirstHoveredClass",
                "o-dpck__month__cell--first-hovered",
            )]: dateMatch(
                day,
                Array.isArray(hoveredDateRange.value) &&
                    hoveredDateRange.value[0],
            ),
        },
        {
            [useComputedClass(
=======
        },
        {
            [useComputedClass(
                "monthCellFirstSelectedClass",
                "o-dpck__month__cell--first-selected",
            )]: dateMatch(
                day,
                Array.isArray(props.modelValue) && props.modelValue[0],
                datepicker.value.multiple,
            ),
        },
        {
            [useComputedClass(
                "monthCellWithinSelectedClass",
                "o-dpck__month__cell--within-selected",
            )]: dateWithin(day, props.modelValue, datepicker.value.multiple),
        },
        {
            [useComputedClass(
                "monthCellLastSelectedClass",
                "o-dpck__month__cell--last-selected",
            )]: dateMatch(
                day,
                Array.isArray(props.modelValue) && props.modelValue[1],
                datepicker.value.multiple,
            ),
        },
        {
            [useComputedClass(
                "monthCellWithinHoveredRangeClass",
                "o-dpck__month__cell--within-hovered-range",
            )]:
                hoveredDateRange.value &&
                hoveredDateRange.value.length === 2 &&
                (dateMatch(day, hoveredDateRange.value) ||
                    dateWithin(day, hoveredDateRange.value)),
        },
        {
            [useComputedClass(
                "monthCellFirstHoveredClass",
                "o-dpck__month__cell--first-hovered",
            )]: dateMatch(
                day,
                Array.isArray(hoveredDateRange.value) &&
                    hoveredDateRange.value[0],
            ),
        },
        {
            [useComputedClass(
>>>>>>> develop
                "monthCellWithinHoveredClass",
                "o-dpck__month__cell--within-hovered",
            )]: dateWithin(day, hoveredDateRange.value),
        },
        {
            [useComputedClass(
                "monthCellLastHoveredClass",
                "o-dpck__month__cell--last-hovered",
            )]: dateMatch(
                day,
                Array.isArray(hoveredDateRange.value) &&
                    hoveredDateRange.value[1],
            ),
        },
        {
            [useComputedClass(
                "monthCellTodayClass",
                "o-dpck__month__cell--today",
            )]: dateMatch(day, datepicker.value.dateCreator()),
        },
        {
            [useComputedClass(
                "monthCellSelectableclass",
                "o-dpck__month__cell--selectable",
<<<<<<< HEAD
            )]: this.selectableDate(day) && !datepicker.value.disabled,
=======
            )]: isDateSelectable(day) && !datepicker.value.disabled,
>>>>>>> develop
        },
        {
            [useComputedClass(
                "monthCellUnselectableClass",
                "o-dpck__month__cell--unselectable",
<<<<<<< HEAD
            )]: !this.selectableDate(day) || datepicker.value.disabled,
=======
            )]: !isDateSelectable(day) || datepicker.value.disabled,
>>>>>>> develop
        },
        {
            [useComputedClass(
                "monthCellEventsClass",
                "o-dpck__month__cell--events",
            )]: hasEvents.value,
        },
    ];
}

const monthClasses = computed(() => [
    useComputedClass("monthClass", "o-dpck__month"),
]);

const monthBodyClasses = computed(() => [
    useComputedClass("monthBodyClass", "o-dpck__month__body"),
]);

const monthTableClasses = computed(() => [
    useComputedClass("monthTableClass", "o-dpck__month__table"),
]);

const monthCellClasses = computed(() => [
    useComputedClass("monthCellClass", "o-dpck__month__cell"),
]);
</script>

<template>
    <section :class="monthClasses">
        <div :class="monthBodyClasses">
            <div :class="monthTableClasses">
                <template v-for="(date, idx) in monthDates" :key="idx">
                    <a
                        v-if="!datepicker.disabled && isDateSelectable(date)"
                        :ref="(el) => setMonthRef(date, el)"
                        :class="cellClasses(date)"
                        role="button"
                        href="#"
                        :disabled="datepicker.disabled"
                        :tabindex="
                            focusedDate.month === date.getMonth() ? null : -1
                        "
                        @click.prevent="selectDate(date)"
                        @mouseenter="onRangeHoverEndDate(date)"
                        @keydown.prevent="onKeydown($event, date)">
                        {{ monthNames[date.getMonth()] }}
                        <div v-if="eventsDateMatch(date).length" class="events">
                            <div
                                v-for="(event, index) in eventsDateMatch(date)"
                                :key="index"
                                class="event"
                                :class="event.type" />
                        </div>
                    </a>
                    <div v-else :class="cellClasses(date)">
                        {{ monthNames[date.getMonth()] }}
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>
