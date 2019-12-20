/**
 * Website's common scripts (example).
 *
 * @module Rrd
 */

export class Rrd {
	constructor() {
		let self = this;
		this.state = {
      authorized: false,
      
      // urls
      // apiHost: 'http://api.rrdoc.itt',	// host dev
			// origin: 'http://rrdoc.itt',
			// apiHost: 'https://api.rrdoc.ru',	// host prod
      // origin: 'https://rrdoc.ru',
			apiHost: 'http://10.0.18.242:81',	// host prod
      origin: 'http://10.0.18.242:80',
      validToken: '/rest-auth/api-token-verify/'
		};

		// initialize after construction
    self.init();
	}

	/**
	 * Initialize common scripts.
	 */
	init() {
    // this.state = this.checkAuth();
    this.setFlagSeeLanding();
    this.setAuthCookieForFeedback()
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

  setAuthCookieForFeedback () {
		return new Promise(resolve => {
			if (this.getCookie('authHeader') !== undefined) {	// если токен есть
				resolve(this.getCookie('authHeader'))	// если уже есть токен
			} else { // если токена нет, то получить
				let $formdata = new FormData();
				$formdata = {
					email: 'demo@rrdoc.ru',
					password: 'mLxkElOQ9mmw'
				};
				let _url = this.state.apiHost + "/rest-auth/login/";
				let request = new XMLHttpRequest();
				request.open("POST", _url)
				request.open("POST", _url);
				request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
				request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
				request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
				request.send(JSON.stringify($formdata));
				let self = this;
				request.onload = function () {
					if (request.status === 200) {
						let _cookieHeader = 'authHeader=' + JSON.parse(request.responseText).token + ';path=/;max-age=3600';	// куки с новым токеном
						document.cookie = (_cookieHeader)
						resolve(JSON.parse(request.responseText).token)
					}
				}
			}
		})
  }
  
  sendFeedBack (fields, mode) {
		this.setAuthCookieForFeedback().then(header => {
			let $formdata = new FormData();
			if (mode === "callBackForm") {
				$formdata = {
					title: 'ПОЗВОНИ МНЕ',
					text: fields[0].value
				};
			} else if (mode === "hasQuestion") {
				$formdata = {
					title: fields[1].value,
					text: "Имя обратившегося " + fields[0].value + "\n" + fields[2].value
				}
			}
			this.postFeedBack($formdata).then(function () {
				if (mode === "callBackForm") {
					document.querySelector('.hideTrigger').click();
				} else {
					document.querySelector('.hideTriggerFeedback').click();
				}
			});
		})
  }
  
  postFeedBack (data) {
		return new Promise(resolve => {
			let _url = this.state.apiHost + '/api/v1/feedback/feed/'
			let request = new XMLHttpRequest();
			request.open("POST", _url)
			request.open("POST", _url);
			request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
			request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
			request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			request.setRequestHeader('Authorization', 'Bearer ' + this.getCookie('authHeader'));
			request.send(JSON.stringify(data));
			let self = this;
			request.onload = function () {
				if (request.status === 200 || request.status === 201) {
					resolve()
					// self.successModal();
					// document.querySelector('.hideTriggerFeedback').click();
				}
			}
		})
  }
  
  registration (fields) {
		let $formdata = new FormData();
		$formdata = {
			username: fields[0].value,
			email: fields[0].value,
			password1: fields[1].value,
			password2: fields[2].value,
			first_name: 'default',
			last_name: 'default',
			is_boss: false
		}
		let _url = this.state.apiHost + "/rest-auth/registration/";
		let request = new XMLHttpRequest();
		request.open("POST", _url);
		request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
		request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
		request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		request.send(JSON.stringify($formdata));
		let self = this;
		request.onload = function () {
			if (request.status === 201) {
				alert('Не забудьте подтвердить свою почту');
				let _link = self.state.origin + '/login';
				document.location.href = _link;
			} else {
				// alert('Не удлось зарегистрировать пользователя')
				let err = JSON.parse(request.responseText)
				console.log(err)
				let _errMessage = err.email[0] || err.password1[0] || err.username[0] || 'Не удалось зарегестрировать пользователя'
				Validator.setInvalid(fields[3], _errMessage)
			}
		}
		request.onerror = function (err) {
			// alert('Не удалось зарегистрировать пользователя')
			console.log(err)
			let _errMessage = err.email[0] || err.password1[0] || err.username[0] || 'Не удалось зарегестрировать пользователя'
			Validator.setInvalid(fields[3], _errMessage)
		}
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

  sendReqest (method, url, data) {
    let request = new XMLHttpRequest();
    request.open(method, url);
    request = this.setHeaders(request);
    request.send(JSON.stringify(data));
    return request;
  }

  setHeaders (request) {
    request.setRequestHeader('Accept', 'application/json, text/plain, application/zip, */*');
		request.setRequestHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    return request;
  }

  getCookie (name) {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

  setFlagSeeLanding () {
    window.localStorage.setItem('didYouSeeOurLanding', true);
		document.cookie = ('authHeader="zxc"; path=/; max-age=-1');
  }
}

/** Export initialized common scripts by default */
export default new Rrd();