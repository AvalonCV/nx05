import { IStyle } from 'fela';

export interface FelaCSSElements {
	[key: string]: IStyle;
}

export type FelaCSSStyles<T> = {
	[key in keyof T]: IStyle;
};

export type FelaStylesForUnconnectedProps<T> = {
	[key in keyof T]: string;
};