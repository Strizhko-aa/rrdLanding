/**
 * Website's common scripts (example).
 *
 * @module Common
 */
import {
	easings,
	// once,
	slideUp,
	slideDown,
	Resp,
	fadeIn
} from '../modules/dev/_helpers';
require('../modules/polyfils/IntersectionObserver');
require('../modules/polyfils/Find');
require('../modules/polyfils/forEach');
export class Common {
	/**
	 * Cache data, make preparations and initialize common scripts.
	 */
	constructor() {
		let self = this;
		this.state = {
			scrollTrigger: null,
			anchorLinks: document.querySelectorAll('.js-links'),
			activeBlock: null,
			blockBreakpoints: [],
			sectionEls: []

		};

		// initialize after construction
		document.addEventListener("DOMContentLoaded", (event) => {
			self.init();
		});
	}

	/**
	 * Initialize common scripts.
	 */
	init() {
		this.fixHeader();
		this.toogleMenu();
		this.scrollInvoke();
		this.resizeCheck();
		this.inputFocus();
		this.openTabs();
		this.getActiveSceen();
		this.selectTarif();
	}

	resizeCheck() {
		let self = this;
		let resized;
		window.addEventListener('resize', () => {
			clearTimeout(resized);
			resized = setTimeout(() => {
				doneResizing();
			}, 300);
		})

		function doneResizing() {
			Resp.isTablet === true ? self.state.scrollTrigger = 0 : self.state.scrollTrigger = 39;
		}
	}

	fixHeader() {
		let self = this;
		const header = document.querySelector('.js-header');
		Resp.isTablet === true ? self.state.scrollTrigger = 0 : self.state.scrollTrigger = 39;

		window.onscroll = () => {
			let scrolled = window.pageYOffset || document.documentElement.scrollTop;

			if (scrolled > self.state.scrollTrigger) {
				header.classList.add("fixed");
			} else {
				header.classList.remove("fixed");
			}
		};
	}

	toogleMenu() {
		const burger = document.querySelector('.js-burger');
		const mainMenu = document.querySelector(".main-nav");
		burger.addEventListener('click', () => {
			burger.classList.toggle("is-open");
			mainMenu.classList.toggle("menu-open");
		});
	}

	selectTarif () {
		const prises = document.querySelectorAll('.choose');
		for (let index = 0; index < prises.length; index++) {
			let elem = prises[index];
			elem.addEventListener('click', () => {
				localStorage.setItem('wantToSeeTariffs', true);
				// host
				window.location.href = 'http://10.0.18.242:80/profile'
				// window.location.href = 'http://rrdoc.itt/profile'
				// window.location.href = 'http://localhost:8088/profile'
			});
		}
	}

	scrollTo(destination, duration = 200, easing = 'linear', callback) {

		const start = window.pageYOffset;
		const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

		const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
		const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
		const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop - 100;
		const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

		if ('requestAnimationFrame' in window === false) {
			window.scroll(0, destinationOffsetToScroll);
			if (callback) {
				callback();
			}
			return;
		}

		function scroll() {
			const now = 'now' in window.performance ? performance.now() : new Date().getTime();
			const time = Math.min(1, ((now - startTime) / duration));
			const timeFunction = easings[easing](time);
			window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

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

	scrollInvoke() {
		for (let index = 0; index < this.state.anchorLinks.length; index++) {
			const link = this.state.anchorLinks[index];
			link.addEventListener('click', (e) => {
				let scrollTargetEl = e.target.getAttribute('data-to');
				this.scrollTo(
					document.getElementById(scrollTargetEl),
					1500,
					'easeOutQuint',
					() => {
						if (document.querySelector('.activeAnchor')) {
							document.querySelector('.activeAnchor').classList.remove('activeAnchor');
						}
						e.target.parentNode.classList.add('activeAnchor');
						let openMenu = document.querySelector('.menu-open');
						let openBurger = document.querySelector('.js-burger')
						if (openMenu) {
							openBurger.click();
						}
					}
				);
			});
		}
	}

	inputFocus() {
		const formInputs = document.querySelectorAll('.js-input');
		for (let index = 0; index < formInputs.length; index++) {
			const input = formInputs[index];
			input.addEventListener('focus', () => {
				input.parentNode.classList.add('is-focused');
			});
			input.addEventListener('blur', () => {
				if (input.value.length === 0) {
					input.parentNode.classList.remove('is-focused');
				}
			});

			if (input.value !== '') {
				input.parentNode.classList.add('is-focused');
			}
		}
	}

	openTabs() {
		const btns = document.querySelectorAll('.js-open-tab');

		for (let index = 0; index < btns.length; index++) {
			const btn = btns[index];
			let hiddenEl = btn.nextElementSibling;
			let controlEl = btn;
			if (hiddenEl.length < 1 || controlEl.length < 1) {
				return;
			}
			btn.addEventListener('click', (e) => {
				btn.classList.toggle('is-open');
				let elementClasses = (" " + hiddenEl.className + " ").replace(/[\n\t\r]/g, " "),
					removeClass = "slide-down",
					addClass = "slide-up",
					isShowing = elementClasses.indexOf(" " + removeClass + " ") > -1;

				if (!isShowing) {
					removeClass = [addClass, addClass = removeClass][0];
				}
				hiddenEl.className = (elementClasses.replace(" " + removeClass + " ", "") + " " + addClass + " ").trim();

				return false;
			});
		}
	}

	getActiveSceen() {
		let self = this;
		const sections = document.querySelectorAll('.js-section');
		const leaveTrigger = document.querySelectorAll('.js-leave');
		this.calculateAdjustedBlockPositions();
		this.initObserver();
	}

	calculateAdjustedBlockPositions() {
		this.state.sectionEls = Array.prototype.slice.call(document.querySelectorAll('.js-section'));
		const viewportHeight = window.innerHeight;
		const docHeight = document.body.offsetHeight;
		const scrollTop = document.documentElement.scrollTop;
		this.state.blockBreakpoints = this.state.sectionEls.map(el => {
			const top = el.getBoundingClientRect().top;
			const oldOffset = top + scrollTop;
			return oldOffset - oldOffset * (viewportHeight / docHeight);
		})
	}

	initObserver() {
		const options = {
			threshold: [...Array(10)].map((el, index) => .1 * index),
			bottom: 500
		}

		const handleIntersectionEvent = (entries) => {
			const scrollTop = document.documentElement.scrollTop;
			this.state.blockBreakpoints.find((bp, index) => {
				// console.log(bp, index)
				if (Math.abs(scrollTop - bp) < 100) {
					this.state.activeBlock = index;
					this.state.anchorLinks.forEach(link => {
						link.parentNode.classList.remove('activeAnchor');
					})
					this.state.anchorLinks[this.state.activeBlock].parentNode.classList.add('activeAnchor');
				}
			})
		}

		const observer = new IntersectionObserver(handleIntersectionEvent, options);

		this.state.sectionEls.forEach(element => observer.observe(element));
	}
}

/** Export initialized common scripts by default */
export default new Common();