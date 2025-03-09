## 文本输入

```vue
<ErpInput type="text" v-model="value" />
```

```vue { "component": true }
<template>
	<fk-row class="erp-input-demo">
		<ErpInput ref="input" v-model="vm.text" type="text" @change="handleChange" />
	</fk-row>
    <p>
        <fk-space>
            <fk-button type="primary" @click="handleFocus">聚焦事件</fk-button>
            <fk-button type="primary" @click="handleBlur">失焦事件</fk-button>
            <fk-button type="primary" @click="handleGetInstance">获取实例</fk-button>
        </fk-space>
    </p>
    <fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive, useTemplateRef } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const input = useTemplateRef('input')

const handleChange = (value) => {
  console.log('handleChange >>', value);
}

const handleFocus = () => {
    input.value?.focus();
}

const handleBlur = () => {
    input.value?.blur();
}

const handleGetInstance = () => {
    const instance = input.value.getInstance();
    console.log('instance >>', instance);
}

const vm = reactive({
	text: '',
});
</script>

<style lang="scss" scoped>
.erp-input-demo {
	width: 240px;
}
</style>
```
