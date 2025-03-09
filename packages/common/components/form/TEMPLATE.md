```yaml
meta:
  type: 组件
  category: 数据输入
title: 表单 Form
description: 具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。
```
---

<!--@include: ./__demo__/basic.md-->

<!--@include: ./__demo__/layout.md-->

<!--@include: ./__demo__/extra.md-->

<!--@include: ./__demo__/nest.md-->

<!--@include: ./__demo__/grid.md-->

<!--@include: ./__demo__/auto-width.md-->

<!--@include: ./__demo__/validation.md-->

<!--@include: ./__demo__/validation2.md-->

<!--@include: ./__demo__/status.md-->

<!--@include: ./__demo__/dynamic.md-->

<!--@include: ./__demo__/disabled.md-->

<!--@include: ./__demo__/async.md-->

<!--@include: ./__demo__/custom.md-->

<!--@include: ./__demo__/scroll.md-->

## API

%%API(form.vue)%%

%%API(form-item.vue)%%

## Type

%%INTERFACE(interface.ts)%%

### useFormItem

```ts
const useFormItem = (data: {
  size?: Ref<Size | undefined>;
  disabled?: Ref<boolean>;
  error?: Ref<boolean>;
}) => {
  mergedSize:Ref<Size>;
  mergedDisabled:Ref<boolean>;
  mergedError:Ref<boolean>;
  feedback:Ref<string>;
  eventHandlers:Ref<FormItemEventHandler>;
}
```

## FAQ

### 关于 `form-item` 的 `field` 属性
`field` 属性的值为获取当前 `form-item` 对应值的路径字符串。

例如传入 model 属性的数据结构为：
```ts
const data = reactive({
  name:'xiaoming',
  people:[
    {
      id:'1111'
    },
    {
      // bind this value
      id:'2222'
    }
  ]
})
```
此时，如果想要指定当前 `form-item` 对应的值为 `id: '2222'`，需要设置 `field="people.2.id"`，值中的分隔符需要使用 `.`。数组分割也可以使用 `[]`，例如 `field="people[2].id"`

### 关于在 label 插槽中使用可点击元素

表单组件的标题区域默认使用 `label` 元素包裹，会在点击时激活输入组件，如果在其中放入可以点击组件，会影响其正常功能。
此时可以使用 `label-component` 属性修改包裹元素为 `span` 解决这个问题。

---
