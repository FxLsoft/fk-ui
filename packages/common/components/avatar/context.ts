import type { InjectionKey } from 'vue';
import type { AvatarShape } from './interface';

export interface AvatarGroupContext {
	size: number | undefined;
	shape: AvatarShape;
	autoFixFontSize: boolean;
	zIndexAscend: boolean;
	total: number;
}

export const avatarGroupInjectionKey: InjectionKey<AvatarGroupContext> = Symbol('AvatarGroup');
