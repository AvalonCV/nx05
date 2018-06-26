import { IStyle } from 'fela';

export const main_layout_styles = {
	main_layout: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1
	} as IStyle,
	header: {
		minHeight: '64px',
		backgroundColor: '#ededed',
		boxShadow: '1px 0 3px black',
		transform: 'translateZ(0)'
	} as IStyle,
	header_content_area: {
		width: '100%',
		maxWidth: '1024px',
		marginLeft: 'auto',
		marginRight: 'auto'
		// backgroundColor: '#004e7e',
		// color: 'white'
	} as IStyle,
	content_area: {
		flexGrow: 1,
		flexBasis: '0',
		minHeight: 0
	} as IStyle
};

export type MainLayoutStyles = typeof main_layout_styles;
