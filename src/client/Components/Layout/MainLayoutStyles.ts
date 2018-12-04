import { IStyle } from 'fela';

const sidebar_width = 96;

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
		transform: 'translateZ(0)',
		flexGrow: 0,
		flexShrink: 0,
		backgroundImage: 'linear-gradient(#efefef, #c7c7c7)',
		position: 'relative',
		marginLeft: sidebar_width + 'px',
		boxSizing: 'border-box',
		'@media (min-width: 768px)': {
			marginLeft: sidebar_width + 'px'
		}
	} as IStyle,

	header_logo_container: {
		width: '80px',
		margin: '0.5em 0'
	} as IStyle,

	header_logo_image: {
		display: 'block',
		width: '100%',
		height: 'auto'
	} as IStyle,

	header_content_area: {
		width: '100%',
		maxWidth: '1024px',
		marginLeft: 'auto',
		marginRight: 'auto',
		display: 'flex',
		alignItems: 'center'
		// backgroundColor: '#004e7e',
		// color: 'white'
	} as IStyle,

	content_area: {
		flexGrow: 1,
		flexBasis: 'auto',
		minHeight: 0,
		display: 'flex',
		position: 'relative',
		marginLeft: sidebar_width + 'px',
		boxSizing: 'border-box'
	} as IStyle,

	// left side navigation
	side_navigation: {
		position: 'fixed',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: sidebar_width + 'px',
		height: '100%',
		backgroundColor: 'white',
		boxSizing: 'border-box',
		borderRight: '2px solid #982018',
		boxShadow: '2px 0px 6px rgba(128, 128, 128, 0.7)',
		willChange: 'transform',
		transform: 'translateZ(0)'
	} as IStyle,

	side_navigation_list_top: {
		marginTop: '120px'
	} as IStyle,

	side_navigation_list_bottom: {} as IStyle,

	side_navigation_list_item: {
		textAlign: 'center',
		borderBottom: '1px solid lightgray'
	} as IStyle,

	side_navigation_list_item_link: {
		padding: '0.25em',
		paddingTop: '0.75em',
		minHeight: '5rem',
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		transition: 'background-color 300ms',
		':hover': {
			backgroundColor: '#982018',
			color: 'white'
		},
		':focus': {
			backgroundColor: '#982018',
			color: 'white'
		}
	} as IStyle,

	side_navigation_list_item_text: {
		display: 'block',
		fontWeight: 'bold',
		fontSize: '85%'
	} as IStyle,

	side_navigation_list_item_icon: {
		fontSize: '125%'
	} as IStyle
};

export type MainLayoutStyles = typeof main_layout_styles;
