/* shamelessly stolen from
	'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener'

	--- Maybe use as polyfill to change all window.addEventListeners?
*/
function browserSupportsPassiveEvents(): boolean {
	var supported = false;

	try {
		var options = Object.defineProperty({}, 'passive', {
			get: function () {
				supported = true;
			}
		});

		window.addEventListener('test', options, options);
		window.removeEventListener('test', options, options);
	} catch (err) {
		supported = false;
	}

	return supported;
}

export default browserSupportsPassiveEvents();