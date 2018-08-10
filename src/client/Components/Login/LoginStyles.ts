import { IStyle } from 'fela';

export const login_styles = {
	container: {
		width: '100%',
		minHeight: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	} as IStyle,

	login_input: {
		maxWidth: '1024px',
		width: '100%',
		margin: '0 auto',
		boxShadow: '0 0 8px rgba(255, 255, 255, 0.7)',
		backgroundColor: 'white',
		flexGrow: 1,
		minHeight: '50vh',
		padding: '2em',
		paddingBottom: '90px',
		borderRadius: '2px',
		boxSizing: 'border-box',
		position: 'relative'
	} as IStyle,

	login_background: {
		// backgroundColor: 'rgba(255, 255, 255, 0.4)',
		backgroundColor: '#002a5e',
		color: 'white',
		padding: '1em',
		flexBasis: '0',
		flexGrow: 1
	} as IStyle,

	logo: {
		maxWidth: '400px',
		height: 'auto',
		position: 'absolute',
		top: '6em',
		right: '2em'
	} as IStyle,

	footer: {
		position: 'absolute',
		backgroundColor: '#222',
		color: 'white',
		height: '90px',
		width: '100%',
		left: 0,
		right: 0,
		bottom: 0
	} as IStyle
};

export type LoginStyles = typeof login_styles;
