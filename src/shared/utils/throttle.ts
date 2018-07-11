/*
	Add a nice comment in here!

*/

export const throttleByRequestAnimationFrame = (callback: () => void, that?: object): (() => void) => {
	let is_scheduled = false;
	return () => {
		if (is_scheduled) {
			return;
		} else {
			is_scheduled = true;
			// tslint:disable-next-line:only-arrow-functions - because we need 'arguments'
			window.requestAnimationFrame(function() {
				callback.apply(that, arguments);
				is_scheduled = false;
			});
		}
	};
};
