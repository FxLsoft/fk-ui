/**
 * 语言加载器
 * @param lang
 * @returns
 */
export const lazyLang = (lang: string) => {
	return import(`./lang/${lang}.js`);
};
