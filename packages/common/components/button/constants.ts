export const BUTTON_TYPES = ['primary', 'secondary', 'info', 'outline', 'dashed', 'text'] as const;
export type ButtonTypes = (typeof BUTTON_TYPES)[number];
