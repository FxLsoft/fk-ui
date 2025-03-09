<template>
	<div :class="classNames">
		<InputNumber
			:mode="mode"
			:precision="precision"
			:step="step"
			:disabled="disabled"
			:min="min"
			:max="startMax"
			:placeholder="startPlaceholder"
			:model-value="minValue"
			:size="size"
			v-bind="$attrs"
			@change="setStartValue"
			@focus="handleFocus"
			@blur="handleBlur"
		/>
		<span :class="`${prefixCls}-separator`">
			<slot name="separator"> - </slot>
		</span>
		<InputNumber
			:mode="mode"
			:precision="precision"
			:step="step"
			:disabled="disabled"
			:min="endMin"
			:max="max"
			:placeholder="endPlaceholder"
			:model-value="maxValue"
			:size="size"
			v-bind="$attrs"
			@change="setEndValue"
			@focus="handleFocus"
			@blur="handleBlur"
		/>
		<IconHover v-if="showClearBtn" class="fk-input-clear-btn" @click="handleClear">
			<IconClose />
		</IconHover>
	</div>
</template>

<script setup lang="ts" name="range-number">
import { computed, nextTick, ref, watch } from 'vue';
import { isNil, isNumber } from 'lodash-es';
import { IconClose, IconHover, InputNumber } from '@erp/common';
import { UPDATE_MODEL } from '../../utils/constants';
import type { Size } from '@erp/common';

const prefixCls = 'range-number';
const inputPrefixCls = 'fk-input';

const props = withDefaults(
	defineProps<{
		/**
		 * @zh 绑定值
		 * @en Value
		 */
		modelValue: (number | string)[];
		/**
		 * @zh 模式（`embed`：按钮内嵌模式，`button`：左右按钮模式）
		 * @values 'embed', 'button'
		 */
		mode?: 'embed' | 'button';
		/**
		 * @zh 数字精度
		 */
		precision?: number;
		/**
		 * @zh 数字变化步长
		 */
		step?: number;
		/**
		 * @zh 是否禁用
		 */
		disabled?: boolean;
		/**
		 * @zh 是否允许清空输入框
		 */
		allowClear?: boolean;
		/**
		 * @zh 最大值
		 */
		max?: number;
		/**
		 * @zh 最小值
		 */
		min?: number;

		/**
		 * @zh 输入框提示文字
		 */
		placeholder?: string[];

		/**
		 * @zh 输入框大小
		 * @values 'mini','small','medium','large'
		 * @defaultValue 'medium'
		 */
		size?: Size;
	}>(),
	{
		modelValue: () => [],
		mode: 'embed',
		precision: 2,
		step: 1,
	},
);

const emit = defineEmits<{
	'update:modelValue': [value: (number | string)[]];
	change: [value: (number | string)[], type?: 'min' | 'max', v?: number | string];
	clear: [];
}>();

function getValue(value: any, defaultValue?) {
	if (Number.isNaN(+value)) {
		return defaultValue;
	} else {
		return value;
	}
}

const focused = ref(false);

const _values = ref<[number | string, number | string]>([getValue(props.modelValue?.[0]), getValue(props.modelValue?.[1])]);

const classNames = computed(() => [
	prefixCls,
	`${inputPrefixCls}-wrapper`,
	{
		[`${inputPrefixCls}-focused`]: focused.value,
		[`${inputPrefixCls}-disabled`]: props.disabled,
	},
	`${inputPrefixCls}-size-${props.size}`,
]);

const startMax = computed(() => {
	return Math.min(props.max ?? Number.POSITIVE_INFINITY, +(props.modelValue?.[1] ?? Number.POSITIVE_INFINITY));
});

const endMin = computed(() => {
	return Math.max(props.min ?? Number.NEGATIVE_INFINITY, +(props.modelValue?.[0] ?? Number.NEGATIVE_INFINITY));
});

const _placeholder = computed(() => {
	if (Array.isArray(props.placeholder)) {
		return props.placeholder;
	} else if (isNil(props.placeholder)) {
		return [];
	} else {
		return [props.placeholder];
	}
});

const startPlaceholder = computed(() => {
	return _placeholder.value?.[0];
});

const endPlaceholder = computed(() => {
	return _placeholder.value?.[1];
});

const showClearBtn = computed(() => {
	return props.allowClear && !props.disabled && _values.value.some(v => isNumber(v));
});

const minValue = computed(() => {
	return getValue(_values.value[0]);
});

const maxValue = computed(() => {
	return getValue(_values.value[1]);
});

const handleFocus = () => {
	focused.value = true;
};

const handleBlur = () => {
	focused.value = false;
};

const handleClear = () => {
	_values.value[0] = undefined;
	_values.value[1] = undefined;
	emit('change', _values.value);
	emit('clear');
};

const setStartValue = value => {
	const _value = getValue(value);
	if (_values.value[0] !== _value) {
		_values.value[0] = _value;
		emit('change', _values.value, 'min', value);
		console.log('setEndValue >>', value);
	}
};

const setEndValue = value => {
	const _value = getValue(value);
	if (_values.value[1] !== _value) {
		_values.value[1] = _value;
		emit('change', _values.value, 'max', value);
		console.log('setEndValue >>', value);
	}
};

watch(
	() => props.modelValue,
	() => {
		console.log('pause, resume');
		if (props.modelValue != _values.value) {
			_values.value = [getValue(props.modelValue?.[0]), getValue(props.modelValue?.[1])];
		}
	},
);

watch(
	() => [..._values.value],
	() => {
		emit(UPDATE_MODEL, _values.value);
		console.log(UPDATE_MODEL, _values.value);
	},
	{
		flush: 'post',
	},
);
</script>
