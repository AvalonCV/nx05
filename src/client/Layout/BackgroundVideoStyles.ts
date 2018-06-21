import { Rules } from 'react-fela';
import { BackgroundContainerState } from '@src/shared/state/background_container';


const background_video_styles = {
	video_container: {
		position: 'fixed',
		height: '100%',
		width: '100%',
		overflow: 'hidden',
		zIndex: '-100',
		opacity: '0',
		transition: 'opacity 300ms',
		'> video': {
			position: 'absolute',
			top: '50%',
			left: '50%',
			minWidth: '100%',
			minHeight: '100%',
			width: 'auto',
			height: 'auto',
			transform: 'translate(-50%, -50%)',
		},
		':after': {
			position: 'absolute',
			content: '""',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			// tslint:disable-next-line:max-line-length
			backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAG0lEQVQYV2NkYGD4z8DAwMgABXAGNgGwSgwVAFbmAgXQdISfAAAAAElFTkSuQmCC)',
			backgroundRepeat: 'repeat',
		}
	}
};


export type BackgroundVideoStyles = typeof background_video_styles;
export function BackgroundVideoStyles(props: BackgroundContainerState): Rules<BackgroundContainerState, object> {
	if (props.is_video_visible) {
		return {
			...background_video_styles,
			video_container: {
				...background_video_styles.video_container,
				opacity: '1'
			}
		};
	} else {
		return background_video_styles;
	}
}