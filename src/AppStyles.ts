import { IStyle } from 'fela';

export const app_styles = {
	app: {
		alignContent: 'center',
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		minHeight: '100vh'
	} as IStyle,

	body_no_pointer_events: {
		pointerEvents: 'none'
	} as IStyle
};

export type AppStyles = typeof app_styles;
