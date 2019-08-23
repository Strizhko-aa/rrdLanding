/**
 * Website's popup scripts.
 *
 * @module Popup
 */
import {
	fadeIn,
	fadeOut
} from '../modules/dev/_helpers';
export class Popup {
	/**
	 * Cache data, make preparations and initialize popup scripts.
	 */
	constructor() {
		const self = this;
		this.state = {
			popup: null,
			animationInner: false,
			animationName: '',
			animatedElement: null,
			body: document.querySelector('body'),
			header: document.querySelector('header'),
			mainTag: document.querySelector('main')
		};

		document.addEventListener("DOMContentLoaded", (event) => {
			self.openModalWindow();
			self.closeModalWindow();
		});
	}

	openModalWindow() {
		let self = this;
		let openBtn = document.querySelectorAll('.js-open-p');

		for (let index = 0; index < openBtn.length; index++) {
			const element = openBtn[index];
			element.addEventListener('click', () => {
				self.state.popup = document.querySelector(`.${element.getAttribute('data-open')}`);
				self.state.animationInner = self.state.popup.getAttribute('data-animate');

				if (self.state.animationInner === 'true') {

					self.state.animatedElement = self.state.popup.querySelector('[data-animation-name]');
					self.state.animationName = self.state.animatedElement.getAttribute('data-animation-name');

					setTimeout(() => {
						self.state.animatedElement.classList.add(self.state.animationName);
					}, 350);

				} else {
					self.state.animationInner = false;
				}

				if (self.state.popup) {
					fadeIn(self.state.popup);
					self.fixScrollBody();
				}
			})
		}
	}

	closeModalWindow() {
		let self = this;
		let waitTime;
		let closeBtn = document.querySelectorAll('.js-close-popup');
		self.state.popup === '.success-popup' ? waitTime = 650 : waitTime = 350;

		for (let index = 0; index < closeBtn.length; index++) {
			const element = closeBtn[index];
			element.addEventListener('click', () => {
				self.state.animatedElement.classList.remove(self.state.animationName);
				setTimeout(() => {
					fadeOut(self.state.popup);
					self.returnScrollBody();
				}, waitTime);
			})
		}
	}

	fixScrollBody() {
		let marginRight = window.innerWidth - this.state.body.offsetWidth;
		let paddingRight = (window.innerWidth - this.state.body.offsetWidth);
		this.state.mainTag.style.paddingRight = `${paddingRight}px`;
		this.state.header.style.paddingRight = `${paddingRight}px`;
		this.state.body.style.overflow = 'hidden';
	}

	returnScrollBody() {
		this.state.body.style.overflow = '';
		this.state.mainTag.style.paddingRight = '';
		this.state.header.style.paddingRight = '';
	}
}

/** Export initialized popup scripts by default */
export default new Popup();