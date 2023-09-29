<script setup lang="ts">
import {
    computed,
    watch,
    nextTick,
    ref,
    type PropType,
    type ComponentPublicInstance,
} from "vue";
import { baseComponentProps } from "@/mixins/SharedProps";
import { useComputedClass, useClassProps } from "@/composables";

import type { DatepickerEvent } from "./index";

defineOptions({
    name: "ODatepickerTableRow",
    configField: "datepicker",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    dateCreator: { type: Function as PropType<() => Date>, required: true },
    day: { type: Number, required: true },
    week: { type: Array as PropType<Date[]>, required: true },
    month: { type: Number, required: true },
    minDate: { type: Date, default: undefined },
    maxDate: { type: Date, default: undefined },
    selectedDate: {
        type: [Date, Array] as PropType<Date | Date[]>,
        default: undefined,
    },
    events: { type: Array as PropType<DatepickerEvent[]>, default: undefined },
    hoveredDateRange: { type: Array, default: undefined },
    unselectableDates: { type: Array as PropType<Date[]>, default: undefined },
    unselectableDaysOfWeek: {
        type: Array as PropType<number[]>,
        default: undefined,
    },
    selectableDates: { type: Array as PropType<Date[]>, default: undefined },
    showWeekNumber: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    indicators: { type: String, default: undefined },
    nearbyMonthDays: { type: Boolean, default: false },
    nearbySelectableMonthDays: { type: Boolean, default: false },
    weekNumberClickable: { type: Boolean, default: false },
    range: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    rulesForFirstWeek: { type: Number, required: true },
    firstDayOfWeek: { type: Number, required: true },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "tableRowClass",
        "tableCellClass",
        "tableCellSelectedClass",
        "tableCellFirstSelectedClass",
        "tableCellWithinSelectedClass",
        "tableCellLastSelectedClass",
        "tableCellFirstHoveredClass",
        "tableCellInvisibleClass",
        "tableCellWithinHoveredClass",
        "tableCellLastHoveredClass",
        "tableCellTodayClass",
        "tableCellSelectableClass",
        "tableCellUnselectableClass",
        "tableCellNearbyClass",
        "tableCellEventsClass",
        "tableEventClass",
        "tableEventIndicatorsClass",
        "tableEventsClass",
        "tableEventVariantClass",
    ]),
});

const emits = defineEmits<{
    (e: "select", value: Date): void;
    (e: "rangeHoverEndDate", value: Date): void;
    (e: "change-focus", value: Date): void;
    (e: "week-number-click", value: number): void;
}>();

const dayRefs = ref(new Map());

function setDayRef(date: Date, el: Element | ComponentPublicInstance): void {
    const refKey = `day-${date.getMonth()}-${date.getDate()}`;
    if (el) dayRefs.value.set(refKey, el);
}

const hasEvents = computed(() => !!props.events?.length);

watch(
    () => props.day,
    (day) => {
        const refKey = `day-${props.month}-${day}`;
        nextTick(() => {
            // $nextTick is needed when month is changed
            const ref = dayRefs.value.get(refKey);
            if (ref?.length > 0 && ref[0]) {
                ref[0].focus();
            }
        });
    },
);

function clickWeekNumber(week: number): void {
    if (props.weekNumberClickable) emits("week-number-click", week);
}

function firstWeekOffset(year, dow, doy): number {
    // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    const fwd = 7 + dow - doy;
    // first-week day local weekday -- which local weekday is fwd
    const firstJanuary = new Date(year, 0, fwd);
    const fwdlw = (7 + firstJanuary.getDay() - dow) % 7;
    return -fwdlw + fwd - 1;
}

function getSetDayOfYear(input): number {
    return (
        Math.round(
            (input.getTime() - new Date(input.getFullYear(), 0, 1).getTime()) /
                864e5,
        ) + 1
    );
}

function daysInYear(year): number {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
}

function weeksInYear(year, dow, doy): number {
    const weekOffset = firstWeekOffset(year, dow, doy);
    const weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

function getWeekNumber(mom): number {
    const dow = props.firstDayOfWeek; // first day of week
    // Rules for the first week : 1 for the 1st January, 4 for the 4th January
    const doy = props.rulesForFirstWeek;
    const weekOffset = firstWeekOffset(mom.getFullYear(), dow, doy);
    const week = Math.floor((getSetDayOfYear(mom) - weekOffset - 1) / 7) + 1;
    let resWeek;
    let resYear;
    if (week < 1) {
        resYear = mom.getFullYear() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.getFullYear(), dow, doy)) {
        resWeek = week - weeksInYear(mom.getFullYear(), dow, doy);
        resYear = mom.getFullYear() + 1;
    } else {
        resYear = mom.getFullYear();
        resWeek = week;
    }
    return resWeek;
}

