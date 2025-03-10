import XEUtils from 'xe-utils';
import { i18nConfigStore } from './i18nStore';
import type { VxeGlobalI18nLocale } from '../../types';

export function getI18n(key: string, args?: any) {
	const { langMaps, language } = i18nConfigStore;
	return XEUtils.toFormatString(XEUtils.get(langMaps[language], key, key), args);
}

export function hasLanguage(language: VxeGlobalI18nLocale) {
	const { langMaps } = i18nConfigStore;
	return !!langMaps[language];
}

export function getLanguage() {
	const { language } = i18nConfigStore;
	return language;
}
