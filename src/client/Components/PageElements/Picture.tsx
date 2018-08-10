import * as React from 'react';
import { IStyle } from 'fela';
import { connect, FelaWithStylesProps, FelaWithThemeProps } from 'react-fela';
import { TMultiRuleObject } from 'fela-tools';

export interface PictureProps {
	src: string;
	height: number;
	width: number;
	alt?: string;
	title?: string;
}

interface PictureStyles {
	picture: IStyle;
	image: IStyle;
}

const PictureStyles = (
	props: PictureProps
): TMultiRuleObject<PictureProps & FelaWithThemeProps<PictureProps>, PictureStyles> => {
	return {
		picture: {
			display: 'block',
			position: 'relative',
			maxWidth: props.width + 'px',
			':after': {
				content: '""',
				display: 'block',
				paddingBottom: (100 * props.height) / props.width + '%'
			}
		} as IStyle,
		image: {
			position: 'absolute',
			maxWidth: '100%',
			height: 'auto',
			display: 'block'
		} as IStyle
	};
};

type Properties = PictureProps & FelaWithStylesProps<PictureProps, PictureStyles, {}>;

const PictureForFela: React.StatelessComponent<Properties> = (props: Properties) => {
	return (
		<picture className={props.styles.picture}>
			<img className={props.styles.image} src={props.src} height={props.height} width={props.width} />
		</picture>
	);
};

export const ResponsivePicture = connect<PictureProps, PictureStyles>(PictureStyles)(PictureForFela);
