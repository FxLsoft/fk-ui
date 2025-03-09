import JSEncrypt from 'jsencrypt-ext';

const VITE_PUBLIC_KEY =
	'-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqro2GD6yEhGe1OYyygGviWOsesR3aOzXxnbcV4Q8allJiX3p2VqStIYb6PfrsCr4tdq5kt52QiaZcR3IEMnUptGH4PwWaaq9oD5FmYCi0+q/DrEJr3h0Npqno0oQBweXDyfr7Eb9BwDshmCp8KdefpwnVErPNungeiKaIH9ZBoQIDAQAB-----END PUBLIC KEY-----';

const pubKey = VITE_PUBLIC_KEY; // 分段加密

let encryptor;

function encrypt(string: string) {
	if (!encryptor) {
		encryptor = new JSEncrypt();
	}
	let subStr = '',
		encryptedString = '';
	const maxLength = 117;
	let subStart = 0,
		subEnd = 0;
	let bitLen = 0,
		tmpPoint = 0;
	for (let i = 0, len = string.length; i < len; i++) {
		// js 是使用 Unicode 编码的，每个字符所占用的字节数不同
		const charCode = string.charCodeAt(i);
		if (charCode <= 0x007f) {
			bitLen += 1;
		} else if (charCode <= 0x07ff) {
			bitLen += 2;
		} else if (charCode <= 0xffff) {
			bitLen += 3;
		} else {
			bitLen += 4;
		}
		// 字节数到达上限，获取子字符串加密并追加到总字符串后，更新下一个字符串起始位置及字节计算。
		if (bitLen > maxLength) {
			subStr = string.substring(subStart, subEnd);
			encryptedString += encryptor.encrypt(subStr);
			subStart = subEnd;
			bitLen = bitLen - tmpPoint;
		} else {
			subEnd = i + 1;
			tmpPoint = bitLen;
		}
	}
	// 不够上限数量最后加密一次，合并加密后的字符串
	subStr = string.substring(subStart);
	encryptedString += encryptor.encrypt(subStr);
	return encryptedString;
}

// 对象转换URL
function urlEncode(obj: Record<string, any>) {
	// 拼接参数
	const tempArray = [];
	for (const item in obj) {
		const value = obj[item] instanceof Object ? JSON.stringify(obj[item]) : obj[item];
		tempArray.push(`${item}=${encodeURIComponent(value)}`);
	}
	return tempArray.join('&');
}
export function setEncrypt(params: Record<string, any>) {
	if (!encryptor) {
		encryptor = new JSEncrypt();
	}
	const url = urlEncode(params);
	encryptor.setPublicKey(pubKey);
	const sign = encrypt(url);
	// 设置参数
	return sign;
}
