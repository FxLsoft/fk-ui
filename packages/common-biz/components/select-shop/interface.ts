import type { PageConfig } from '../pop/interface';

/**
 * 选择店铺入参
 */
export interface SelectShopPopProps extends PageConfig {
	ids?: (string | number)[];
	options?: Record<string, any>[];
	multiple?: boolean;
}
