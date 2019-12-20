/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var currentPage = exports.currentPage = document.querySelector('main').dataset.page;

/**
 * Match media device indicator.
 */

var Resp = exports.Resp = function () {
	function Resp() {
		_classCallCheck(this, Resp);
	}

	_createClass(Resp, null, [{
		key: 'currWidth',

		/**
   * Get window's current width.
   *
   * @get
   * @static
   * @return {Number}
   */
		get: function get() {
			return window.innerWidth;
		}

		/**
   * Detect touch events.
   *
   * @get
   * @static
   * @return {Boolean}
   */

	}, {
		key: 'isTouch',
		get: function get() {
			return 'ontouchstart' in window;
		}

		/**
   * Detect desktop device.
   *
   * @get
   * @static
   * @return {Boolean}
   */

	}, {
		key: 'isDesk',
		get: function get() {
			return window.matchMedia('(min-width: 1280px)').matches;
		}

		/**
   * Detect tablet device.
   *
   * @get
   * @static
   * @return {Boolean}
   */

	}, {
		key: 'isTablet',
		get: function get() {
			return window.matchMedia('(max-width: 992px)').matches;
		}

		/**
   * Detect mobile device.
   *
   * @get
   * @static
   * @return {Boolean}
   */

	}, {
		key: 'isMobile',
		get: function get() {
			return window.matchMedia('(max-width: 767px)').matches;
		}
	}]);

	return Resp;
}();

/**
 * Css class names.
 *
 * @constant
 * @type {Object}
 */


var css = exports.css = {
	active: 'active'
};

/**
 * Generate string of random letters.
 *
 * @param {Number} length
 */
var randomString = exports.randomString = function randomString() {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
	return Math.random().toString(36).substr(2, length > 10 ? length : 10);
};

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 *
 * @param {Function} func
 * @param {Object} context
 * @param {Number} wait
 * @param {Boolean} [immediate]
 * @returns {Function}
 */
