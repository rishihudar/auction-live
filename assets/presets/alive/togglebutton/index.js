export default {
    root: {
        class: [
            'box-togglebutton',
            // 'relative',

            // Alignment
            // 'inline-flex',
            // 'align-bottom',

            // Misc
            // 'cursor-pointer',
            // 'select-none'
        ]
    },
    box: ({ props }) => ({
        class: [
            'tb-button',
            // Alignments
            // 'items-center inline-flex flex-1 text-center align-bottom justify-center',

            // Sizes & Spacing
            // 'px-4 py-3 leading-none',

            // Shapes
            // 'rounded-md border',

            // Colors
            {
                'tb-button-inactive': !props.modelValue,
                'tb-button-invalid border-surface-200 ': !props.modelValue && !props.invalid,
                // 'text-surface-700': !props.modelValue,
                'tb-button-active': props.modelValue
            },

            // Invalid State
            { 'tb-button-invalid': props.invalid },

            // States
            {
                // 'peer-hover:bg-surface-50 peer-hover:border-surface-200 peer-hover:text-surface-700': !props.modelValue && !props.invalid,
                // 'peer-hover:bg-primary-600 peer-hover:border-primary-600': props.modelValue,
                // 'peer-focus-visible:ring peer-focus-visible:ring-primary-400/50': !props.disabled
            },

            // Transitions
            // 'transition-all duration-200',

            // Misc
            { 'cursor-pointer': !props.disabled, 'opacity-60 select-none pointer-events-none cursor-default': props.disabled }
        ]
    }),
    label: {
        class: 'tb-label'
        // class: 'font-semibold text-center w-full'
    },
    input: {
        class: [
            'tb-input',
            'peer',

            // Size
            'w-full ',
            'h-full',

            // Position
            'absolute',
            'top-0 left-0',
            'z-10',

            // Spacing
            'p-0',
            'm-0',

            // Shape
            'opacity-0',
            'rounded-md',
            'outline-none',
            'border border-surface-200 dark:border-surface-700',

            // Misc
            'appearance-none',
            'cursor-pointer'
        ]
    },
    icon: ({ props }) => ({
        class: [
            ' tb-icon',
            ' mr-2',
            {
                'text-surface-600 dark:text-white/70': !props.modelValue,
                'text-white dark:text-surface-900': props.modelValue
            }
        ]
    })
};
