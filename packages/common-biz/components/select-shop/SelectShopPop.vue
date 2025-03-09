<template>
	<Modal v-model:visible="visible" width="800px" class="select-shop-pop" title="请选择店铺" @cancel="handleCancel">
		<Spin class="select-shop-body" :loading="loading">
			<Input v-model.trim="searchText" placeholder="输入店铺名，回车搜索" @keyup.enter="handleSearch">
				<template #prefix>
					<IconSearch />
				</template>
			</Input>
			<div class="select-shop-wrapper">
				<div v-for="el in storeLists" :key="el.id" class="shop-wrap">
					<Checkbox
						v-if="isMultiple"
						v-model="el.checked"
						:indeterminate="el.indeterminate"
						:label="el.label"
						class="shop-category"
						@change="handleCheckChange(el)"
					/>
					<div v-else class="shop-category">{{ el.label }}</div>
					<div class="shop-item-wrap">
						<div v-for="item in el.children" :key="item.id" class="shop-item">
							<Checkbox v-model="item.checked" :value="item.id" :label="item.label" @change="handleCheckChange(item)" />
						</div>
					</div>
				</div>
			</div>
		</Spin>
		<template #footer>
			<div class="select-shop-footer">
				<div class="select-shop-footer-left">
					<Checkbox v-if="isMultiple" v-model="allSelect" :indeterminate="allIndeterminate" @change="handleCheckAllChange">全选</Checkbox>
					<Checkbox v-if="isMultiple" v-model="invertSelect" class="invert-check" @change="handleInvertChange">反选</Checkbox>
					<span class="select-text">已选：{{ selectedItems.length }} 个店铺</span>
				</div>
				<div class="select-shop-footer-right">
					<Button @click="handleCancel">取消</Button>
					<Button type="primary" :loading="loading" @click="handleConfirm">确定</Button>
				</div>
			</div>
		</template>
	</Modal>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { Button, Checkbox, IconSearch, Input, Modal, Spin } from '@erp/common';
import { getStoreApi } from './api';
import type { SelectShopPopProps } from './interface';

const props = withDefaults(defineProps<SelectShopPopProps>(), {
	multiple: true,
});

const visible = ref(true);
const loading = ref(true);

const searchText = ref('');
const storeLists = ref(props.options || []);
const invertSelect = ref(false);
const allSelect = ref(false);
const allIndeterminate = ref(false);

const isMultiple = computed(() => {
	return props.multiple !== false;
});

const selectedItems = computed(() => {
	const items = [];
	storeLists.value.forEach(item => {
		if (item.children && item.children.length) {
			item.children.forEach(children => {
				if (children.checked) {
					items.push(children);
				}
			});
		}
	});
	return items;
});

const handleCheckAllChange = () => {
	invertSelect.value = false;
	storeLists.value.forEach(item => {
		item.checked = allSelect.value;
		item.children.forEach(children => {
			children.checked = allSelect.value;
		});
	});

	nextTick(freshCheck);
};

const handleInvertChange = () => {
	allSelect.value = false;
	storeLists.value.forEach(item => {
		item.checked = !item.checked;
		item.children.forEach(children => {
			children.checked = !children.checked;
		});
	});

	nextTick(freshCheck);
};

const handleCancel = () => {
	visible.value = false;
	props.onCancel();
};

const handleSearch = () => {
	getShopList();
};

const handleCheckChange = (item: any) => {
	if (item.children) {
		item.children.forEach(children => {
			children.checked = item.checked;
		});
	} else if (!props.multiple) {
		storeLists.value.forEach(el => {
			el.children.forEach(children => {
				if (children !== item) {
					children.checked = false;
				}
			});
		});
	}

	nextTick(freshCheck);
};

const getShopList = () => {
	const params = {
		name: searchText.value,
	};
	loading.value = true;
	getStoreApi(params)
		.then(res => {
			storeLists.value = recursive(res || []);
			nextTick(freshCheck);
		})
		.finally(() => {
			loading.value = false;
		});
};

const handleConfirm = () => {
	visible.value = false;
	props.onOk(cloneDeep(selectedItems.value));
};

const recursive = arr => {
	arr.forEach(item => {
		if (item.children && item.children.length) {
			recursive(item.children);
			item.indeterminate = item.children.some(v => v.checked);
			item.checked = item.children.every(v => v.checked);
		} else {
			item.checked = item.platform && props.ids.includes(item.id);
			item.indeterminate = false;
		}
	});
	return arr;
};

function freshCheck() {
	storeLists.value.forEach(item => {
		if (item.children && item.children.length) {
			item.checked = item.children.every(v => v.checked);
			item.indeterminate = !item.checked && item.children.some(v => v.checked);
		}
	});
	allSelect.value = storeLists.value.every(v => v.checked);
	allIndeterminate.value = !allSelect.value && storeLists.value.some(v => v.checked || v.indeterminate);
}

onMounted(() => {
	getShopList();
});
</script>

<style lang="scss">
.select-shop-body {
	min-height: 420px;
	width: 100%;
}
.select-shop-wrapper {
	.shop-wrap {
		padding: 12px 0 16px;
		width: 100%;
	}
	.shop-item-wrap {
		width: 100%;
		padding: 0 0 0 20px;
		display: inline-flex;
		flex-wrap: wrap;
	}
	.shop-category {
		width: 100%;
		height: 40px;
		line-height: 40px;
	}
	.shop-item {
		width: calc(100% / 3);
		height: 40px;
		display: inline-flex;
		align-items: center;
	}
}
.select-shop-footer {
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	.invert-check {
		margin-right: 64px;
	}
	.fk-btn + .fk-btn {
		margin-left: 20px;
	}
	.fk-checkbox + .fk-checkbox {
		margin-left: 20px;
	}
}
.select-shop-footer-left {
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
}
</style>
