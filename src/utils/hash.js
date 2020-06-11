import crypto from 'crypto';
import isString from './is-string';

const generateInternal = (value, salt) => {
	if (!salt) {
		salt = crypto.randomBytes(64);
	}

	const hash = crypto.pbkdf2Sync(value, salt, 10000, 64, 'sha512');
	return Buffer.concat([salt, hash]).toString('base64');
};

const generate = (value) => {
	if (!isString(value)) {
		throw new TypeError('Argument `value` is not a string');
	}

	try {
		return generateInternal(value);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const compare = (value, hashValue) => {
	if (!isString(value)) {
		throw new TypeError('Argument `value` is not a string');
	}

	if (!isString(hashValue)) {
		throw new TypeError('Argument `hashValue` is not a string');
	}

	let newHash;

	try {
		const salt = Buffer.from(hashValue, 'base64').slice(0, 64);
		newHash = generateInternal(value, salt);
	} catch (_) {
		return false;
	}

	if (hashValue === newHash) {
		return true;
	}

	return false;
};

export default {
	generate,
	compare,
};
