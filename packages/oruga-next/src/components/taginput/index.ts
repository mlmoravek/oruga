import type { App, Plugin } from "vue";

import TagInput from "./TagInput.vue";

import { registerComponent } from "../../utils/plugins";

export default {
    install(Vue: App) {
        registerComponent(Vue, TagInput);
    },
} as Plugin;

export { TagInput as OTagInput };
