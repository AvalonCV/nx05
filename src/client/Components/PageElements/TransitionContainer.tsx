import * as React from 'react';
import { IStyle, IRenderer } from 'fela';
import { connect, FelaWithStylesProps } from 'react-fela';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { TMultiRuleObject } from 'fela-tools';
import { difference } from 'lodash';

import { removeClass as removeOneClass, addClass } from 'dom-helpers/class';

interface TransitionContainerStyles {
	body_styles: IStyle;
	appear: IStyle;
	appear_active: IStyle;
	appear_active_combined?: IStyle;
	enter: IStyle;
	enter_active: IStyle;
	enter_active_combined?: IStyle;
	enter_done: IStyle;
	exit: IStyle;
	exit_active: IStyle;
	exit_active_combined?: IStyle;
	exit_done: IStyle;
}

export interface TransitionContainerProps {
	transition_key: string;
	children: JSX.Element | JSX.Element[];
	timeout?: number;
}

type Properties = TransitionContainerProps &
	FelaWithStylesProps<TransitionContainerProps, TransitionContainerStyles, {}>;

// https://github.com/rofrischmann/fela/issues/580

const TransitionContainerForFela: React.StatelessComponent<Properties> = (props: Properties) => {
	const { timeout = 1000 } = props;

	const removable_enter_classes = difference(props.styles.enter.split(' '), props.styles.enter_active.split(' '));
	const removable_exit_classes = difference(props.styles.exit.split(' '), props.styles.exit_active.split(' '));

	const removeClass = (node: HTMLElement, classes: string[]) =>
		node && classes && classes.forEach(className => removeOneClass(node, className));

	return (
		<TransitionGroup component={null}>
			<CSSTransition
				key={props.transition_key}
				classNames={{
					appear: props.styles.appear,
					appearActive: props.styles.appear_active,
					enter: props.styles.enter,
					enterActive: props.styles.enter_active,
					enterDone: props.styles.enter_done,
					exit: props.styles.exit,
					exitActive: props.styles.exit_active,
					exitDone: props.styles.exit_done
				}}
				onEntering={node => {
					removeClass(node, removable_enter_classes);
					if (props.styles.body_styles !== '') {
						addClass(document.body, props.styles.body_styles);
					}
				}}
				onExiting={node => {
					removeClass(node, removable_exit_classes);
				}}
				timeout={timeout}
				unmountOnExit={true}
				addEndListener={(node, done) => {
					// use the css transitionend event to mark the finish of a transition
					node.addEventListener(
						'transitionend',
						() => {
							done();
							if (props.styles.body_styles !== '') {
								removeOneClass(document.body, props.styles.body_styles);
							}
						},
						false
					);
				}}
			>
				{props.children}
			</CSSTransition>
		</TransitionGroup>
	);
};

const mapFadePageStylesToProps = (
	props: TransitionContainerProps,
	renderer: IRenderer
): TMultiRuleObject<Properties, TransitionContainerStyles> => {
	const { timeout = 1000 } = props;

	const base_styles = {
		position: 'absolute',
		transitionProperty: 'opacity, transform',
		transitionDuration: `${timeout}ms`,
		left: 0,
		top: 0,
		right: 0,
		minHeight: '100%'
	} as IStyle;

	return {
		body_styles: {
			overflowX: 'hidden'
		},
		appear: {} as IStyle,
		appear_active: {} as IStyle,
		enter: {
			...base_styles,
			opacity: 0,
			transform: 'scale(1.025, 1.0125)',
			transitionTimingFunction: 'ease-out'
		} as IStyle,
		enter_active: {
			...base_styles,
			opacity: 1,
			transform: 'scale(1)',
			transitionTimingFunction: 'ease-out'
		} as IStyle,
		enter_done: {} as IStyle,
		exit: {
			...base_styles,
			opacity: 1,
			transitionTimingFunction: 'ease-in',
			zIndex: -1
		} as IStyle,
		exit_active: {
			...base_styles,
			opacity: 0,
			transitionTimingFunction: 'ease-in',
			zIndex: -1
		} as IStyle,
		exit_done: {} as IStyle
	};
};

const mapFadeStylesToProps = (
	props: TransitionContainerProps,
	renderer: IRenderer
): TMultiRuleObject<Properties, TransitionContainerStyles> => {
	const { timeout = 1000 } = props;

	const base_styles = {
		transitionProperty: 'opacity',
		transitionDuration: `${timeout}ms`
	} as IStyle;

	return {
		body_styles: {},
		appear: {} as IStyle,
		appear_active: {} as IStyle,
		enter: {
			...base_styles,
			opacity: 0,
			transitionTimingFunction: 'ease-out'
		} as IStyle,
		enter_active: {
			...base_styles,
			opacity: 1,
			transitionTimingFunction: 'ease-out'
		} as IStyle,
		enter_done: {} as IStyle,
		exit: {
			...base_styles,
			opacity: 1,
			transitionTimingFunction: 'ease-in',
			zIndex: -1
		} as IStyle,
		exit_active: {
			...base_styles,
			opacity: 0,
			transitionTimingFunction: 'ease-in',
			zIndex: -1
		} as IStyle,
		exit_done: {} as IStyle
	};
};

export const FadePageTransitionContainer = connect<TransitionContainerProps, TransitionContainerStyles>(
	// tslint:disable-next-line:no-any
	mapFadePageStylesToProps as any
)(TransitionContainerForFela);

export const FadeTransitionContainer = connect<TransitionContainerProps, TransitionContainerStyles>(
	// tslint:disable-next-line:no-any
	mapFadeStylesToProps as any
)(TransitionContainerForFela);
