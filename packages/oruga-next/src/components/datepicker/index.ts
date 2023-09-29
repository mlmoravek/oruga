import type { App, Plugin } from "vue";

import Datepicker from "./Datepicker.vue";

import { registerComponent } from "../../utils/plugins";

export type DatepickerEvent = {
    date: Date;
    type: string;
};

export default {
    install(app: App) {
        registerComponent(app, Datepicker);
    },
} as Plugin;

export { Datepicker as ODatepicker };
