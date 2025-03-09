```yaml
title:
  zh-CN: 禁用选项
  en-US: Disabled Option
```


指定 `option` 的 `disabled` 为 `true`，可以禁用该选项。

---


```vue { "component": true } 
<template>
  <fk-cascader :options="options" :style="{width:'320px'}" placeholder="Please select ..." />
</template>

<script>
export default {
  setup() {
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
            disabled: true
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
                disabled: true
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
      options
    }
  },
}
</script>
```
