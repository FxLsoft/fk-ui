```yaml
title:
  zh-CN: 参数化配置
  en-US: Parameterized configuration
```


通过 `routes` 来传递面包屑数据。若是要自定义面包屑的话，建议使用 `<fk-breadcrumb-item />` 组件。默认使用 `a` 标签的 `href` 属性绑定路径，可通过 `item` 插槽自定义渲染。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-breadcrumb :routes="routes"/>
    <fk-breadcrumb :routes="routes">
      <template #item-render="{route, paths}">
        <fk-link :href="paths.join('/')">
          {{route.label}}
        </fk-link>
      </template>
    </fk-breadcrumb>
  </fk-space>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          path: '/',
          label: 'Home'
        },
        {
          path: '/channel',
          label: 'Channel',
        },
        {
          path: '/news',
          label: 'News'
        },
      ],
    }
  }
}
</script>
```
