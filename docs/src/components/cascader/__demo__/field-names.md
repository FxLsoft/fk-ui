```yaml
title:
  zh-CN: 自定义字段名
  en-US: Custom FieldNames
```


可以通过 `field-names` 属性自定义 `options` 中数据的格式。

---


```vue { "component": true } 
<template>
  <fk-cascader
:options="options" :field-names="fieldNames" :style="{width:'320px'}"
            placeholder="Please select ..." />
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const fieldNames = {value: 'city', label: 'text'}
    const options = reactive([
      {
        city: 'beijing',
        text: 'Beijing',
        children: [
          {
            city: 'chaoyang',
            text: 'ChaoYang',
            children: [
              {
                city: 'datunli',
                text: 'Datunli',
              },
            ],
          },
          {
            city: 'haidian',
            text: 'Haidian',
          },
          {
            city: 'dongcheng',
            text: 'Dongcheng',
          },
          {
            city: 'xicheng',
            text: 'Xicheng',
            children: [
              {
                city: 'jinrongjie',
                text: 'Jinrongjie',
              },
              {
                city: 'tianqiao',
                text: 'Tianqiao',
              },
            ],
          },
        ],
      },
      {
        city: 'shanghai',
        text: 'Shanghai',
        children: [
          {
            city: 'huangpu',
            text: 'Huangpu',
          },
        ],
      },
    ]);

    return {
      fieldNames,
      options
    }
  }
}
</script>
```
