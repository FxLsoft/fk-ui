```yaml
title:
  zh-CN: 多选模式
  en-US: Multiple
```


通过设置 `multiple` 开启多选模式。

---


```vue { "component": true } 
<template>
  <fk-cascader :options="options" tag-nowrap :default-value="['datunli']" :style="{width:'320px'}" placeholder="Please select ..." multiple/>
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
          {
            value: '1xicheng',
            label: '1Xicheng',
            children: [
              {
                value: '1jinrongjie',
                label: '1Jinrongjie',
              },
              {
                value: '1tianqiao',
                label: '1Tianqiao',
              },
            ],
          },{
            value: '2xicheng',
            label: '2Xicheng',
            children: [
              {
                value: '2jinrongjie',
                label: '2Jinrongjie',
              },
              {
                value: '2tianqiao',
                label: '2Tianqiao',
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
