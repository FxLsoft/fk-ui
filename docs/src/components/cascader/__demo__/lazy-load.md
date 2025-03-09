```yaml
title:
  zh-CN: 子选项懒加载
  en-US: Lazy load
```


通过 `load-more` 属性可以开启数据懒加载功能。
开启数据懒加载功能后，需要在叶子节点标注 `isLeaf: true`，没有标注且没有 `children` 属性的节点会认为需要懒加载处理。
`load-more` 属性有提供 `done` 函数进行回调，可以在回调中传入懒加载的子数据。如果 `done` 函数没有传入数据会认为懒加载失败，此节点可以再次触发懒加载。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-cascader :options="options" :style="{width:'320px'}" placeholder="Please select ..." :load-more="loadMore"/>
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
          },
          {
            value: 'haidian',
            label: 'Haidian',
            isLeaf: true
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
            isLeaf: true
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
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
            isLeaf: true
          },
        ],
      },
    ];
    const loadMore = (option, done) => {
      window.setTimeout(() => {
        const nodes = [{
          value: `${option.value}-option1`,
          label: `${option.label}-Option1`,
          isLeaf: true
        }, {
          value: `${option.value}-option2`,
          label: `${option.label}-Option2`,
          isLeaf: true
        }]
        done(nodes)
      }, 2000)
    };

    return {
      options,
      loadMore
    }
  },
}
</script>
```
