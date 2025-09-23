export type ClickAction = 'copy' | 'link' | 'default';

export type RequiredProps<T> = {
  [K in keyof T]-?: T[K];
};