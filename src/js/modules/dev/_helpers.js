/**
 * Commonly used constants and functions.
 *
 * @module Helpers
 */

/**
 * Detect current page.
 *
 * @constant
 * @type {String}
 */
export const currentPage = document.querySelector('main').dataset.page;

/**
 * Match media device indicator.
 */
export class Resp {
	/**
	 * Get window's current width.
	 *
	 * @get
	 * @static
	 * @return {Number}
	 */
	static get currWidth() {
		return window.innerWidth;
	}

	/**
	 * Detect touch events.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isTouch() {
		return 'ontouchstart' in window;
	}

	/**
	 * Detect desktop device.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isDesk() {
		return window.matchMedia(`(min-width: 1280px)`).matches;
	}

	/**
	 * Detect tablet device.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isTablet() {
		return window.matchMedia(`(max-width: 992px)`).matches;
	}

	/**
	 * Detect mobile device.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isMobile() {
		return window.matchMedia(`(max-width: 767px)`).matches;
	}
}

/**
 * Css class names.
 *
 * @constant
 * @type {Object}
 */
export const css = {
	active: 'active'
};

/**
 * Generate string of random letters.
 *
 * @param {Number} length
 */
export const randomString = (length = 10) => Math.random().toString(36).substr(2, length > 10 ? length : 10);

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 *
 * @param {Function} func
 * @param {Object} context
 * @param {Number} wait
 * @param {Boolean} [immediate]
 * @returns {Function}
 */
export const debounce = (func, context, wait, immediate) => {
	let timeout;

	return function () {
		const args = arguments;

		const later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export const fadeOut = (el) => {
	el.style.opacity = 1;

	(function fade() {
		if ((el.style.opacity -= .1) < 0) {
			el.style.display = "none";
		} else {
			requestAnimationFrame(fade);
		}
	})();
};
export const fadeIn = (el, display) => {
	el.style.opacity = 0;
	el.style.display = display || "block";

	(function fade() {
		let val = parseFloat(el.style.opacity);
		if (!((val += .1) > 1)) {
			el.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
};


export const easings = {
	linear(t) {
		return t;
	},
	easeInQuad(t) {
		return t * t;
	},
	easeOutQuad(t) {
		return t * (2 - t);
	},
	easeInOutQuad(t) {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	},
	easeInCubic(t) {
		return t * t * t;
	},
	easeOutCubic(t) {
		return (--t) * t * t + 1;
	},
	easeInOutCubic(t) {
		return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	},
	easeInQuart(t) {
		return t * t * t * t;
	},
	easeOutQuart(t) {
		return 1 - (--t) * t * t * t;
	},
	easeInOutQuart(t) {
		return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
	},
	easeInQuint(t) {
		return t * t * t * t * t;
	},
	easeOutQuint(t) {
		return 1 + (--t) * t * t * t * t;
	},
	easeInOutQuint(t) {
		return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
	}
};