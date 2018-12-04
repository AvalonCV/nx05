import * as React from 'react';

import ReactPlayer from 'react-player';
// tslint:disable-next-line:no-var-requires
const background_video = require('./../../shared/videos/Northernlights2_HD.out2.mp4');
import background_video_poster from './../../shared/videos/Northernlights2_HD.out2.poster.jpg';

import { connect, FelaWithStylesProps } from 'react-fela';
import { BackgroundVideoStyles } from './BackgroundVideoStyles';

import { connectWithRedux } from './../../client/HOC/connectWithRedux';

// tslint:disable-next-line:max-line-length
import {
	ExecutableBackgroundContainerActions,
	BackgroundContainerState
} from './../../shared/state/background_container';

export interface BackgroundVideoState {}
export interface BackgroundVideoProps {}

// tslint:disable-next-line:max-line-length
type BackgroundVideoProperties = BackgroundVideoProps &
	ExecutableBackgroundContainerActions &
	BackgroundContainerState &
	FelaWithStylesProps<BackgroundVideoProps, BackgroundVideoStyles, {}>;

let test_counter = 0;

class BackgroundVideoWrapper extends React.PureComponent<BackgroundVideoProperties, object> {
	public render() {
		// console.log('this.props', test_counter, this.props.is_video_visible, this.props.is_video_loading);
		if (test_counter > 10) {
			return <div>Still a bit sad about this :( 2</div>;
		}
		test_counter++;

		return (
			<ReactPlayer
				className={this.props.styles.video_container}
				onReady={() => {
					/* Bah. onReady is called every time the movie loops :'( */
					if (test_counter > 10) {
						throw new Error('Still a bit sad about this :(');
					} else if (!this.props.is_video_visible) {
						// console.log('should not happen twice+');
						this.props.showBackgroundVideo();
					}
				}}
				config={{
					file: {
						attributes: {
							poster: background_video_poster
						}
					}
				}}
				width="auto"
				height="auto"
				playing={false} // default should be 'yes' -> but for now 'save' energy
				muted={true}
				loop={true}
				controls={false}
				playbackRate={0.4}
				url={background_video}
			/>
		);
	}
}

export const BackgroundVideoContainer = connectWithRedux(
	// tslint:disable-next-line:no-any
	connect<BackgroundVideoProps, {}, {}>(BackgroundVideoStyles)(BackgroundVideoWrapper as any) as any,
	['background_container']
);
