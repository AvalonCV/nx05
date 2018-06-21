import { IStyle } from 'fela';

export const main_layout_styles = {

	main_layout: <IStyle> {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1
	},
	header: <IStyle> {
		minHeight: '64px',
		backgroundColor: '#ededed',
		boxShadow: '1px 0 3px black',
		transform: 'translateZ(0)'
	},
	header_content_area: <IStyle> {
		width: '100%',
		maxWidth: '1024px',
		marginLeft: 'auto',
		marginRight: 'auto',
		// backgroundColor: '#004e7e',
		// color: 'white'
	},

	content_area: <IStyle> {
		flexGrow: 1,
		flexBasis: '0',
		minHeight: 0
	}
};

export type MainLayoutStyles = typeof main_layout_styles;