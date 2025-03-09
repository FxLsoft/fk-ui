# 自定义懒加载

```vue { "component": true }
<template>
	<fk-row v-for="i in list" :key="i">
		<div v-lazyLoad="el => lazyLoad(el, i)" class="lazy-div">正在加载...</div>
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { vLazyLoad } from '@erp/common';

const list = reactive([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const lazyLoad = async (el, i) => {
	el.innerHTML = `已加载！[${i}]`;
	return true;
};

// 动态赋值重新加载
setTimeout(() => {
    list.length = 0;
    for(let i = 100; i < 110; i++) {
        list.push(i);
    }
}, 5000)

</script>

<style lang="less" scoped>
.lazy-div {
	width: 200px;
	height: 200px;
	margin-bottom: 10px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	background-color: #f5f6f7;
}
</style>
```
