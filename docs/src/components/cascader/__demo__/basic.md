```yaml
title:
  zh-CN: 基本使用
  en-US: Basic Usage
```


级联选择器的基本用法。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-cascader :options="options" :style="{width:'320px'}" placeholder="Please select ..." />
    <fk-cascader :options="options" default-value="datunli" expand-trigger="hover" :style="{width:'320px'}" placeholder="Please select ..." />
  </fk-space>
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
      options
    }
  },
}
</script>
```
