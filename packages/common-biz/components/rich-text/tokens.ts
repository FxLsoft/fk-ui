import type { InjectionKey } from 'vue';
import type { Textbus } from '@textbus/core';
import type { VueAdapter } from './vue-adapter';

export const TextbusInjectToken: InjectionKey<Textbus> = Symbol('Textbus');
export const AdapterInjectToken: InjectionKey<VueAdapter> = Symbol('Adapter');
