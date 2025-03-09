import { VxeUI } from '../../core';

const { log } = VxeUI;

const version = `table v1.0.0`;

export const warnLog = log.create('warn', version);
export const errLog = log.create('error', version);
