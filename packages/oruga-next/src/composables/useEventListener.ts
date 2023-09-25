import { onBeforeUnmount, onMounted } from "vue";

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * @param event
 * @param listener
 */
export function useEventListener(
    event: string,
    listener: (evt?: any) => any,
): void {
    onMounted(() => {
        if (typeof window !== "undefined") {
            document.addEventListener(event, listener);
        }
    });
    onBeforeUnmount(() => {
        if (typeof window !== "undefined") {
            document.removeEventListener(event, listener);
        }
    });
}
