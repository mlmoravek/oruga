// import { getOptions } from "@/utils/config";
// import { getValueByPath } from "@/utils/helpers";

// There is some weird bug while defining the return value {@link ComponentObjectPropsOptions}.
// The type check is not working anymore with a return type definition for props.

/** base component props changed by every oruga main component */
export const baseComponentProps = {
    override: {
        type: Boolean,
        default: undefined,
    },
};

// export type BaseComponentPropsType = {
//     override: {
//         type: boolean;
//         default: undefined;
//     };
// };

// export const variantProp = (configField: string) => ({
//     /**
//      * Color of the control, optional
//      * @values primary, info, success, warning, danger, and any other custom color
//      */
//     variant: {
//         type: String,
//         default: (): string =>
//             getValueByPath(getOptions(), `${configField}.variant`),
//     },
// });

// export const sizeProp = (configField: string) => ({
//     /**
//      * Size of the control
//      * @values small, medium, large
//      */
//     size: {
//         type: String,
//         default: (): string =>
//             getValueByPath(getOptions(), `${configField}.size`),
//     },
// });

// export const checkRadioProps = () => ({
//     /**
//      * Same as native value
//      */
//     nativeValue: {
//         type: [String, Number, Boolean, Array],
//         default: undefined,
//     },
//     /**
//      * Same as native disabled
//      */
//     disabled: { type: Boolean, default: false },
//     /**
//      * Same as native required
//      */
//     required: { type: Boolean, default: false },
//     /**
//      * Same as native name
//      */
//     name: { type: String, default: undefined },
// });

// export const formElementProps = () => ({
//     /**
//      * Makes input full width when inside a grouped or addon field
//      */
//     expanded: Boolean,
//     /**
//      * Makes the element rounded
//      */
//     rounded: Boolean,
//     /**
//      * Icon name to be added
//      */
//     icon: String,
//     /**
//      * Icon pack to use
//      * @values mdi, fa, fas and any other custom icon pack
//      */
//     iconPack: String,
//     /** Native options to use in HTML5 validation */
//     autocomplete: String,
//     /** Same as native maxlength, plus character counter */
//     maxlength: [Number, String],
//     /** Enable html 5 native validation */
//     useHtml5Validation: {
//         type: Boolean,
//         default: () => {
//             return getValueByPath(getOptions(), "useHtml5Validation", true);
//         },
//     },
//     /** Show status icon using field and variant prop */
//     statusIcon: {
//         type: Boolean,
//         default: () => {
//             return getValueByPath(getOptions(), "statusIcon", true);
//         },
//     },
//     /**
//      * The message which is shown when a validation error occurs
//      */
//     validationMessage: String,
// });

// type ButtonProps = {
//     /**
//      * Html tag name
//      * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
//      */
//     tag: string | Component;
//     /**
//      * Button label, optional when default slot is used
//      */
//     label: string;
//     /**
//      * Color of the control, optional
//      * @values primary, info, success, warning, danger, and any other custom color
//      */
//     variant: string;
//     /**
//      * Size of the control
//      * @values small, medium, large
//      */
//     size: string;
//     /**
//      * Invert the variant
//      */
//     inverted: boolean;
//     /**
//      * Enable rounded style
//      */
//     rounded: boolean;
//     /**
//      * Enable outlined style
//      */
//     outlined: boolean;
//     /**
//      * Icon pack to use
//      * @values mdi, fa, fas and any other custom icon pack
//      */
//     iconPack: string;
//     /**
//      * Icon name to show on the left side
//      */
//     iconLeft: string;
//     /**
//      * Icon name to show on the right side
//      */
//     iconRight: string;
//     /**
//      * This is used internally
//      * @ignore
//      */
//     iconBoth: boolean;
//     /**
//      * Enable loading state
//      */
//     loading: boolean;
//     /**
//      * Enable disabled state
//      */
//     disabled: boolean;
//     /**
//      * Button will be expanded (full-width)
//      */
//     expanded: boolean;
//     /**
//      * Native html type, like native
//      */
//     nativeType: "button" | "submit" | "reset";
// };

// type ButtonClassProps = {
//     rootClass: string | FieldFunction | string[];
//     elementsWrapperClass: string | FieldFunction | string[];
//     outlinedClass: string | FieldFunction | string[];
//     loadingClass: string | FieldFunction | string[];
//     invertedClass: string | FieldFunction | string[];
//     expandedClass: string | FieldFunction | string[];
//     roundedClass: string | FieldFunction | string[];
//     disabledClass: string | FieldFunction | string[];
//     iconClass: string | FieldFunction | string[];
//     iconLeftClass: string | FieldFunction | string[];
//     iconRightClass: string | FieldFunction | string[];
//     labelClass: string | FieldFunction | string[];
//     sizeClass: string | FieldFunction | string[];
//     variantClass: string | FieldFunction | string[];
// };

// const props = withDefaults(
//     defineProps<BaseComponentPropsType & ButtonProps & ButtonClassProps>(),
//     {
//         tag: "button",
//         variant: () => getValueByPath(getOptions(), "button.variant"),
//         size: () => getValueByPath(getOptions(), "button.size"),
//         inverted: () => getValueByPath(getOptions(), "button.inverted"),
//         rounded: () => getValueByPath(getOptions(), "button.rounded", false),
//         outlined: () => getValueByPath(getOptions(), "button.outlined", false),
//         iconPack: () => getValueByPath(getOptions(), "button.iconPack"),
//         nativeType: "button",
//     },
// );
