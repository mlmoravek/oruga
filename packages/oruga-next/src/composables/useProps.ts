import { getCurrentInstance } from "vue";

/**
 * Get the props of a component instance.
 * Must be called within a component setup function
 */
export function useProps() {
    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useComputedClass must be called within a component setup function.",
        );
    // get component props
    return vm.props;
}
