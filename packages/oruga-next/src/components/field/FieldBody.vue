<script setup lang="ts">
import {
    h,
    resolveComponent,
    Comment,
    Text,
    inject,
    useSlots,
    type PropType,
} from "vue";
import type { FieldComponent } from ".";

defineOptions({
    name: "OFieldBody",
    configField: "field",
    inheritAttrs: false,
});

const props = defineProps({
    classes: {
        type: Array as PropType<string[]>,
        default: undefined,
    },
});

// inject parent field component if used inside one
const parentField = inject<FieldComponent>("$field", undefined);

const slots = useSlots();

const render = () => {
    let first = true;
    const slot = slots.default();
    const children =
        slot.length === 1 && Array.isArray(slot[0].children)
            ? slot[0].children
            : slot;
    return h(
        "div",
        { class: props.classes },
        children.map((element: any) => {
            let message;
            if (element.type === Comment || element.type === Text) {
                return element;
            }
            if (first) {
                message = parentField.fieldMessage;
                first = false;
            }
            return h(
                resolveComponent("OField"),
                { variant: parentField.fieldVariant, message },
                () => [element],
            );
        }),
    );
};
</script>

<template>
    <render />
</template>
