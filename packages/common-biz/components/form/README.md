
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


### `<dynamic-form>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`Record<string, any>`|`function() { return {}; }`|
|config **(必填)**|DynamicFormI 动态表单配置|`DynamicFormI`|`-`|
### `<dynamic-form>` Events

|事件名|描述|参数|
|---|---|---|
|update:model-value|表单数据模型|-|
|ok|表单ok事件，可配合 createPage createModal createDrawer使用|params: `mixed`|
|close|表单close事件，可配合 createPage createModal createDrawer使用|params: `mixed`|
|loading|表单 loading 事件，可配合 createModal createDrawer使用|params: `mixed`|
|click|表单里配置的按钮事件|button: `mixed`|




### FormButtonType

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|code|按钮唯一标识|`string`|`-`|
|validator|校验配置|`boolean \| ((model: Record<string, any>, form: FormInstance) => Promise<Record<string, ValidatedError> \| undefined>)`|`-`|



### DynamicFormI

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|$id|表单ID|`string`|`-`|
|title|表单标题|`string`|`-`|
|fields|表单字段|`DynamicFormFieldI[]`|`-`|
|groups|表单组|`DynamicFormGroupI[]`|`-`|
|showSide|是否显示左侧导航<br>默认显示|`boolean`|`false`|
|buttons|显示button|`FormButtonType[]`|`-`|
|layout|表单字段布局|`'horizontal' \| 'vertical' \| 'inline'`|`-`|
|labelAlign|label方向|`'left' \| 'right'`|`-`|
|cols|每一行展示的列数|`number`|`-`|
|colGap|列与列之间的间距|`number`|`-`|
|components|动态组件<br>只能第一次注册|`Record<string, Component>`|`-`|



### DynamicFormGroupI

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|$id|由框架自己生成|`string`|`-`|
|label|表单域标签|`string`|`-`|
|fields|表单字段|`DynamicFormFieldI[]`|`-`|
|cols|每一行展示的列数|`number`|`-`|
|colGap|列与列之间的间距|`number`|`-`|
|buttons|显示button|`FormButtonType[]`|`-`|



### DynamicFormFieldI

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|$id|id 自动生成|`string`|`-`|
|key|数据模式key，符合propertyKey|`string`|`-`|
|type|组件类型|`InputType \| 'custom'`|`-`|
|component|组件|`Component \| string`|`-`|
|componentProps|组件额外配置<br>除了 `DynamicFormFieldI` 自带的属性外，如果组件特有的属性外都在此配置|`any`|`-`|
|label|标签的文本|`string`|`-`|
|multiple|是否多值|`boolean`|`false`|
|disabled|是否禁用|`boolean`|`false`|
|placeholder|占位|`string`|`-`|
|options|组件数据配置|`OptionData[] \| (() => Promise<OptionData[]>)`|`-`|
|tooltip|提示内容|`string`|`-`|
|showColon|是否显示冒号|`boolean`|`false`|
|noStyle|是否去除样式|`boolean`|`false`|
|help|帮助文案|`string`|`-`|
|required|是否必须填写|`boolean`|`false`|
|rules|表单项校验规则|`FieldRule \| FieldRule[]`|`-`|
|validateStatus|校验状态|`ValidateStatus`|`-`|
|validateTrigger|触发校验的事件|`ValidateTrigger`|`-`|
|hideLabel|是否隐藏标签|`boolean`|`false`|
|hideAsterisk|是否隐藏星号|`boolean`|`false`|
|feedback|是否显示表单控件的反馈图标|`boolean`|`false`|
|row|表单项布局选项|`RowProps`|`-`|
|span|跨越的格数|`number`|`-`|
|class|class|`string`|`-`|
|show|是否显示|`boolean \| (() => boolean)`|`-`|
|slots|FormItem slots配置|`Record<string, () => any>`|`-`|



### DynamicFieldComponentProps

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|field|子组件的表单域配置|`DynamicFormFieldI`|`-`|
|model|表单数据模型|`Record<string, any>`|`-`|
|modelValue **(v-model)**|对应表单的值|`any`|`-`|



### DynamicFieldComponentExpose

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|validate|校验|`() => boolean \| string \| Promise<boolean \| string>`|`-`|




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
