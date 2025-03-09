```yaml
title:
  zh-CN: 按钮类型单选框组的尺寸
  en-US: Button Radio Group Size
```


按钮类型的单选框组分为 `mini`、`small`、`medium`、`large` 四种尺寸。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-radio-group type="button" size="mini">
      <fk-radio value="Beijing">Beijing</fk-radio>
      <fk-radio value="Shanghai">Shanghai</fk-radio>
      <fk-radio value="Guangzhou">Guangzhou</fk-radio>
      <fk-radio value="Shenzhen">Shenzhen</fk-radio>
    </fk-radio-group>
    <fk-radio-group type="button" size="small">
      <fk-radio value="Beijing">Beijing</fk-radio>
      <fk-radio value="Shanghai">Shanghai</fk-radio>
      <fk-radio value="Guangzhou">Guangzhou</fk-radio>
      <fk-radio value="Shenzhen">Shenzhen</fk-radio>
    </fk-radio-group>
    <fk-radio-group type="button">
      <fk-radio value="Beijing">Beijing</fk-radio>
      <fk-radio value="Shanghai">Shanghai</fk-radio>
      <fk-radio value="Guangzhou">Guangzhou</fk-radio>
      <fk-radio value="Shenzhen">Shenzhen</fk-radio>
    </fk-radio-group>
    <fk-radio-group type="button" size="large">
      <fk-radio value="Beijing">Beijing</fk-radio>
      <fk-radio value="Shanghai">Shanghai</fk-radio>
      <fk-radio value="Guangzhou">Guangzhou</fk-radio>
      <fk-radio value="Shenzhen">Shenzhen</fk-radio>
    </fk-radio-group>
  </fk-space>
</template>
```
