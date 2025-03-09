import { getI18n } from './i18n';
import type { VxeGlobalLog } from '../../types';

function createLog(type: 'log' | 'warn' | 'error', name?: string) {
	return function (key: string, args?: any) {
		const msg = `[Table ${name || ''}] ${getI18n(key, args)}`;
		console[type](msg);
		return msg;
	};
}

const version = '1.0.0';

export const log: VxeGlobalLog = {
	create: createLog,
	warn: createLog('warn', `v${version}`),
	err: createLog('error', `v${version}`),
};
