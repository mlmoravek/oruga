import { computed, inject, type ComputedRef, provide } from "vue";

import Field from "./Field.vue";
import { getOption } from "@/utils/config";

type FieldData = {
    $el: Element;
    props: InstanceType<typeof Field>["$props"];
    hasInnerField: boolean;
    fieldVariant: string;
    fieldMessage: string;
    setFocus: (value: boolean) => void;
    setFilled: (value: boolean) => void;
    setVariant: (value: string) => void;
    setMessage: (value: string) => void;
};

/** provide/inject key */
const $field = Symbol();

/** provide/inject type */
type ProvidedField = ComputedRef<FieldData>;

/**
 * Provide field component data via dependency injection.
 * Provided data is a computed ref to enjure reactivity.
 */
export function provideField(data: FieldData): void {
    provide<ProvidedField>(
        $field,
        computed(() => data),
    );
}

/** Inject parent field component if used inside one. **/
export function injectField() {
    const parentField = inject<ProvidedField>($field, undefined);

    /**
     * Get the type prop from parent if it's a Field.
     */
    const statusVariant = computed(() => {
        if (!parentField?.value) return undefined;
        else if (!parentField.value.fieldVariant) return undefined;
        else {
            if (typeof parentField.value.fieldVariant === "string") {
                return parentField.value.fieldVariant;
            } else if (Array.isArray(parentField.value.fieldVariant)) {
                for (const key in parentField.value.fieldVariant as any) {
                    if (parentField.value.fieldVariant[key]) {
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

    return {
        parentField,
        statusVariant,
        statusVariantIcon,
    };
}