/*
 * Check that selected day is within earliest/latest params and is within current month
 */
function selectableDate(day: Date): boolean {
    const validity = [];

    if (props.minDate) validity.push(day >= props.minDate);
    if (props.maxDate) validity.push(day <= props.maxDate);

    if (props.nearbyMonthDays && !props.nearbySelectableMonthDays)
        validity.push(day.getMonth() === props.month);

    if (props.selectableDates) {
        for (let i = 0; i < props.selectableDates.length; i++) {
            const enabledDate = props.selectableDates[i];
            if (
                day.getDate() === enabledDate.getDate() &&
                day.getFullYear() === enabledDate.getFullYear() &&
                day.getMonth() === enabledDate.getMonth()
            ) {
                return true;
            } else {
                validity.push(false);
            }
        }
    }

    if (props.unselectableDates) {
        for (let i = 0; i < props.unselectableDates.length; i++) {
            const disabledDate = props.unselectableDates[i];
            validity.push(
                day.getDate() !== disabledDate.getDate() ||
                    day.getFullYear() !== disabledDate.getFullYear() ||
                    day.getMonth() !== disabledDate.getMonth(),
            );
        }
    }

    if (props.unselectableDaysOfWeek) {
        for (let i = 0; i < props.unselectableDaysOfWeek.length; i++) {
            const dayOfWeek = props.unselectableDaysOfWeek[i];
            validity.push(day.getDay() !== dayOfWeek);
        }
    }

    return validity.indexOf(false) < 0;
}

