export const throttleByRequestAnimationFrame = function (callback: () => void, that?: object): () => void {
	let is_scheduled = false;
	return function () {
		if (is_scheduled) {
			return;
		} else {
			is_scheduled = true;
			window.requestAnimationFrame(function () {
				callback.apply(that, arguments);
				is_scheduled = false;
			});
		}
	};
};