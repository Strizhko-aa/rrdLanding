export class Validator {
	constructor() {}
	static validateName(firstName) {
		if (Validator.checkIfEmpty(firstName)) return;
		if (!Validator.checkIfOnlyLetters(firstName)) return;
		return true;
	}
	// static validateLastName(lastName) {
	// 	if (checkIfEmpty(lastName)) return;
	// 	if (checkIfOnlyLetters(lastName)) return;
	// 	return true;
	// }
	static validatePassword(password, minLength = 8, maxLength = 20) {
		if (Validator.checkIfEmpty(password)) return;
		if (Validator.meetLength(password, minLength, maxLength)) return;
		if (!Validator.containsCharacters(password, 2)) return;
		
		return true;
	}

	static validatePrivacy(field) {
		if (field.checked !== true) {
			Validator.setInvalid(field, 'Это обязательное поле');
			return;
		} else {
			Validator.setValid(field);
		}
		return true;
	}
	static validateConfirmPassword(password, confirmPassword) {
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
	static validateEmail(email) {
		if (Validator.checkIfEmpty(email)) return;
		if (Validator.containsCharacters(email, 5)) return;
		return true;
	}
	static validatePhone(phone, minLength = 20, maxLength = 20) {
		if (Validator.checkIfEmpty(phone)) return;
		if (Validator.meetLength(phone, minLength, maxLength)) return;
		if (Validator.containsCharacters(phone, 6)) return;
		return true;
	}
	static validateMessege(messege) {
		Validator.checkIfEmpty(messege);
		return true;
	}

	static checkIfEmpty(field) {
		if (Validator.isEmpty(field.value.trim())) {
			// set field invalid
			Validator.setInvalid(field, `Это обязательное поле`);
			return true;
		} else {
			// set field valid
			Validator.setValid(field);
			return false;
		}
	}

	static isEmpty(value) {
		if (value === '') return true;
		return false;
	}
	static setInvalid = (field, message) => {
		field.classList.remove('valid');
		field.classList.add('invalid');
		if (field.name === 'privacy') {
			field.parentNode.lastChild.innerHTML = message;
		} else {
			field.nextElementSibling.innerHTML = message;
		}
	}
	static setValid(field) {
		field.classList.remove('invalid');
		field.classList.add('valid');
		if (!field.name === 'privacy') {
			field.nextElementSibling.innerHTML = '';
		}
	}
	static checkIfOnlyLetters(field) {
		if (/^[a-zA-Zа-яА-ЯёЁ ]+$/.test(field.value)) {
			Validator.setValid(field);
			return true;
		} else {
			Validator.setInvalid(field, `Поле должно содержать только буквы`);
			return false;
		}
	}
	static meetLength(field, minLength, maxLength) {
		if (field.value.length >= minLength && field.value.length < maxLength) {
			Validator.setValid(field);
			return false;
		} else if (field.value.length < minLength) {
			Validator.setInvalid(
				field,
				`Поле должно содержать как минимум ${minLength} символов`
			);
			return true;
		} else {
			Validator.setInvalid(
				field,
				`Поле должно содержать меньше чем ${maxLength} символов`
			);
			return true;
		}
	}
	static containsCharacters(field, code) {
		let regEx;
		switch (code) {
			case 1:
				// letters
				regEx = /(?=.*[a-zA-Z])/g;
				return Validator.matchWithRegEx(regEx, field, 'Должен содержать как минимум 1 букву');
			case 2:
				// letter and numbers
				regEx = /(?=.*\d)(?=.*[a-zA-Z])/g;
				return Validator.matchWithRegEx(
					regEx,
					field,
					'Должен содержать как минимум 1 букву и 1 цифру'
				);
			case 3:
				// uppercase, lowercase and number
				regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
				return Validator.matchWithRegEx(
					regEx,
					field,
					'Must contain at least one uppercase, one lowercase letter and one number'
				);
			case 4:
				// uppercase, lowercase, number and special char
				regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
				return Validator.matchWithRegEx(
					regEx,
					field,
					'Must contain at least one uppercase, one lowercase letter, one number and one special character'
				);
			case 5:
				// Email pattern
				regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return Validator.matchWithRegEx(regEx, field, 'Должна быть валидная почта');
			case 6:
				// Phone pattern
				regEx = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
				return Validator.matchWithRegEx(
					regEx,
					field,
					'Должен содержать только номер'
				);
			default:
				return false;
		}
	}

	static matchWithRegEx(regEx, field, message) {
		if (field.value.match(regEx)) {
			Validator.setValid(field);
			return true;
		} else {
			Validator.setInvalid(field, message);
			return false;
		}
	}
}