var debounce = exports.debounce = function debounce(func, context, wait, immediate) {
	var timeout = void 0;

	return function () {
		var args = arguments;

		var later = function later() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var fadeOut = exports.fadeOut = function fadeOut(el) {
	el.style.opacity = 1;

	(function fade() {
		if ((el.style.opacity -= .1) < 0) {
			el.style.display = "none";
		} else {
			requestAnimationFrame(fade);
		}
	})();
};
var fadeIn = exports.fadeIn = function fadeIn(el, display) {
	el.style.opacity = 0;
	el.style.display = display || "block";

	(function fade() {
		var val = parseFloat(el.style.opacity);
		if (!((val += .1) > 1)) {
			el.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
};

var easings = exports.easings = {
	linear: function linear(t) {
		return t;
	},
	easeInQuad: function easeInQuad(t) {
		return t * t;
	},
	easeOutQuad: function easeOutQuad(t) {
		return t * (2 - t);
	},
	easeInOutQuad: function easeInOutQuad(t) {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	},
	easeInCubic: function easeInCubic(t) {
		return t * t * t;
	},
	easeOutCubic: function easeOutCubic(t) {
		return --t * t * t + 1;
	},
	easeInOutCubic: function easeInOutCubic(t) {
		return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	},
	easeInQuart: function easeInQuart(t) {
		return t * t * t * t;
	},
	easeOutQuart: function easeOutQuart(t) {
		return 1 - --t * t * t * t;
	},
	easeInOutQuart: function easeInOutQuart(t) {
		return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
	},
	easeInQuint: function easeInQuint(t) {
		return t * t * t * t * t;
	},
	easeOutQuint: function easeOutQuint(t) {
		return 1 + --t * t * t * t * t;
	},
	easeInOutQuint: function easeInOutQuint(t) {
		return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
	}
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * App entry point.
 *
 * @module App
 */

/** Import common controller */

var _Common = __webpack_require__(2);

var _Common2 = _interopRequireDefault(_Common);

var _Popup = __webpack_require__(6);

var _Popup2 = _interopRequireDefault(_Popup);

var _Form = __webpack_require__(7);

var _Form2 = _interopRequireDefault(_Form);

var _Home = __webpack_require__(10);

var _Home2 = _interopRequireDefault(_Home);

var _helpers = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Run appropriate scripts for each page.
 **/


/** Import page controllers */


/** Import popup controller */
switch (_helpers.currentPage) {
	/** Home page */
	case 'home':
		new _Home2.default();
		break;

	/** No page found */
	default:
		console.warn('Undefined page');
}

/** Import rrd controller */
// import Rrd from './components/Rrd'

/** Import form controller */

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Common = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Website's common scripts (example).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module Common
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _helpers = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);

var Common = exports.Common = function () {
	/**
  * Cache data, make preparations and initialize common scripts.
  */
	function Common() {
		_classCallCheck(this, Common);

		var self = this;
		this.state = {
			scrollTrigger: null,
			anchorLinks: document.querySelectorAll('.js-links'),
			activeBlock: null,
			blockBreakpoints: [],
			sectionEls: []

		};

		// initialize after construction
		document.addEventListener("DOMContentLoaded", function (event) {
			self.init();
		});
	}

	/**
  * Initialize common scripts.
  */


	_createClass(Common, [{
		key: 'init',
		value: function init() {
			this.fixHeader();
			this.toogleMenu();
			this.scrollInvoke();
			this.resizeCheck();
			this.inputFocus();
			this.openTabs();
			this.getActiveSceen();
			this.selectTarif();
		}
	}, {
		key: 'resizeCheck',
		value: function resizeCheck() {
			var self = this;
			var resized = void 0;
			window.addEventListener('resize', function () {
				clearTimeout(resized);
				resized = setTimeout(function () {
					doneResizing();
				}, 300);
			});

			function doneResizing() {
				_helpers.Resp.isTablet === true ? self.state.scrollTrigger = 0 : self.state.scrollTrigger = 39;
			}
		}
	}, {
		key: 'fixHeader',
		value: function fixHeader() {
			var self = this;
			var header = document.querySelector('.js-header');
			_helpers.Resp.isTablet === true ? self.state.scrollTrigger = 0 : self.state.scrollTrigger = 39;

			window.onscroll = function () {
				var scrolled = window.pageYOffset || document.documentElement.scrollTop;

				if (scrolled > self.state.scrollTrigger) {
					header.classList.add("fixed");
				} else {
					header.classList.remove("fixed");
				}
			};
		}
	}, {
		key: 'toogleMenu',
		value: function toogleMenu() {
			var burger = document.querySelector('.js-burger');
			var mainMenu = document.querySelector(".main-nav");
			burger.addEventListener('click', function () {
				burger.classList.toggle("is-open");
				mainMenu.classList.toggle("menu-open");
			});
		}
	}, {
		key: 'selectTarif',
		value: function selectTarif() {
			var prises = document.querySelectorAll('.choose');
			for (var index = 0; index < prises.length; index++) {
				var elem = prises[index];
				elem.addEventListener('click', function () {
					localStorage.setItem('wantToSeeTariffs', true);
					// host
					window.location.href = 'http://10.0.18.242:80/profile';
					// window.location.href = 'http://rrdoc.itt/profile'
					// window.location.href = 'http://localhost:8088/profile'
				});
			}
		}
	}, {
		key: 'scrollTo',
		value: function scrollTo(destination) {
			var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
			var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'linear';
			var callback = arguments[3];


			var start = window.pageYOffset;
			var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

			var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
			var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
			var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop - 100;
			var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

			if ('requestAnimationFrame' in window === false) {
				window.scroll(0, destinationOffsetToScroll);
				if (callback) {
					callback();
				}
				return;
			}

			function scroll() {
				var now = 'now' in window.performance ? performance.now() : new Date().getTime();
				var time = Math.min(1, (now - startTime) / duration);
				var timeFunction = _helpers.easings[easing](time);
				window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));

				if (window.pageYOffset === destinationOffsetToScroll) {
					if (callback) {
						callback();
					}
					return;
				}

				requestAnimationFrame(scroll);
			}

			scroll();
		}
	}, {
		key: 'scrollInvoke',
		value: function scrollInvoke() {
			var _this = this;

			for (var index = 0; index < this.state.anchorLinks.length; index++) {
				var link = this.state.anchorLinks[index];
				link.addEventListener('click', function (e) {
					var scrollTargetEl = e.target.getAttribute('data-to');
					_this.scrollTo(document.getElementById(scrollTargetEl), 1500, 'easeOutQuint', function () {
						if (document.querySelector('.activeAnchor')) {
							document.querySelector('.activeAnchor').classList.remove('activeAnchor');
						}
						e.target.parentNode.classList.add('activeAnchor');
						var openMenu = document.querySelector('.menu-open');
						var openBurger = document.querySelector('.js-burger');
						if (openMenu) {
							openBurger.click();
						}
					});
				});
			}
		}
	}, {
		key: 'inputFocus',
		value: function inputFocus() {
			var formInputs = document.querySelectorAll('.js-input');

			var _loop = function _loop(index) {
				var input = formInputs[index];
				input.addEventListener('focus', function () {
					input.parentNode.classList.add('is-focused');
				});
				input.addEventListener('blur', function () {
					if (input.value.length === 0) {
						input.parentNode.classList.remove('is-focused');
					}
				});

				if (input.value !== '') {
					input.parentNode.classList.add('is-focused');
				}
			};

			for (var index = 0; index < formInputs.length; index++) {
				_loop(index);
			}
		}
	}, {
		key: 'openTabs',
		value: function openTabs() {
			var btns = document.querySelectorAll('.js-open-tab');

			var _loop2 = function _loop2(index) {
				var btn = btns[index];
				var hiddenEl = btn.nextElementSibling;
				var controlEl = btn;
				if (hiddenEl.length < 1 || controlEl.length < 1) {
					return {
						v: void 0
					};
				}
				btn.addEventListener('click', function (e) {
					btn.classList.toggle('is-open');
					var elementClasses = (" " + hiddenEl.className + " ").replace(/[\n\t\r]/g, " "),
					    removeClass = "slide-down",
					    addClass = "slide-up",
					    isShowing = elementClasses.indexOf(" " + removeClass + " ") > -1;

					if (!isShowing) {
						removeClass = [addClass, addClass = removeClass][0];
					}
					hiddenEl.className = (elementClasses.replace(" " + removeClass + " ", "") + " " + addClass + " ").trim();

					return false;
				});
			};

			for (var index = 0; index < btns.length; index++) {
				var _ret2 = _loop2(index);

				if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
			}
		}
	}, {
		key: 'getActiveSceen',
		value: function getActiveSceen() {
			var self = this;
			var sections = document.querySelectorAll('.js-section');
			var leaveTrigger = document.querySelectorAll('.js-leave');
			this.calculateAdjustedBlockPositions();
			this.initObserver();
		}
	}, {
		key: 'calculateAdjustedBlockPositions',
		value: function calculateAdjustedBlockPositions() {
			this.state.sectionEls = Array.prototype.slice.call(document.querySelectorAll('.js-section'));
			var viewportHeight = window.innerHeight;
			var docHeight = document.body.offsetHeight;
			var scrollTop = document.documentElement.scrollTop;
			this.state.blockBreakpoints = this.state.sectionEls.map(function (el) {
				var top = el.getBoundingClientRect().top;
				var oldOffset = top + scrollTop;
				return oldOffset - oldOffset * (viewportHeight / docHeight);
			});
		}
	}, {
		key: 'initObserver',
		value: function initObserver() {
			var _this2 = this;

			var options = {
				threshold: [].concat(_toConsumableArray(Array(10))).map(function (el, index) {
					return .1 * index;
				}),
				bottom: 500
			};

			var handleIntersectionEvent = function handleIntersectionEvent(entries) {
				var scrollTop = document.documentElement.scrollTop;
				_this2.state.blockBreakpoints.find(function (bp, index) {
					// console.log(bp, index)
					if (Math.abs(scrollTop - bp) < 100) {
						_this2.state.activeBlock = index;
						_this2.state.anchorLinks.forEach(function (link) {
							link.parentNode.classList.remove('activeAnchor');
						});
						_this2.state.anchorLinks[_this2.state.activeBlock].parentNode.classList.add('activeAnchor');
					}
				});
			};

			var observer = new IntersectionObserver(handleIntersectionEvent, options);

			this.state.sectionEls.forEach(function (element) {
				return observer.observe(element);
			});
		}
	}]);

	return Common;
}();

/** Export initialized common scripts by default */


exports.default = new Common();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function () {
	'use strict';

	// Exit early if we're not running in a browser.

	if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') {
		return;
	}

	// Exit early if all IntersectionObserver and IntersectionObserverEntry
	// features are natively supported.
	if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

		// Minimal polyfill for Edge 15's lack of `isIntersecting`
		// See: https://github.com/w3c/IntersectionObserver/issues/211
		if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
			Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
				get: function get() {
					return this.intersectionRatio > 0;
				}
			});
		}
		return;
	}

	/**
  * A local reference to the document.
  */
	var document = window.document;

	/**
  * An IntersectionObserver registry. This registry exists to hold a strong
  * reference to IntersectionObserver instances currently observing a target
  * element. Without this registry, instances without another reference may be
  * garbage collected.
  */
	var registry = [];

	/**
  * Creates the global IntersectionObserverEntry constructor.
  * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
  * @param {Object} entry A dictionary of instance properties.
  * @constructor
  */
	function IntersectionObserverEntry(entry) {
		this.time = entry.time;
		this.target = entry.target;
		this.rootBounds = entry.rootBounds;
		this.boundingClientRect = entry.boundingClientRect;
		this.intersectionRect = entry.intersectionRect || getEmptyRect();
		this.isIntersecting = !!entry.intersectionRect;

		// Calculates the intersection ratio.
		var targetRect = this.boundingClientRect;
		var targetArea = targetRect.width * targetRect.height;
		var intersectionRect = this.intersectionRect;
		var intersectionArea = intersectionRect.width * intersectionRect.height;

		// Sets intersection ratio.
		if (targetArea) {
			// Round the intersection ratio to avoid floating point math issues:
			// https://github.com/w3c/IntersectionObserver/issues/324
			this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
		} else {
			// If area is zero and is intersecting, sets to 1, otherwise to 0
			this.intersectionRatio = this.isIntersecting ? 1 : 0;
		}
	}

	/**
  * Creates the global IntersectionObserver constructor.
  * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
  * @param {Function} callback The function to be invoked after intersection
  *     changes have queued. The function is not invoked if the queue has
  *     been emptied by calling the `takeRecords` method.
  * @param {Object=} opt_options Optional configuration options.
  * @constructor
  */
	function IntersectionObserver(callback, opt_options) {

		var options = opt_options || {};

		if (typeof callback != 'function') {
			throw new Error('callback must be a function');
		}

		if (options.root && options.root.nodeType != 1) {
			throw new Error('root must be an Element');
		}

		// Binds and throttles `this._checkForIntersections`.
		this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

		// Private properties.
		this._callback = callback;
		this._observationTargets = [];
		this._queuedEntries = [];
		this._rootMarginValues = this._parseRootMargin(options.rootMargin);

		// Public properties.
		this.thresholds = this._initThresholds(options.threshold);
		this.root = options.root || null;
		this.rootMargin = this._rootMarginValues.map(function (margin) {
			return margin.value + margin.unit;
		}).join(' ');
	}

	/**
  * The minimum interval within which the document will be checked for
  * intersection changes.
  */
	IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;

	/**
  * The frequency in which the polyfill polls for intersection changes.
  * this can be updated on a per instance basis and must be set prior to
  * calling `observe` on the first target.
  */
	IntersectionObserver.prototype.POLL_INTERVAL = null;

	/**
  * Use a mutation observer on the root element
  * to detect intersection changes.
  */
	IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;

	/**
  * Starts observing a target element for intersection changes based on
  * the thresholds values.
  * @param {Element} target The DOM element to observe.
  */
	IntersectionObserver.prototype.observe = function (target) {
		var isTargetAlreadyObserved = this._observationTargets.some(function (item) {
			return item.element == target;
		});

		if (isTargetAlreadyObserved) {
			return;
		}

		if (!(target && target.nodeType == 1)) {
			throw new Error('target must be an Element');
		}

		this._registerInstance();
		this._observationTargets.push({
			element: target,
			entry: null
		});
		this._monitorIntersections();
		this._checkForIntersections();
	};

	/**
  * Stops observing a target element for intersection changes.
  * @param {Element} target The DOM element to observe.
  */
	IntersectionObserver.prototype.unobserve = function (target) {
		this._observationTargets = this._observationTargets.filter(function (item) {

			return item.element != target;
		});
		if (!this._observationTargets.length) {
			this._unmonitorIntersections();
			this._unregisterInstance();
		}
	};

	/**
  * Stops observing all target elements for intersection changes.
  */
	IntersectionObserver.prototype.disconnect = function () {
		this._observationTargets = [];
		this._unmonitorIntersections();
		this._unregisterInstance();
	};

	/**
  * Returns any queue entries that have not yet been reported to the
  * callback and clears the queue. This can be used in conjunction with the
  * callback to obtain the absolute most up-to-date intersection information.
  * @return {Array} The currently queued entries.
  */
	IntersectionObserver.prototype.takeRecords = function () {
		var records = this._queuedEntries.slice();
		this._queuedEntries = [];
		return records;
	};

	/**
  * Accepts the threshold value from the user configuration object and
  * returns a sorted array of unique threshold values. If a value is not
  * between 0 and 1 and error is thrown.
  * @private
  * @param {Array|number=} opt_threshold An optional threshold value or
  *     a list of threshold values, defaulting to [0].
  * @return {Array} A sorted list of unique and valid threshold values.
  */
	IntersectionObserver.prototype._initThresholds = function (opt_threshold) {
		var threshold = opt_threshold || [0];
		if (!Array.isArray(threshold)) threshold = [threshold];

		return threshold.sort().filter(function (t, i, a) {
			if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
				throw new Error('threshold must be a number between 0 and 1 inclusively');
			}
			return t !== a[i - 1];
		});
	};

	/**
  * Accepts the rootMargin value from the user configuration object
  * and returns an array of the four margin values as an object containing
  * the value and unit properties. If any of the values are not properly
  * formatted or use a unit other than px or %, and error is thrown.
  * @private
  * @param {string=} opt_rootMargin An optional rootMargin value,
  *     defaulting to '0px'.
  * @return {Array<Object>} An array of margin objects with the keys
  *     value and unit.
  */
	IntersectionObserver.prototype._parseRootMargin = function (opt_rootMargin) {
		var marginString = opt_rootMargin || '0px';
		var margins = marginString.split(/\s+/).map(function (margin) {
			var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
			if (!parts) {
				throw new Error('rootMargin must be specified in pixels or percent');
			}
			return {
				value: parseFloat(parts[1]),
				unit: parts[2]
			};
		});

		// Handles shorthand.
		margins[1] = margins[1] || margins[0];
		margins[2] = margins[2] || margins[0];
		margins[3] = margins[3] || margins[1];

		return margins;
	};

	/**
  * Starts polling for intersection changes if the polling is not already
  * happening, and if the page's visibility state is visible.
  * @private
  */
	IntersectionObserver.prototype._monitorIntersections = function () {
		if (!this._monitoringIntersections) {
			this._monitoringIntersections = true;

			// If a poll interval is set, use polling instead of listening to
			// resize and scroll events or DOM mutations.
			if (this.POLL_INTERVAL) {
				this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL);
			} else {
				addEvent(window, 'resize', this._checkForIntersections, true);
				addEvent(document, 'scroll', this._checkForIntersections, true);

				if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
					this._domObserver = new MutationObserver(this._checkForIntersections);
					this._domObserver.observe(document, {
						attributes: true,
						childList: true,
						characterData: true,
						subtree: true
					});
				}
			}
		}
	};

	/**
  * Stops polling for intersection changes.
  * @private
  */
	IntersectionObserver.prototype._unmonitorIntersections = function () {
		if (this._monitoringIntersections) {
			this._monitoringIntersections = false;

			clearInterval(this._monitoringInterval);
			this._monitoringInterval = null;

			removeEvent(window, 'resize', this._checkForIntersections, true);
			removeEvent(document, 'scroll', this._checkForIntersections, true);

			if (this._domObserver) {
				this._domObserver.disconnect();
				this._domObserver = null;
			}
		}
	};

	/**
  * Scans each observation target for intersection changes and adds them
  * to the internal entries queue. If new entries are found, it
  * schedules the callback to be invoked.
  * @private
  */
	IntersectionObserver.prototype._checkForIntersections = function () {
		var rootIsInDom = this._rootIsInDom();
		var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

		this._observationTargets.forEach(function (item) {
			var target = item.element;
			var targetRect = getBoundingClientRect(target);
			var rootContainsTarget = this._rootContainsTarget(target);
			var oldEntry = item.entry;
			var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, rootRect);

			var newEntry = item.entry = new IntersectionObserverEntry({
				time: now(),
				target: target,
				boundingClientRect: targetRect,
				rootBounds: rootRect,
				intersectionRect: intersectionRect
			});

			if (!oldEntry) {
				this._queuedEntries.push(newEntry);
			} else if (rootIsInDom && rootContainsTarget) {
				// If the new entry intersection ratio has crossed any of the
				// thresholds, add a new entry.
				if (this._hasCrossedThreshold(oldEntry, newEntry)) {
					this._queuedEntries.push(newEntry);
				}
			} else {
				// If the root is not in the DOM or target is not contained within
				// root but the previous entry for this target had an intersection,
				// add a new record indicating removal.
				if (oldEntry && oldEntry.isIntersecting) {
					this._queuedEntries.push(newEntry);
				}
			}
		}, this);

		if (this._queuedEntries.length) {
			this._callback(this.takeRecords(), this);
		}
	};

	/**
  * Accepts a target and root rect computes the intersection between then
  * following the algorithm in the spec.
  * TODO(philipwalton): at this time clip-path is not considered.
  * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
  * @param {Element} target The target DOM element
  * @param {Object} rootRect The bounding rect of the root after being
  *     expanded by the rootMargin value.
  * @return {?Object} The final intersection rect object or undefined if no
  *     intersection is found.
  * @private
  */
	IntersectionObserver.prototype._computeTargetAndRootIntersection = function (target, rootRect) {

		// If the element isn't displayed, an intersection can't happen.
		if (window.getComputedStyle(target).display == 'none') return;

		var targetRect = getBoundingClientRect(target);
		var intersectionRect = targetRect;
		var parent = getParentNode(target);
		var atRoot = false;

		while (!atRoot) {
			var parentRect = null;
			var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {};

			// If the parent isn't displayed, an intersection can't happen.
			if (parentComputedStyle.display == 'none') return;

			if (parent == this.root || parent == document) {
				atRoot = true;
				parentRect = rootRect;
			} else {
				// If the element has a non-visible overflow, and it's not the <body>
				// or <html> element, update the intersection rect.
				// Note: <body> and <html> cannot be clipped to a rect that's not also
				// the document rect, so no need to compute a new intersection.
				if (parent != document.body && parent != document.documentElement && parentComputedStyle.overflow != 'visible') {
					parentRect = getBoundingClientRect(parent);
				}
			}

			// If either of the above conditionals set a new parentRect,
			// calculate new intersection data.
			if (parentRect) {
				intersectionRect = computeRectIntersection(parentRect, intersectionRect);

				if (!intersectionRect) break;
			}
			parent = getParentNode(parent);
		}
		return intersectionRect;
	};

	/**
  * Returns the root rect after being expanded by the rootMargin value.
  * @return {Object} The expanded root rect.
  * @private
  */
	IntersectionObserver.prototype._getRootRect = function () {
		var rootRect;
		if (this.root) {
			rootRect = getBoundingClientRect(this.root);
		} else {
			// Use <html>/<body> instead of window since scroll bars affect size.
			var html = document.documentElement;
			var body = document.body;
			rootRect = {
				top: 0,
				left: 0,
				right: html.clientWidth || body.clientWidth,
				width: html.clientWidth || body.clientWidth,
				bottom: html.clientHeight || body.clientHeight,
				height: html.clientHeight || body.clientHeight
			};
		}
		return this._expandRectByRootMargin(rootRect);
	};

	/**
  * Accepts a rect and expands it by the rootMargin value.
  * @param {Object} rect The rect object to expand.
  * @return {Object} The expanded rect.
  * @private
  */
	IntersectionObserver.prototype._expandRectByRootMargin = function (rect) {
		var margins = this._rootMarginValues.map(function (margin, i) {
			return margin.unit == 'px' ? margin.value : margin.value * (i % 2 ? rect.width : rect.height) / 100;
		});
		var newRect = {
			top: rect.top - margins[0],
			right: rect.right + margins[1],
			bottom: rect.bottom + margins[2],
			left: rect.left - margins[3]
		};
		newRect.width = newRect.right - newRect.left;
		newRect.height = newRect.bottom - newRect.top;

		return newRect;
	};

	/**
  * Accepts an old and new entry and returns true if at least one of the
  * threshold values has been crossed.
  * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
  *    particular target element or null if no previous entry exists.
  * @param {IntersectionObserverEntry} newEntry The current entry for a
  *    particular target element.
  * @return {boolean} Returns true if a any threshold has been crossed.
  * @private
  */
	IntersectionObserver.prototype._hasCrossedThreshold = function (oldEntry, newEntry) {

		// To make comparing easier, an entry that has a ratio of 0
		// but does not actually intersect is given a value of -1
		var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
		var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1;

		// Ignore unchanged ratios
		if (oldRatio === newRatio) return;

		for (var i = 0; i < this.thresholds.length; i++) {
			var threshold = this.thresholds[i];

			// Return true if an entry matches a threshold or if the new ratio
			// and the old ratio are on the opposite sides of a threshold.
			if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
				return true;
			}
		}
	};

	/**
  * Returns whether or not the root element is an element and is in the DOM.
  * @return {boolean} True if the root element is an element and is in the DOM.
  * @private
  */
	IntersectionObserver.prototype._rootIsInDom = function () {
		return !this.root || containsDeep(document, this.root);
	};

	/**
  * Returns whether or not the target element is a child of root.
  * @param {Element} target The target element to check.
  * @return {boolean} True if the target element is a child of root.
  * @private
  */
	IntersectionObserver.prototype._rootContainsTarget = function (target) {
		return containsDeep(this.root || document, target);
	};

	/**
  * Adds the instance to the global IntersectionObserver registry if it isn't
  * already present.
  * @private
  */
	IntersectionObserver.prototype._registerInstance = function () {
		if (registry.indexOf(this) < 0) {
			registry.push(this);
		}
	};

	/**
  * Removes the instance from the global IntersectionObserver registry.
  * @private
  */
	IntersectionObserver.prototype._unregisterInstance = function () {
		var index = registry.indexOf(this);
		if (index != -1) registry.splice(index, 1);
	};

	/**
  * Returns the result of the performance.now() method or null in browsers
  * that don't support the API.
  * @return {number} The elapsed time since the page was requested.
  */
	function now() {
		return window.performance && performance.now && performance.now();
	}

	/**
  * Throttles a function and delays its execution, so it's only called at most
  * once within a given time period.
  * @param {Function} fn The function to throttle.
  * @param {number} timeout The amount of time that must pass before the
  *     function can be called again.
  * @return {Function} The throttled function.
  */
	function throttle(fn, timeout) {
		var timer = null;
		return function () {
			if (!timer) {
				timer = setTimeout(function () {
					fn();
					timer = null;
				}, timeout);
			}
		};
	}

	/**
  * Adds an event handler to a DOM node ensuring cross-browser compatibility.
  * @param {Node} node The DOM node to add the event handler to.
  * @param {string} event The event name.
  * @param {Function} fn The event handler to add.
  * @param {boolean} opt_useCapture Optionally adds the even to the capture
  *     phase. Note: this only works in modern browsers.
  */
	function addEvent(node, event, fn, opt_useCapture) {
		if (typeof node.addEventListener == 'function') {
			node.addEventListener(event, fn, opt_useCapture || false);
		} else if (typeof node.attachEvent == 'function') {
			node.attachEvent('on' + event, fn);
		}
	}

	/**
  * Removes a previously added event handler from a DOM node.
  * @param {Node} node The DOM node to remove the event handler from.
  * @param {string} event The event name.
  * @param {Function} fn The event handler to remove.
  * @param {boolean} opt_useCapture If the event handler was added with this
  *     flag set to true, it should be set to true here in order to remove it.
  */
	function removeEvent(node, event, fn, opt_useCapture) {
		if (typeof node.removeEventListener == 'function') {
			node.removeEventListener(event, fn, opt_useCapture || false);
		} else if (typeof node.detatchEvent == 'function') {
			node.detatchEvent('on' + event, fn);
		}
	}

	/**
  * Returns the intersection between two rect objects.
  * @param {Object} rect1 The first rect.
  * @param {Object} rect2 The second rect.
  * @return {?Object} The intersection rect or undefined if no intersection
  *     is found.
  */
	function computeRectIntersection(rect1, rect2) {
		var top = Math.max(rect1.top, rect2.top);
		var bottom = Math.min(rect1.bottom, rect2.bottom);
		var left = Math.max(rect1.left, rect2.left);
		var right = Math.min(rect1.right, rect2.right);
		var width = right - left;
		var height = bottom - top;

		return width >= 0 && height >= 0 && {
			top: top,
			bottom: bottom,
			left: left,
			right: right,
			width: width,
			height: height
		};
	}

	/**
  * Shims the native getBoundingClientRect for compatibility with older IE.
  * @param {Element} el The element whose bounding rect to get.
  * @return {Object} The (possibly shimmed) rect of the element.
  */
	function getBoundingClientRect(el) {
		var rect;

		try {
			rect = el.getBoundingClientRect();
		} catch (err) {
			// Ignore Windows 7 IE11 "Unspecified error"
			// https://github.com/w3c/IntersectionObserver/pull/205
		}

		if (!rect) return getEmptyRect();

		// Older IE
		if (!(rect.width && rect.height)) {
			rect = {
				top: rect.top,
				right: rect.right,
				bottom: rect.bottom,
				left: rect.left,
				width: rect.right - rect.left,
				height: rect.bottom - rect.top
			};
		}
		return rect;
	}

	/**
  * Returns an empty rect object. An empty rect is returned when an element
  * is not in the DOM.
  * @return {Object} The empty rect.
  */
	function getEmptyRect() {
		return {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			width: 0,
			height: 0
		};
	}

	/**
  * Checks to see if a parent element contains a child element (including inside
  * shadow DOM).
  * @param {Node} parent The parent element.
  * @param {Node} child The child element.
  * @return {boolean} True if the parent node contains the child node.
  */
	function containsDeep(parent, child) {
		var node = child;
		while (node) {
			if (node == parent) return true;

			node = getParentNode(node);
		}
		return false;
	}

	/**
  * Gets the parent node of an element or its host element if the parent node
  * is a shadow root.
  * @param {Node} node The node whose parent to get.
  * @return {Node|null} The parent node or null if no parent exists.
  */
	function getParentNode(node) {
		var parent = node.parentNode;

		if (parent && parent.nodeType == 11 && parent.host) {
			// If the parent is a shadow root, return the host element.
			return parent.host;
		}

		if (parent && parent.assignedSlot) {
			// If the parent is distributed in a <slot>, return the parent of a slot.
			return parent.assignedSlot.parentNode;
		}

		return parent;
	}

	// Exposes the constructors globally.
	window.IntersectionObserver = IntersectionObserver;
	window.IntersectionObserverEntry = IntersectionObserverEntry;
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!Array.prototype.find) {
	Object.defineProperty(Array.prototype, 'find', {
		value: function value(predicate) {
			// 1. Let O be ? ToObject(this value).
			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			var o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;

			// 3. If IsCallable(predicate) is false, throw a TypeError exception.
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}

			// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
			var thisArg = arguments[1];

			// 5. Let k be 0.
			var k = 0;

			// 6. Repeat, while k < len
			while (k < len) {
				// a. Let Pk be ! ToString(k).
				// b. Let kValue be ? Get(O, Pk).
				// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
				// d. If testResult is true, return kValue.
				var kValue = o[k];
				if (predicate.call(thisArg, kValue, k, o)) {
					return kValue;
				}
				// e. Increase k by 1.
				k++;
			}

			// 7. Return undefined.
			return undefined;
		},
		configurable: true,
		writable: true
	});
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if ('NodeList' in window && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Popup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Website's popup scripts.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module Popup
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _helpers = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Popup = exports.Popup = function () {
	/**
  * Cache data, make preparations and initialize popup scripts.
  */
	function Popup() {
		_classCallCheck(this, Popup);

		var self = this;
		this.state = {
			popup: null,
			animationInner: false,
			animationName: '',
			animatedElement: null,
			body: document.querySelector('body'),
			header: document.querySelector('header'),
			mainTag: document.querySelector('main')
		};

		document.addEventListener("DOMContentLoaded", function (event) {
			self.openModalWindow();
			self.closeModalWindow();
		});
	}

	_createClass(Popup, [{
		key: 'openModalWindow',
		value: function openModalWindow() {
			var self = this;
			var openBtn = document.querySelectorAll('.js-open-p');

			var _loop = function _loop(index) {
				var element = openBtn[index];
				element.addEventListener('click', function () {
					self.state.popup = document.querySelector('.' + element.getAttribute('data-open'));
					self.state.animationInner = self.state.popup.getAttribute('data-animate');

					if (self.state.animationInner === 'true') {

						self.state.animatedElement = self.state.popup.querySelector('[data-animation-name]');
						self.state.animationName = self.state.animatedElement.getAttribute('data-animation-name');

						setTimeout(function () {
							self.state.animatedElement.classList.add(self.state.animationName);
						}, 350);
					} else {
						self.state.animationInner = false;
					}

					if (self.state.popup) {
						(0, _helpers.fadeIn)(self.state.popup);
						self.fixScrollBody();
					}
				});
			};

			for (var index = 0; index < openBtn.length; index++) {
				_loop(index);
			}
		}
	}, {
		key: 'closeModalWindow',
		value: function closeModalWindow() {
			var self = this;
			var waitTime = void 0;
			var closeBtn = document.querySelectorAll('.js-close-popup');
			self.state.popup === '.success-popup' ? waitTime = 650 : waitTime = 350;

			for (var index = 0; index < closeBtn.length; index++) {
				var _element = closeBtn[index];
				_element.addEventListener('click', function () {
					self.state.animatedElement.classList.remove(self.state.animationName);
					setTimeout(function () {
						(0, _helpers.fadeOut)(self.state.popup);
						self.returnScrollBody();
					}, waitTime);
				});
			}
		}
	}, {
		key: 'fixScrollBody',
		value: function fixScrollBody() {
			var marginRight = window.innerWidth - this.state.body.offsetWidth;
			var paddingRight = window.innerWidth - this.state.body.offsetWidth;
			this.state.mainTag.style.paddingRight = paddingRight + 'px';
			this.state.header.style.paddingRight = paddingRight + 'px';
			this.state.body.style.overflow = 'hidden';
		}
	}, {
		key: 'returnScrollBody',
		value: function returnScrollBody() {
			this.state.body.style.overflow = '';
			this.state.mainTag.style.paddingRight = '';
			this.state.header.style.paddingRight = '';
		}
	}]);

	return Popup;
}();

/** Export initialized popup scripts by default */


exports.default = new Popup();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Form = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Website's form validation and submit scripts.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module Form
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Validators = __webpack_require__(8);

var _Rrd = __webpack_require__(9);

var _Rrd2 = _interopRequireDefault(_Rrd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = exports.Form = function () {
	function Form() {
		_classCallCheck(this, Form);

		var self = this;
		this.state = {
			formValid: false,
			currentForm: null,
			// apiHost: 'http://api.rrdoc.itt',	// host dev
			// origin: 'http://rrdoc.itt',
			apiHost: 'http://10.0.18.242:81', // host prod
			origin: 'http://10.0.18.242:80'
		};

		window.localStorage.setItem('didYouSeeOurLanding', true);
		document.cookie = 'authHeader="zxc"; path=/; max-age=-1';

		document.addEventListener("DOMContentLoaded", function (event) {
			self.submitForm();
		});
	}

	_createClass(Form, [{
		key: 'validateFields',
		value: function validateFields(fields) {
			for (var index = 0; index < fields.length; index++) {
				var _field = fields[index];
				var type = _field.getAttribute('name');
				switch (type) {
					case 'name':
						_Validators.Validator.validateName(_field);
						break;
					case 'email':
						_Validators.Validator.validateEmail(_field);
						break;
					case 'passwordLogin':
						_Validators.Validator.setValid(_field);
						break;
					case 'password':
						_Validators.Validator.validatePassword(_field);
						break;
					case 'privacy':
						_Validators.Validator.validatePrivacy(_field);
						break;
					case 'password-repeat':
						_Validators.Validator.validateConfirmPassword(fields[1], fields[2]);
						break;
					case 'phone':
						_Validators.Validator.validatePhone(_field, 7, 20);
						break;
					case 'messege':
						_Validators.Validator.validateMessege(_field);
						break;
					default:
						break;
				}
			}
			var fieldsArr = Array.prototype.slice.call(fields);

			function isValid(element, index, array) {
				return element.classList.contains('valid');
			}
			fieldsArr.every(isValid) === true ? this.formValid = true : this.formValid = false;
			if (this.formValid === true) {
				for (var _index = 0; _index < fieldsArr.length; _index++) {
					var element = fieldsArr[_index];
					var messege = element.parentNode.querySelector('.validate-message');
					messege.innerHTML = '';
				}
			}
		}
	}, {
		key: 'submitForm',
		value: function submitForm() {
			var _this = this;

			var $forms = document.querySelectorAll('.js-forms');
			for (var index = 0; index < $forms.length; index++) {
				var form = $forms[index];
				form.addEventListener('submit', function (event) {
					event.preventDefault();
					var btn = event.target.querySelector('button[type="submit"]');
					var fields = event.target.querySelectorAll('.js-validate');
					_this.validateFields(fields);
					if (_this.formValid === true) {
						btn.removeAttribute('disabled');
						var currentFormId = event.target.getAttribute('id');
						if (currentFormId === "callBackForm") {
							_this.sendFeedBack(fields, "callBackForm");
						} else if (currentFormId === "hasQuestion") {
							_this.sendFeedBack(fields, "hasQuestion");
						} else if (currentFormId === "login-form") {
							_this.login(fields);
						} else {
							_this.registration(fields);
						}
					}
				});
			}
		}
	}, {
		key: 'getCookie',
		value: function getCookie(name) {
			var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		}
	}, {
		key: 'sendFeedBack',
		value: function sendFeedBack(fields, mode) {
			_Rrd2.default.sendFeedBack(fields, mode);
		}
	}, {
		key: 'registration',
		value: function registration(fields) {
			_Rrd2.default.registration(fields);
		}
	}, {
		key: 'login',
		value: function login(fields) {
			_Rrd2.default.login(field);
		}
	}, {
		key: 'successModal',
		value: function successModal() {
			document.querySelector('.hideTrigger').click();
		}
	}]);

	return Form;
}();

/** Export initialized popup scripts by default */


exports.default = new Form();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = exports.Validator = function () {
	function Validator() {
		_classCallCheck(this, Validator);
	}

	_createClass(Validator, null, [{
		key: 'validateName',
		value: function validateName(firstName) {
			if (Validator.checkIfEmpty(firstName)) return;
			if (!Validator.checkIfOnlyLetters(firstName)) return;
			return true;
		}
		// static validateLastName(lastName) {
		// 	if (checkIfEmpty(lastName)) return;
		// 	if (checkIfOnlyLetters(lastName)) return;
		// 	return true;
		// }

	}, {
		key: 'validatePassword',
		value: function validatePassword(password) {
			var minLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
			var maxLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

			if (Validator.checkIfEmpty(password)) return;
			if (Validator.meetLength(password, minLength, maxLength)) return;
			if (!Validator.containsCharacters(password, 2)) return;

			return true;
		}
	}, {
		key: 'validatePrivacy',
		value: function validatePrivacy(field) {
			if (field.checked !== true) {
				Validator.setInvalid(field, 'Это обязательное поле');
				return;
			} else {
				Validator.setValid(field);
			}
			return true;
		}
	}, {
		key: 'validateConfirmPassword',
		value: function validateConfirmPassword(password, confirmPassword) {
			if (!password.classList.contains('valid')) {
				Validator.setInvalid(confirmPassword, 'Пароль должен быть валидным');
				return;
			}
			if (password.value !== confirmPassword.value) {
				Validator.setInvalid(confirmPassword, 'Пароли должны совпадать');
				return;
			} else {
				Validator.setValid(confirmPassword);
			}
			return true;
		}
	}, {
		key: 'validateEmail',
		value: function validateEmail(email) {
			if (Validator.checkIfEmpty(email)) return;
			if (Validator.containsCharacters(email, 5)) return;
			return true;
		}
	}, {
		key: 'validatePhone',
		value: function validatePhone(phone) {
			var minLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
			var maxLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

			if (Validator.checkIfEmpty(phone)) return;
			if (Validator.meetLength(phone, minLength, maxLength)) return;
			if (Validator.containsCharacters(phone, 6)) return;
			return true;
		}
	}, {
		key: 'validateMessege',
		value: function validateMessege(messege) {
			Validator.checkIfEmpty(messege);
			return true;
		}
	}, {
		key: 'checkIfEmpty',
		value: function checkIfEmpty(field) {
			if (Validator.isEmpty(field.value.trim())) {
				// set field invalid
				Validator.setInvalid(field, '\u042D\u0442\u043E \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u043B\u0435');
				return true;
			} else {
				// set field valid
				Validator.setValid(field);
				return false;
			}
		}
	}, {
		key: 'isEmpty',
		value: function isEmpty(value) {
			if (value === '') return true;
			return false;
		}
	}, {
		key: 'setValid',
		value: function setValid(field) {
			field.classList.remove('invalid');
			field.classList.add('valid');
			if (!field.name === 'privacy') {
				field.nextElementSibling.innerHTML = '';
			}
		}
	}, {
		key: 'checkIfOnlyLetters',
		value: function checkIfOnlyLetters(field) {
			if (/^[a-zA-Zа-яА-ЯёЁ ]+$/.test(field.value)) {
				Validator.setValid(field);
				return true;
			} else {
				Validator.setInvalid(field, '\u041F\u043E\u043B\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0431\u0443\u043A\u0432\u044B');
				return false;
			}
		}
	}, {
		key: 'meetLength',
		value: function meetLength(field, minLength, maxLength) {
			if (field.value.length >= minLength && field.value.length < maxLength) {
				Validator.setValid(field);
				return false;
			} else if (field.value.length < minLength) {
				Validator.setInvalid(field, '\u041F\u043E\u043B\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043A\u0430\u043A \u043C\u0438\u043D\u0438\u043C\u0443\u043C ' + minLength + ' \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432');
				return true;
			} else {
				Validator.setInvalid(field, '\u041F\u043E\u043B\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 \u0447\u0435\u043C ' + maxLength + ' \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432');
				return true;
			}
		}
	}, {
		key: 'containsCharacters',
		value: function containsCharacters(field, code) {
			var regEx = void 0;
			switch (code) {
				case 1:
					// letters
					regEx = /(?=.*[a-zA-Z])/g;
					return Validator.matchWithRegEx(regEx, field, 'Должен содержать как минимум 1 букву');
				case 2:
					// letter and numbers
					regEx = /(?=.*\d)(?=.*[a-zA-Z])/g;
					return Validator.matchWithRegEx(regEx, field, 'Должен содержать как минимум 1 букву и 1 цифру');
				case 3:
					// uppercase, lowercase and number
					regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
					return Validator.matchWithRegEx(regEx, field, 'Must contain at least one uppercase, one lowercase letter and one number');
				case 4:
					// uppercase, lowercase, number and special char
					regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
					return Validator.matchWithRegEx(regEx, field, 'Must contain at least one uppercase, one lowercase letter, one number and one special character');
				case 5:
					// Email pattern
					regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return Validator.matchWithRegEx(regEx, field, 'Должна быть валидная почта');
				case 6:
					// Phone pattern
					regEx = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
					return Validator.matchWithRegEx(regEx, field, 'Должен содержать только номер');
				default:
					return false;
			}
		}
	}, {
		key: 'matchWithRegEx',
		value: function matchWithRegEx(regEx, field, message) {
			if (field.value.match(regEx)) {
				Validator.setValid(field);
				return true;
			} else {
				Validator.setInvalid(field, message);
				return false;
			}
		}
	}]);

	return Validator;
}();

Validator.setInvalid = function (field, message) {
	field.classList.remove('valid');
	field.classList.add('invalid');
	if (field.name === 'privacy') {
		field.parentNode.lastChild.innerHTML = message;
	} else {
		field.nextElementSibling.innerHTML = message;
	}
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Website's common scripts (example).
 *
 * @module Rrd
 */

var Rrd = exports.Rrd = function () {
	function Rrd() {
		_classCallCheck(this, Rrd);

		var self = this;
		this.state = {
			authorized: false,

			// urls
			// apiHost: 'http://api.rrdoc.itt',	// host dev
			// origin: 'http://rrdoc.itt',
			// apiHost: 'https://api.rrdoc.ru',	// host prod
			// origin: 'https://rrdoc.ru',
			apiHost: 'http://10.0.18.242:81', // host prod
			origin: 'http://10.0.18.242:80',
			validToken: '/rest-auth/api-token-verify/'
		};

		// initialize after construction
		self.init();
	}

	/**
  * Initialize common scripts.
  */


	_createClass(Rrd, [{
		key: 'init',
		value: function init() {
			// this.state = this.checkAuth();
			this.setFlagSeeLanding();
			this.setAuthCookieForFeedback();
		}

		// checkAuth () {
		//   let tkn = this.getCookie('rrdtkn');
		//   if (tkn !== undefined) {
		//     let tknValid = this.checkValidToken(tkn);
		//     if (tknValid === true) {
		//       // this.startUpdateToken();
		//       return true;
		//     }
		//   }
		//   return false;
		// }

		// checkValidToken (tkn) {
		//   let _url = this.state.apiHost + this.state.validToken
		//   this.sendReqest('POST', _url, {token: tkn})
		// }

	}, {
		key: 'setAuthCookieForFeedback',
		value: function setAuthCookieForFeedback() {
			var _this = this;

			return new Promise(function (resolve) {
				if (_this.getCookie('authHeader') !== undefined) {
					// если токен есть
					resolve(_this.getCookie('authHeader')); // если уже есть токен
				} else {
					// если токена нет, то получить
					var $formdata = new FormData();
					$formdata = {
						email: 'demo@rrdoc.ru',
						password: 'mLxkElOQ9mmw'
					};
					var _url = _this.state.apiHost + "/rest-auth/login/";
					var request = new XMLHttpRequest();
					request.open("POST", _url);
					request.open("POST", _url);
					request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
					request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
					request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
					request.send(JSON.stringify($formdata));
					var self = _this;
					request.onload = function () {
						if (request.status === 200) {
							var _cookieHeader = 'authHeader=' + JSON.parse(request.responseText).token + ';path=/;max-age=3600'; // куки с новым токеном
							document.cookie = _cookieHeader;
							resolve(JSON.parse(request.responseText).token);
						}
					};
				}
			});
		}
	}, {
		key: 'sendFeedBack',
		value: function sendFeedBack(fields, mode) {
			var _this2 = this;

			this.setAuthCookieForFeedback().then(function (header) {
				var $formdata = new FormData();
				if (mode === "callBackForm") {
					$formdata = {
						title: 'ПОЗВОНИ МНЕ',
						text: fields[0].value
					};
				} else if (mode === "hasQuestion") {
					$formdata = {
						title: fields[1].value,
						text: "Имя обратившегося " + fields[0].value + "\n" + fields[2].value
					};
				}
				_this2.postFeedBack($formdata).then(function () {
					if (mode === "callBackForm") {
						document.querySelector('.hideTrigger').click();
					} else {
						document.querySelector('.hideTriggerFeedback').click();
					}
				});
			});
		}
	}, {
		key: 'postFeedBack',
		value: function postFeedBack(data) {
			var _this3 = this;

			return new Promise(function (resolve) {
				var _url = _this3.state.apiHost + '/api/v1/feedback/feed/';
				var request = new XMLHttpRequest();
				request.open("POST", _url);
				request.open("POST", _url);
				request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
				request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
				request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
				request.setRequestHeader('Authorization', 'Bearer ' + _this3.getCookie('authHeader'));
				request.send(JSON.stringify(data));
				var self = _this3;
				request.onload = function () {
					if (request.status === 200 || request.status === 201) {
						resolve();
						// self.successModal();
						// document.querySelector('.hideTriggerFeedback').click();
					}
				};
			});
		}
	}, {
		key: 'registration',
		value: function registration(fields) {
			var $formdata = new FormData();
			$formdata = {
				username: fields[0].value,
				email: fields[0].value,
				password1: fields[1].value,
				password2: fields[2].value,
				first_name: 'default',
				last_name: 'default',
				is_boss: false
			};
			var _url = this.state.apiHost + "/rest-auth/registration/";
			var request = new XMLHttpRequest();
			request.open("POST", _url);
			request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
			request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
			request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			request.send(JSON.stringify($formdata));
			var self = this;
			request.onload = function () {
				if (request.status === 201) {
					alert('Не забудьте подтвердить свою почту');
					var _link = self.state.origin + '/login';
					document.location.href = _link;
				} else {
					// alert('Не удлось зарегистрировать пользователя')
					var err = JSON.parse(request.responseText);
					console.log(err);
					var _errMessage = err.email[0] || err.password1[0] || err.username[0] || 'Не удалось зарегестрировать пользователя';
					Validator.setInvalid(fields[3], _errMessage);
				}
			};
			request.onerror = function (err) {
				// alert('Не удалось зарегистрировать пользователя')
				console.log(err);
				var _errMessage = err.email[0] || err.password1[0] || err.username[0] || 'Не удалось зарегестрировать пользователя';
				Validator.setInvalid(fields[3], _errMessage);
			};
		}
	}, {
		key: 'login',
		value: function login(fields) {
			var $formdata = new FormData();
			$formdata = {
				email: fields[0].value,
				password: fields[1].value
			};
			var _url = this.state.apiHost + "/rest-auth/login/";
			var request = new XMLHttpRequest();
			request.open("POST", _url);
			request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
			request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
			request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			request.send(JSON.stringify($formdata));
			var self = this;
			request.onload = function () {
				if (request.status === 200) {
					document.cookie = 'email="from@landing.com"; path=/; max-age=360'; // замена emai (может отстаться от демо-юзера и глядя на email основной клиент ставит флаг demoMode на true)
					document.cookie = 'rrdtkn=""; path=/; max-age=-1'; // на всякий случай удаление токена
					var _rrdtkn = 'rrdtkn=' + JSON.parse(request.responseText).token + ';path=/' + ';max-age=360'; // новый токен
					document.cookie = _rrdtkn; // установка токена
					var _link = self.state.origin;
					document.location.href = _link; // переход на основной клиент
				} else if (request.status === 400) {
					// alert('Не правильные логин или пароль')
					Validator.setInvalid(fields[1], 'Не верные логин или пароль');
				}
			};
			request.onerror = function (err) {
				console.log(err);
				alert('Не удалось войти');
			};
		}
	}, {
		key: 'sendReqest',
		value: function sendReqest(method, url, data) {
			var request = new XMLHttpRequest();
			request.open(method, url);
			request = this.setHeaders(request);
			request.send(JSON.stringify(data));
			return request;
		}
	}, {
		key: 'setHeaders',
		value: function setHeaders(request) {
			request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
			request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
			request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			return request;
		}
	}, {
		key: 'getCookie',
		value: function getCookie(name) {
			var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		}
	}, {
		key: 'setFlagSeeLanding',
		value: function setFlagSeeLanding() {
			window.localStorage.setItem('didYouSeeOurLanding', true);
			document.cookie = 'authHeader="zxc"; path=/; max-age=-1';
		}
	}]);

	return Rrd;
}();

/** Export initialized common scripts by default */


exports.default = new Rrd();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Home page scripts.
 *
 * @module Home
 */
var Home = function () {
	/**
  * Cache data, make preparations and initialize page scripts.
  */
	function Home() {
		_classCallCheck(this, Home);

		// initialize after construction
		this.init();
	}

	/**
  * Initialize Home page scripts.
  */


	_createClass(Home, [{
		key: "init",
		value: function init() {}
	}]);

	return Home;
}();

exports.default = Home;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map