
# 动态表单
动态表单集成的功能
- 自定义输入组件，可参考`@erp/biz`里的 `ErpInput`
  input(text, number, integer, switch, radio, checkbox, update, select, cascader, tree)

- 自定义布局功能
  通过简单的类栅格配置能实现通用的布局

- 自定义校验功能
  通过简单的配置，就能支持通用强大的校验功能。


## 动态表单组件集成形式
<Demo1 />

## 动态表单弹窗形式

<fk-button type="primary" @click="handleOpenForm">弹窗打开Form</fk-button>

## 动态表单通用配置实例

::: code-group

<<< ./__demo__/default.vue

<<< ./__demo__/form-config.ts

:::

## API

%%API(dynamic-form.tsx)%%

%%INTERFACE(interface.ts)%%


<script lang="ts" setup>
import { pop, DynamicForm } from '@erp/biz';
import Demo1 from './__demo__/default.vue';
import { config } from './__demo__/form-config';
import { cloneDeep } from 'lodash-es';

const handleOpenForm = () => {
  pop.createModal(DynamicForm, {config: cloneDeep(config)}, {
    title: '新建订单', fullscreen: true, bodyClass: 'form-modal-container'}).then(res => {
    console.log('handleOpenForm >> ', res);
  })
}

</script>
<style lang="scss">
.form-modal-container {
  padding: 0;
  display: flex;
  .dynamic-form {
    height: initial;
  }
}

.vp-doc .vxe-table tr {
   border: initial;
}
.vp-doc .vxe-table th, .vp-doc .vxe-table td {
   border: initial;
}
.vp-doc .vxe-table table {
   display: table;
}
.vp-doc .vxe-table tr:nth-child(2n) {
  background-color: initial;
}

</style>
