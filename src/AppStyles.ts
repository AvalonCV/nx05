import { Rules } from 'react-fela';

export interface Styles {
	app: object;
	body_no_pointer_events: object;
}

export default (font: object, theme: object): Rules<object, Styles> => {
	return {

		// app
		app: {
			alignContent: 'center',
			display: 'flex',
			flexDirection: 'column',
			height: '100%'
		},

		body_no_pointer_events: {
			pointerEvents: 'none'
		}
	};
};