import { defineComponent } from "vue";

export default defineComponent({
    isOruga: true,
    props: {
        override: Boolean,
        rest: String,
    },
});
