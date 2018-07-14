import { IStyle } from 'fela';

export const todo_styles = {
	container: {
		backgroundColor: 'white',
		width: '100%',
		maxWidth: '1014px',
		margin: '10px auto',
		padding: '1em',
		boxShadow: '0 2px 8px gray'
	} as IStyle
};

export type TodoStyles = typeof todo_styles;
