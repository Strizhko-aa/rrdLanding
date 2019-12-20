/**
 * Website's form validation and submit scripts.
 *
 * @module Form
 */

import {
	Validator
} from './Validators';
import Rrd from './Rrd';
export class Form {

	constructor() {
		let self = this;
		this.state = {
			formValid: false,
			currentForm: null,
			// apiHost: 'http://api.rrdoc.itt',	// host dev
			// origin: 'http://rrdoc.itt',
			apiHost: 'http://10.0.18.242:81',	// host prod
			origin: 'http://10.0.18.242:80'
		};

		window.localStorage.setItem('didYouSeeOurLanding', true);
		document.cookie = ('authHeader="zxc"; path=/; max-age=-1')

		document.addEventListener("DOMContentLoaded", (event) => {
			self.submitForm();
		});
	}

	validateFields(fields) {
		for (let index = 0; index < fields.length; index++) {
			const field = fields[index];
			let type = field.getAttribute('name');
			switch (type) {
				case 'name':
					Validator.validateName(field);
					break;
				case 'email':
					Validator.validateEmail(field);
					break;
				case 'passwordLogin':
					Validator.setValid(field)
					break;
				case 'password':
					Validator.validatePassword(field);
					break;
				case 'privacy':
					Validator.validatePrivacy(field);
					break;
				case 'password-repeat':
					Validator.validateConfirmPassword(fields[1], fields[2]);
					break;
				case 'phone':
					Validator.validatePhone(field, 7, 20);
					break;
				case 'messege':
					Validator.validateMessege(field);
					break;
				default:
					break;
			}
		}
		let fieldsArr = Array.prototype.slice.call(fields);

		function isValid(element, index, array) {
			return element.classList.contains('valid');
		}
		fieldsArr.every(isValid) === true ? this.formValid = true : this.formValid = false;
		if (this.formValid === true) {
			for (let index = 0; index < fieldsArr.length; index++) {
				const element = fieldsArr[index];
				let messege = element.parentNode.querySelector('.validate-message');
				messege.innerHTML = '';
			}
		}
	}


	submitForm () {
		let $forms = document.querySelectorAll('.js-forms');
		for (let index = 0; index < $forms.length; index++) {
			const form = $forms[index];
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				let btn = event.target.querySelector('button[type="submit"]');
				let fields = event.target.querySelectorAll('.js-validate');
				this.validateFields(fields);
				if (this.formValid === true) {
					btn.removeAttribute('disabled');
					let currentFormId = event.target.getAttribute('id');
					if (currentFormId === "callBackForm") {
						this.sendFeedBack(fields, "callBackForm");
					} else if (currentFormId === "hasQuestion") {
						this.sendFeedBack(fields, "hasQuestion");
					} else if (currentFormId === "login-form") {
						this.login(fields)
					} else {
						this.registration(fields)
					}
				}
			});
		}
	}

	getCookie (name) {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	sendFeedBack (fields, mode) {
		Rrd.sendFeedBack(fields, mode);
	}

	registration (fields) {
		Rrd.registration(fields);
	}

	login (fields) {
		Rrd.login(field)
	}

	successModal() {
		document.querySelector('.hideTrigger').click();
	}
}

/** Export initialized popup scripts by default */
export default new Form();