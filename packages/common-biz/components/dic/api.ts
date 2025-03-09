import { http } from '../../http';

/**
 * 获取字典
 * @todo 声明入参
 * @param params
 */
export function getDicApi(code: string) {
	return http
		.post(
			'/system/dict/group/getDict',
			{ code },
			{
				cache: true,
			},
		)
		.then(res => {
			const list = res?.[code] || [];
			const arr = [];
			list.forEach(item => {
				const jsonString = item.attribute;
				let jsonObject = {};
				if (jsonString) {
					const correctedJsonString = jsonString.replace(/'/g, '"');
					try {
						jsonObject = JSON.parse(correctedJsonString);
					} catch (error) {
						console.warn(error);
						jsonObject = correctedJsonString;
					}
				} else {
					jsonObject = {};
				}
				arr.push({
					label: item.name,
					value: item.value,
					attribute: jsonObject,
				});
			});
			return arr;
		});
}
