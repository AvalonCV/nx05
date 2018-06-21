import { IStyle } from 'fela';

export const login_styles = {
	container: <IStyle>  {
		minHeight: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

	login_input: <IStyle> {
		maxWidth: '1024px',
		width: '100%',
		margin: '0 auto',
		boxShadow: '0 0 4px gray',
		backgroundColor: 'white',
		flexGrow: 0,
		minHeight: '300px',
		marginBottom: '150px',
		padding: '2em',
		borderRadius: '2px',
		boxSizing: 'border-box',
		position: 'relative'
	},

	login_background: <IStyle> {
		// backgroundColor: 'rgba(255, 255, 255, 0.4)',
		backgroundColor: '#002a5e',
		color: 'white',
		padding: '1em',
		flexBasis: '0',
		flexGrow: 1
	},

	logo: <IStyle> {
		maxWidth: '400px',
		height: 'auto',
		position: 'absolute',
		top: '6em',
		right: '2em'
	},
};

export type LoginStyles = typeof login_styles;