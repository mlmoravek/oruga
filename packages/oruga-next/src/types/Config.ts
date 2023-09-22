export type ComponentContext = {
    props: Record<string, any>;
    data: Record<string, any>;
    computed: Record<string, any>;
};

export type FieldFunction = (suffix: string, ctx: ComponentContext) => string;

export type FieldObject = {
    class: string;
    /**
     * In case you want to override Oruga existing classes completely,
     * you can specify the override behaviour for each class by set the field override to true.
     */
    override?: boolean;
};

export type TransformFunction = (appliedClasses: string) => string;

export type FieldDefinition = undefined | string | FieldFunction | FieldObject;

export type OrugaOptions = {
    iconPack: string;
    useHtml5Validation: boolean;
    statusIcon: boolean;
    /** You can use transformClasses globally if you need to transform classes for any component. */
    transformClasses?: TransformFunction;
    [key: string]:
        | boolean
        | FieldDefinition
        | {
              /**
               * In case you want to override Oruga existing classes completely,
               * you can set the field override to true.
               */
              override?: boolean;
              /** Use this function in case you want to transform applied classes' names. */
              transformClasses?: TransformFunction;
              [key: string]: FieldDefinition | boolean;
          };
};
