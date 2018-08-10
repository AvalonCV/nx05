/*
 * Based on https://codepen.io/jpanter/pen/PWWQXK/
 */
import * as React from 'react';
import { connect, FelaWithStylesProps } from 'react-fela';
import { IStyle, IRenderer } from 'fela';
import { TMultiRuleObject } from 'fela-tools';

// use correct types!!!
const blink_keyframes = () => ({
	'0%': { opacity: 0.1 } as IStyle,
	'30%': { opacity: 1.0 } as IStyle,
	'100%': { opacity: 0.1 } as IStyle
});

const page_element_loader_styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	} as IStyle,

	row: {
		display: 'flex'
	} as IStyle,

	arrow: {
		width: 0,
		height: 0,
		margin: '0 -6px',
		borderLeft: '12px solid transparent',
		borderRight: '12px solid transparent',
		borderBottom: '21.6px solid #982118',
		animationDuration: '1s',
		animationIterationCount: 'infinite',
		animationName: 'see renderKeyframe later',
		filter: 'drop-shadow(0 0 18px #982118)'
	} as IStyle,

	down: {
		transform: 'rotate(180deg)'
	} as IStyle,

	outer1: {
		animationDelay: '-0.0555555556s'
	} as IStyle,
	outer2: {
		animationDelay: '-0.1111111111s'
	} as IStyle,
	outer3: {
		animationDelay: '-0.1666666667s'
	} as IStyle,
	outer4: {
		animationDelay: '-0.2222222222s'
	} as IStyle,
	outer5: {
		animationDelay: '-0.2777777778s'
	} as IStyle,
	outer6: {
		animationDelay: '-0.3333333333s'
	} as IStyle,
	outer7: {
		animationDelay: '-0.3888888889s'
	} as IStyle,
	outer8: {
		animationDelay: '-0.4444444444s'
	} as IStyle,
	outer9: {
		animationDelay: '-0.5s'
	} as IStyle,
	outer10: {
		animationDelay: '-0.5555555556s'
	} as IStyle,
	outer11: {
		animationDelay: '-0.6111111111s'
	} as IStyle,
	outer12: {
		animationDelay: '-0.6666666667s'
	} as IStyle,
	outer13: {
		animationDelay: '-0.7222222222s'
	} as IStyle,
	outer14: {
		animationDelay: '-0.7777777778s'
	} as IStyle,
	outer15: {
		animationDelay: '-0.8333333333s'
	} as IStyle,
	outer16: {
		animationDelay: '-0.8888888889s'
	} as IStyle,
	outer17: {
		animationDelay: '-0.9444444444s'
	} as IStyle,
	outer18: {
		animationDelay: '-1s'
	} as IStyle,

	inner1: {
		animationDelay: '-0.1666666667s'
	} as IStyle,
	inner2: {
		animationDelay: '-0.3333333333s'
	} as IStyle,
	inner3: {
		animationDelay: '-0.5s'
	} as IStyle,
	inner4: {
		animationDelay: '-0.6666666667s'
	} as IStyle,
	inner5: {
		animationDelay: '-0.8333333333s'
	} as IStyle,
	inner6: {
		animationDelay: '1s'
	} as IStyle
};

type PageElementLoaderStyles = typeof page_element_loader_styles;

export interface LoaderState {}
export interface LoaderProps {}

type Properties = LoaderProps & FelaWithStylesProps<LoaderProps, PageElementLoaderStyles>;

class PageElementLoaderForFela extends React.PureComponent<Properties, LoaderState> {
	public render(): JSX.Element {
		const loader_configuration = [
			['outer18', 'outer17', 'outer16', 'outer15', 'outer14'],
			['outer1', 'outer2', 'inner6', 'inner5', 'inner4', 'outer13', 'outer12'],
			['outer3', 'outer4', 'inner1', 'inner2', 'inner3', 'outer11', 'outer10'],
			['outer5', 'outer6', 'outer7', 'outer8', 'outer9']
		];

		return (
			<div className={this.props.styles.container}>
				{loader_configuration.map((row_elements, row_index) => {
					return (
						<div key={row_index} className={this.props.styles.row}>
							{row_elements.map((element, element_index) => {
								return (
									<div
										key={element_index}
										className={[
											this.props.styles.arrow,
											this.props.styles[element],
											(element_index + (row_index > 1 ? 1 : 0)) % 2
												? this.props.styles.down
												: null
										].join(' ')}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}
}

// use correct types!!!
const mapStylesToProps = ({}, renderer: IRenderer): TMultiRuleObject<LoaderProps, PageElementLoaderStyles> => {
	// tslint:disable-next-line:no-any
	page_element_loader_styles.arrow.animationName = renderer.renderKeyframe(blink_keyframes as any, {});
	return page_element_loader_styles;
};

// use correct types!!!
export const PageElementLoader = connect<LoaderProps, PageElementLoaderStyles>(
	// tslint:disable-next-line:no-any
	mapStylesToProps as any
)(PageElementLoaderForFela);
