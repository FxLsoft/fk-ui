/**
 * 管理所有的服务启动加载
 * -- 服务启动顺序
 * -- 怎么启动
 * -- 何时启动
 * -- 考虑性能以及稳定
 */
import { EventService } from './EventService';

export const loadService = () => {
	return [EventService];
};
