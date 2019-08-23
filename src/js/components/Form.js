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
			apiHost: 'https://api.rrdoc.ru',	// host prod
			origin: 'https://rrdoc.ru'
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

	// setAuthCookieForFeedback () {
	// 	return new Promise(resolve => {
	// 		if (this.getCookie('authHeader') !== undefined) {	// если токен есть
	// 			resolve(this.getCookie('authHeader'))	// если уже есть токен
	// 		} else { // если токена нет, то получить
	// 			let $formdata = new FormData();
	// 			$formdata = {
	// 				email: 'demo@rrdoc.ru',
	// 				password: 'mLxkElOQ9mmw'
	// 			};
	// 			let _url = this.state.apiHost + "/rest-auth/login/";
	// 			let request = new XMLHttpRequest();
	// 			request.open("POST", _url)
	// 			request.open("POST", _url);
	// 			request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
	// 			request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
	// 			request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	// 			request.send(JSON.stringify($formdata));
	// 			let self = this;
	// 			request.onload = function () {
	// 				if (request.status === 200) {
	// 					let _cookieHeader = 'authHeader=' + JSON.parse(request.responseText).token + ';path=/';	// куки с новым токеном
	// 					document.cookie = (_cookieHeader)
	// 					resolve(JSON.parse(request.responseText).token)
	// 				}
	// 			}
	// 		}
	// 	})
	// }


	getCookie (name) {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	sendFeedBack (fields, mode) {
		Rrd.sendFeedBack(fields, mode);
		// this.setAuthCookieForFeedback().then(header => {
		// 	let $formdata = new FormData();
		// 	if (mode === "callBackForm") {
		// 		$formdata = {
		// 			title: 'ПОЗВОНИ МНЕ',
		// 			text: fields[0].value
		// 		};
		// 	} else if (mode === "hasQuestion") {
		// 		$formdata = {
		// 			title: fields[1].value,
		// 			text: "Имя обратившегося " + fields[0].value + "\n" + fields[2].value
		// 		}
		// 	}
		// 	this.postFeedBack($formdata).then(function () {
		// 		if (mode === "callBackForm") {
		// 			document.querySelector('.hideTrigger').click();
		// 		} else {
		// 			document.querySelector('.hideTriggerFeedback').click();
		// 		}
		// 	});
		// })
	}

	// postFeedBack (data) {
	// 	return new Promise(resolve => {
	// 		let _url = this.state.apiHost + '/api/v1/feedback/feed/'
	// 		let request = new XMLHttpRequest();
	// 		request.open("POST", _url)
	// 		request.open("POST", _url);
	// 		request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
	// 		request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
	// 		request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	// 		request.setRequestHeader('Authorization', 'Bearer ' + this.getCookie('authHeader'));
	// 		request.send(JSON.stringify(data));
	// 		let self = this;
	// 		request.onload = function () {
	// 			if (request.status === 200 || request.status === 201) {
	// 				resolve()
	// 				// self.successModal();
	// 				// document.querySelector('.hideTriggerFeedback').click();
	// 			}
	// 		}
	// 	})
	// }

	registration (fields) {
		Rrd.registration(fields);
		// let $formdata = new FormData();
		// $formdata = {
		// 	username: fields[0].value,
		// 	email: fields[0].value,
		// 	password1: fields[1].value,
		// 	password2: fields[2].value,
		// 	first_name: 'default',
		// 	last_name: 'default',
		// 	is_boss: false
		// }
		// let _url = this.state.apiHost + "/rest-auth/registration/";
		// let request = new XMLHttpRequest();
		// request.open("POST", _url);
		// request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
		// request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
		// request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		// request.send(JSON.stringify($formdata));
		// let self = this;
		// request.onload = function () {
		// 	if (request.status === 201) {
		// 		alert('Не забудьте подтвердить свою почту');
		// 		let _link = self.state.origin + '/login';
		// 		document.location.href = _link;
		// 	} else {
		// 		// alert('Не удлось зарегистрировать пользователя')
		// 		let err = JSON.parse(request.responseText)
		// 		console.log(err)
		// 		let _errMessage = err.email[0] || err.password1[0] || err.username[0] || 'Не удалось зарегестрировать пользователя'
		// 		Validator.setInvalid(fields[3], _errMessage)
		// 	}
		// }
		// request.onerror = function (err) {
		// 	// alert('Не удалось зарегистрировать пользователя')
		// 	console.log(err)
		// 	let _errMessage = err.email[0] || err.password1[0] || err.username[0] || 'Не удалось зарегестрировать пользователя'
		// 	Validator.setInvalid(fields[3], _errMessage)
		// }
	}

	login (fields) {
		let $formdata = new FormData();
		$formdata = {
			email: fields[0].value,
			password: fields[1].value
		}
		let _url = this.state.apiHost + "/rest-auth/login/";
		let request = new XMLHttpRequest();
		request.open("POST", _url);
		request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
		request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
		request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		request.send(JSON.stringify($formdata));
		let self = this;
		request.onload = function () {
			if (request.status === 200) {
				document.cookie = ('email="from@landing.com"; path=/; max-age=360')	// замена emai (может отстаться от демо-юзера и глядя на email основной клиент ставит флаг demoMode на true)
				document.cookie = ('rrdtkn=""; path=/; max-age=-1')	// на всякий случай удаление токена
				let _rrdtkn = 'rrdtkn=' + JSON.parse(request.responseText).token + ';path=/' + ';max-age=360';	// новый токен
				document.cookie = (_rrdtkn);	// установка токена
				let _link = self.state.origin;
				document.location.href = _link;	// переход на основной клиент

			} else if (request.status === 400) {
				// alert('Не правильные логин или пароль')
				Validator.setInvalid(fields[1], 'Не верные логин или пароль')
			}
		}
		request.onerror = function (err) {
			console.log(err)
			alert('Не удалось войти')
		}
	}

	successModal() {
		document.querySelector('.hideTrigger').click();
	}
}

/** Export initialized popup scripts by default */
export default new Form();