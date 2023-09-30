import { injectField } from "@/components/field/useFieldMixin";
import { getOption } from "@/utils/config";
import {
    // getCurrentInstance,
    nextTick,
    ref,
    type ComputedRef,
    type Ref,
    type ExtractPropTypes,
} from "vue";

// This should cover all types of HTML elements that have properties related to
// HTML constraint validation, e.g. .form and .validity.
const validatableFormElementTypes =
    typeof window === "undefined"
        ? []
        : [
              HTMLButtonElement,
              HTMLFieldSetElement,
              HTMLInputElement,
              HTMLObjectElement,
              HTMLOutputElement,
              HTMLSelectElement,
              HTMLTextAreaElement,
          ];

export type ValidatableFormElement = InstanceType<
    (typeof validatableFormElementTypes)[number]
>;

function asValidatableFormElement(el: unknown): ValidatableFormElement | null {
    return validatableFormElementTypes.some((t) => el instanceof t)
        ? (el as ValidatableFormElement)
        : null;
}

/**
 * Form input handler functionalities
 */
export function useInputHandler(
    /** input ref element */
    inputRef: Ref<ValidatableFormElement> | ComputedRef<ValidatableFormElement>,
    /** emitted input events */
    emits: {
        /** on input focus event */
        (e: "focus", value: Event): void;
        /** on input blur event */
        (e: "blur", value: Event): void;
        /** on input invalid event */
        (e: "invalid", value: Event): void;
    },
    /** validation configuration props */
    props: Readonly<
        ExtractPropTypes<{
            useHtml5Validation?: boolean;
            validationMessage?: string;
        }>
    >,
) {
    // inject parent field component if used inside one
    const { parentField } = injectField();

    // --- Input Focus Feature ---

    const isFocused = ref(false);

    /**
     * Focus method that work dynamically depending on the component.
     */
    function setFocus(): void {
        nextTick(() => {
            if (inputRef.value) inputRef.value.focus();
        });
    }

    function onBlur(event?: Event): void {
        isFocused.value = false;
        if (parentField?.value) parentField.value.setFocus(false);
        emits("blur", event);
        checkHtml5Validity();
    }

    function onFocus(event?: Event): void {
        isFocused.value = true;
        if (parentField?.value) parentField.value.setFocus(true);
        emits("focus", event);
    }

    // --- Validation Feature ---

    const isValid = ref(true);

    function setFieldValidity(variant, message): void {
        nextTick(() => {
            if (parentField?.value) {
                // Set type only if not defined
                if (!parentField.value.props.variant) {
                    parentField.value.setVariant(variant);
                }
                // Set message only if not defined
                if (!parentField.value.props.message) {
                    parentField.value.setMessage(message);
                }
            }
        });
    }

    /**
     * Check HTML5 validation, set isValid property.
     * If validation fail, send 'danger' type,
     * and error message to parent if it's a Field.
     */
    function checkHtml5Validity(): boolean {
        if (!props.useHtml5Validation) return;

        if (inputRef.value.validity.valid) {
            setFieldValidity(null, null);
            isValid.value = true;
        } else {
            setInvalid();
            isValid.value = false;
        }

        return isValid.value;
    }

    function setInvalid(): void {
        const variant = "danger";
        const message =
            props.validationMessage || inputRef.value.validationMessage;
        setFieldValidity(variant, message);
    }

    function onInvalid(event: Event): void {
        checkHtml5Validity();
        const validatable = asValidatableFormElement(event.target);
        if (validatable && parentField?.value && props.useHtml5Validation) {
            // We provide our own error message on the field, so we should suppress the browser's default tooltip.
            // We still want to focus the form's first invalid input, though.
            event.preventDefault();
            let isFirstInvalid = false;
            if (validatable.form != null) {
                const formElements = validatable.form.elements;
                for (let i = 0; i < formElements.length; ++i) {
                    const element = asValidatableFormElement(
                        formElements.item(i),
                    );
                    if (element?.willValidate && !element.validity.valid) {
                        isFirstInvalid = validatable === element;
                        break;
                    }
                }
            }
            if (isFirstInvalid) {
                const fieldElement = parentField.value.$el;
                const invalidHandler = getOption("invalidHandler");
                if (invalidHandler instanceof Function) {
                    invalidHandler(validatable, fieldElement);
                } else {
                    // We'll scroll to put the whole field in view, not just the element that triggered the event,
                    // which should mean that the message will be visible onscreen.
                    // scrollIntoViewIfNeeded() is a non-standard method (but a very common extension).
                    // If we can't use it, we'll just fall back to focusing the field.
                    const canScrollToField = fieldElement
                        ? fieldElement.scrollIntoView != undefined
                        : false;
                    validatable.focus({ preventScroll: canScrollToField });
                    if (canScrollToField) {
                        fieldElement.scrollIntoView({ block: "nearest" });
                    }
                }
            }
        }
        emits("invalid", event);
    }

    return {
        isFocused,
        isValid,
        setFocus,
        onFocus,
        onBlur,
        checkHtml5Validity,
        onInvalid,
    };
}
