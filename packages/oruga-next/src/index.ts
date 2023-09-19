import type { App } from "vue";
import type { OrugaOptions } from "@/types";

import * as plugins from "./components/plugins";

import { merge } from "./utils/helpers";
import {
    setVueInstance,
    setOptions,
    getOptions,
    ConfigProgrammatic,
} from "./utils/config";
import { registerPlugin, registerProgrammaticComponent } from "./utils/plugins";

// export all types
export * from "./types";

// export all vue components
export * from "./components";
// export all components as vue plugin
export * from "./components/plugins";

// export programmatic components
export { LoadingProgrammatic } from "./components/loading";
export { ModalProgrammatic } from "./components/modal";
export { NotificationProgrammatic } from "./components/notification";
export { ConfigProgrammatic } from "./utils/config";

// export programmatic composable
export { useProgrammatic } from "./utils/programmatic";

// default export main oruga vue plugin
export default {
    install(app: App, options?: OrugaOptions): void {
        // set global vue instance
        setVueInstance(app);
        // set options
        const defaultOptions = getOptions();
        setOptions(merge(defaultOptions, options, true));
        // add components
        for (const componentKey in plugins) {
            registerPlugin(app, plugins[componentKey]);
        }
        // add programmatic config component
        registerProgrammaticComponent(app, "config", ConfigProgrammatic);
    },
};
