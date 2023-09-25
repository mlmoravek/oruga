<script setup lang="ts">
import { ref, computed, onMounted, getCurrentInstance } from "vue";

import OIcon from "../icon/Icon.vue";

import { baseComponentProps } from "@/mixins/SharedProps";
import { getOption } from "@/utils/config";
import { removeElement } from "@/utils/helpers";
import {
    useComputedClass,
    useClassProps,
    useEventListener,
    usePropBinding,
} from "@/composables";

/**
 * A simple loading overlay
 * @displayName Loading
 * @style _loading.scss
 */
defineOptions({
    isOruga: true,
    name: "OLoading",
    configField: "loading",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /**
     * Used for programmatic component usage
     * @ignore
     */
    programmatic: { type: Object, default: undefined },
    /**
     * Used for programmatic component usage
     * @ignore
     */
    promise: { type: Promise, default: undefined },
    /**
     * Container element to mount the component in
     */
    container: { type: HTMLElement, default: undefined },
    /**
     * Whether loading is active or not,
     * use v-model:active to make it two-way binding
     */
    active: { type: Boolean, default: false },
    /** Loader will overlay the full page */
    fullPage: { type: Boolean, default: true },
    /* Custom animation (transition name) */
    animation: {
        type: String,
        default: () => getOption("loading.animation", "fade"),
    },
    /** Icon name */
    icon: {
        type: String,
        default: () => getOption("loading.icon", "loading"),
    },
    /** Enable spin effect on icon */
    iconSpin: {
        type: Boolean,
        default: () => getOption("loading.iconSpin", true),
    },
    /** Override the icon size */
    iconSize: {
        type: String,
        default: () => getOption("loading.iconSize", "medium"),
    },
    /** Can close Loading by pressing escape or clicking outside */
    canCancel: {
        type: Boolean,
        default: () => getOption("loading.canCancel", false),
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "overlayClass",
        "iconClass",
        "fullPageClass",
    ]),
});

const emits = defineEmits<{
    /** active prop two-way binding */
    (e: "update:active", value: boolean): void;
    /** fullPage prop two-way binding */
    (e: "update:fullPage", value: boolean): void;
    /** Callback after user canceled (pressed escape / clicked outside) */
    (e: "close", ...args: any[]): void;
}>();

// root ref element of this component
const rootRef = ref();

// active prop two-way binding
const isActive = usePropBinding("active", props, emits);
// fullPage prop two-way binding
const isFullPage = usePropBinding("fullPage", props, emits);

onMounted(() => {
    console.log("Loading Mounted");
    if (props.programmatic) {
        isActive.value = true;
        // add programmatic instance to global instance registry
        if (props.programmatic.instances) {
            const vm = getCurrentInstance();
            props.programmatic.instances.add(vm);
        }
        // Insert the Loading component in body tag
        // only if it's programmatic
        if (!props.container) {
            document.body.appendChild(rootRef.value);
        } else {
            isFullPage.value = false;
            props.container.appendChild(rootRef.value);
        }
    }
});

useEventListener("keyup", keyPress);

/**
 * Keypress event that is bound to the document.
 */
function keyPress(e: KeyboardEvent): void {
    if (e.key === "Escape" || e.key === "Esc") cancel("escape");
}

/**
 * Close the Modal if canCancel.
 */
function cancel(method): void {
    if (!props.canCancel || !isActive.value) return;
    close({ action: "cancel", method });
}

/**
 * Emit events, and destroy modal if it's programmatic.
 */
function close(...args: any[]): void {
    emits("close", args);
    isActive.value = false;

    // Timeout for the animation complete before destroying
    if (props.programmatic) {
        // remove programmatic instance to global instance registry
        if (props.programmatic.instances) {
            const vm = getCurrentInstance();
            props.programmatic.instances.remove(vm);
        }
        if (props.programmatic.resolve) {
            props.programmatic.resolve.apply(null, args);
        }
        window.requestAnimationFrame(() => removeElement(rootRef.value));
    }
}

// make close function outside public
defineExpose({ close });

// --- Computed Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-load"),
    {
        [useComputedClass("fullPageClass", "o-load--fullpage")]:
            isFullPage.value,
    },
]);

const overlayClasses = computed(() => [
    useComputedClass("overlayClass", "o-load__overlay"),
]);

const iconClasses = computed(() => [
    useComputedClass("iconClass", "o-load__icon"),
]);
</script>

<template>
    <transition ref="rootRef" :name="animation">
        <div v-if="isActive" :class="rootClasses">
            <div :class="overlayClasses" @click="cancel('outside')" />
            <slot>
                <o-icon
                    :icon="icon"
                    :spin="iconSpin"
                    :size="iconSize"
                    :class="iconClasses"
                    both />
            </slot>
        </div>
    </transition>
</template>
