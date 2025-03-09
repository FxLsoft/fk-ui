```yaml
title:
  zh-CN: 级联菜单
  en-US: Cascader Panel
```


级联菜单可以单独使用，此时为 `数据展示` 组件

---


```vue { "component": true } 
<template>
  <fk-cascader-panel v-model="value" :options="options" expand-child/>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref('');

    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'ChaoYang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
            children: [
              {
                value: 'jinrongjie',
                label: 'Jinrongjie',
              },
              {
                value: 'tianqiao',
                label: 'Tianqiao',
              },
            ],
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu',
          },
        ],
      },
    ];
    return {
      value,
      options
    }
  },
}
</script>
```
