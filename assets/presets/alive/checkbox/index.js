export default {
    root: {
        class: [
            'fm-box-holder',
            // 'relative',

            // Alignment
            // 'inline-flex',
            // 'align-bottom',

            // Size
            // 'w-6',
            // 'h-6',

            // Misc
            // 'cursor-pointer',
            // 'select-none'
        ]
    },
    box: ({ props, context }) => ({
        class: [
            'fm-box',
            // Alignment
            // 'flex',
            // 'items-center',
            // 'justify-center',

            // Size
            // 'w-6',
            // 'h-6',

            // Shape
            // 'rounded-md',
            // 'border-2',

            // Colors
            {
                // 'border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900': !context.checked && !props.invalid,
                // 'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400': context.checked
                'fm-box-checked': context.checked
            },

            // Invalid State
            // { 'border-red-500 dark:border-red-400': props.invalid },

            // States
            {
                // 'peer-hover:border-primary-500 dark:peer-hover:border-primary-400': !props.disabled && !context.checked && !props.invalid,
                // 'peer-hover:bg-primary-600 dark:peer-hover:bg-primary-300 peer-hover:border-primary-700 dark:peer-hover:border-primary-300': !props.disabled && context.checked,
                // 'peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20': !props.disabled,
                'cursor-default opacity-60': props.disabled
            },

            // Transitions
            // 'transition-colors',
            // 'duration-200'
        ]
    }),
    input: {
        class: [
            'fm-box-control',
            // 'peer',

            // Size
            // 'w-full ',
            // 'h-full',

            // Position
            // 'absolute',
            // 'top-0 left-0',
            // 'z-10',

            // Spacing
            // 'p-0',
            // 'm-0',

            // Shape
            // 'opacity-0',
            // 'rounded-md',
            // 'outline-none',
            // 'border-2 border-surface-200 dark:border-surface-700',

            // Misc
            // 'appearance-none',
            // 'cursor-pointer'
        ]
    },
    icon: {
        class: [
            // Font
            'text-base leading-none',

            // Size
            'w-4',
            'h-4',

            // Colors
            'text-white dark:text-surface-900',

            // Transitions
            'transition-all',
            'duration-200'
        ]
    }
};