function eventsDateMatch(day: Date): DatepickerEvent[] {
    if (!props.events?.length) return [];
    return props.events.filter((event) => event.date.getDay() === day.getDay());
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
 * Emit select event with chosen date as payload
 */
function selectDate(day: Date): void {
    if (props.disabled) return;
    if (selectableDate(day)) emits("select", day);
}

function changeFocus(day, inc): void {
    const nextDay = new Date(day.getTime());
    nextDay.setDate(day.getDate() + inc);
    while (
        (!props.minDate || nextDay > props.minDate) &&
        (!props.maxDate || nextDay < props.maxDate) &&
        !selectableDate(nextDay)
    ) {
        nextDay.setDate(day.getDate() + Math.sign(inc));
    }
    setRangeHoverEndDate(nextDay);
    emits("change-focus", nextDay);
}

function setRangeHoverEndDate(day): void {
    if (props.range) emits("rangeHoverEndDate", day);
}

// --- Computed Component Classes ---

/*
 * Build cellClasses for cell using validations
 */
function cellClasses(day) {
    function dateMatch(dateOne, dateTwo, multiple = false): boolean {
        // if either date is null or undefined, return false
        // if using multiple flag, return false
        if (!dateOne || !dateTwo || multiple) return false;

        if (Array.isArray(dateTwo)) {
            return dateTwo.some(
                (date) =>
                    dateOne.getDate() === date.getDate() &&
                    dateOne.getFullYear() === date.getFullYear() &&
                    dateOne.getMonth() === date.getMonth(),
            );
        }
        return (
            dateOne.getDate() === dateTwo.getDate() &&
            dateOne.getFullYear() === dateTwo.getFullYear() &&
            dateOne.getMonth() === dateTwo.getMonth()
        );
    }

    function dateWithin(dateOne, dates, multiple = false): boolean {
        if (!Array.isArray(dates) || multiple) return false;
        return dateOne > dates[0] && dateOne < dates[1];
    }

    return [
        ...tableCellClasses.value,
        {
            [useComputedClass(
                "tableCellSelectedClass",
                "o-dpck__table__cell--selected",
            )]:
                dateMatch(day, props.selectedDate) ||
                dateWithin(day, props.selectedDate, props.multiple),
        },
        {
            [useComputedClass(
                "tableCellFirstSelectedClass",
                "o-dpck__table__cell--first-selected",
            )]: dateMatch(
                day,
                Array.isArray(props.selectedDate) && props.selectedDate[0],
                props.multiple,
            ),
        },
        {
            [useComputedClass(
                "tableCellWithinSelectedClass",
                "o-dpck__table__cell--within-selected",
            )]: dateWithin(day, props.selectedDate, props.multiple),
        },
        {
            [useComputedClass(
                "tableCellLastSelectedClass",
                "o-dpck__table__cell--last-selected",
            )]: dateMatch(
                day,
                Array.isArray(props.selectedDate) && props.selectedDate[1],
                props.multiple,
            ),
        },
        {
            [useComputedClass(
                "tableCellFirstHoveredClass",
                "o-dpck__table__cell--first-hovered",
            )]: dateMatch(
                day,
                Array.isArray(props.hoveredDateRange) &&
                    props.hoveredDateRange[0],
            ),
        },
        {
            [useComputedClass(
                "tableCellWithinHoveredClass",
                "o-dpck__table__cell--within-hovered",
            )]: dateWithin(day, props.hoveredDateRange),
        },
        {
            [useComputedClass(
                "tableCellLastHoveredClass",
                "o-dpck__table__cell--last-hovered",
            )]: dateMatch(
                day,
                Array.isArray(props.hoveredDateRange) &&
                    props.hoveredDateRange[1],
            ),
        },
        {
            [useComputedClass(
                "tableCellTodayClass",
                "o-dpck__table__cell--today",
            )]: dateMatch(day, props.dateCreator()),
        },
        {
            [useComputedClass(
                "tableCellSelectableClass",
                "o-dpck__table__cell--selectable",
            )]: selectableDate(day) && !props.disabled,
        },
        {
            [useComputedClass(
                "tableCellUnselectableClass",
                "o-dpck__table__cell--unselectable",
            )]: !selectableDate(day) || props.disabled,
        },
        {
            [useComputedClass(
                "tableCellInvisibleClass",
                "o-dpck__table__cell--invisible",
            )]: !props.nearbyMonthDays && day.getMonth() !== props.month,
        },
        {
            [useComputedClass(
                "tableCellNearbyClass",
                "o-dpck__table__cell--nearby",
            )]:
                props.nearbySelectableMonthDays &&
                day.getMonth() !== props.month,
        },
        {
            [useComputedClass(
                "tableCellEventsClass",
                "o-dpck__table__cell--events",
            )]: hasEvents.value,
        },
        {
            [useComputedClass(
                "tableCellTodayClass",
                "o-dpck__table__cell--today",
            )]: dateMatch(day, props.dateCreator()),
        },
    ];
}

function eventClasses(event) {
    return [
        useComputedClass("tableEventClass", "o-dpck__table__event"),
        {
            [useComputedClass(
                "tableEventVariantClass",
                "o-dpck__table__event--",
                event.type,
            )]: event.type,
        },
        {
            [useComputedClass(
                "tableEventIndicatorsClass",
                "o-dpck__table__event--",
                props.indicators,
            )]: props.indicators,
        },
    ];
}

const tableRowClasses = computed(() => [
    useComputedClass("tableRowClass", "o-dpck__table__row"),
]);

const tableCellClasses = computed(() => [
    useComputedClass("tableCellClass", "o-dpck__table__cell"),
]);

const tableEventsClasses = computed(() => [
    useComputedClass("tableEventsClass", "o-dpck__table__events"),
]);
</script>

<template>
    <div :class="tableRowClasses">
        <a
            v-if="showWeekNumber"
            :class="tableCellClasses"
            :style="{ cursor: weekNumberClickable ? 'pointer' : 'auto' }"
            @click.prevent="clickWeekNumber(getWeekNumber(week[6]))">
            <span>{{ getWeekNumber(week[6]) }}</span>
        </a>
        <template v-for="(weekDay, idx) in week" :key="idx">
            <a
                v-if="!disabled && selectableDate(weekDay)"
                :ref="(el) => setDayRef(weekDay, el)"
                :class="cellClasses(weekDay)"
                role="button"
                href="#"
                :tabindex="
                    day === weekDay.getDate() && month === weekDay.getMonth()
                        ? null
                        : -1
                "
                @click.prevent="selectDate(weekDay)"
                @mouseenter="setRangeHoverEndDate(weekDay)"
                @keydown="onKeydown($event, weekDay)">
                <span>{{ weekDay.getDate() }}</span>
                <div
                    v-if="eventsDateMatch(weekDay).length"
                    :class="tableEventsClasses">
                    <div
                        v-for="(event, index) in eventsDateMatch(weekDay)"
                        :key="index"
                        :class="eventClasses(event)" />
                </div>
            </a>
            <div v-else :key="idx" :class="cellClasses(weekDay)">
                <span>{{ weekDay.getDate() }}</span>
            </div>
        </template>
    </div>
</template>
