```yaml
title:
  zh-CN: 响应式栅格
  en-US: Responsive List Grid
```


通过 `grid.sm` 等响应式参数动态设置每个单项横跨的列数，注意此时不要设置 `grid.span`。

---


```vue { "component": true } 
<template>
  <fk-list
    :grid-props="{ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }"
    :data="dataSource"
    :bordered="false"
  >
    <template #item="{ item }">
      <fk-list :data="item.data">
        <template #header>{{ item.title }}</template>
        <template #item="{ item: subItem }">
          <fk-list-item>{{ subItem }}</fk-list-item>
        </template>
      </fk-list>
    </template>
  </fk-list>
</template>

<script>
const dataSource = [
  {
    title: 'Platform',
    data: ['iOS', 'Android', 'Web'],
  },
  {
    title: 'Framework',
    data: ['Angular', 'Vue', 'React'],
  },
  {
    title: 'Language',
    data: ['C++', 'JavaScript', 'Python'],
  },
  {
    title: 'Component',
    data: ['Button', 'Breadcrumb', 'Transfer'],
  },
  {
    title: 'Design',
    data: ['Figma', 'Sketch', 'Adobe XD'],
  },
  {
    title: 'Plugin',
    data: ['Edu Tools', 'BashSupport', 'GitToolBox'],
  },
  {
    title: 'Platform',
    data: ['iOS', 'Android', 'Web'],
  },
  {
    title: 'Framework',
    data: ['Angular', 'Vue', 'React'],
  },
  {
    title: 'Language',
    data: ['C++', 'JavaScript', 'Python'],
  },
];

export default {
  setup() {
    return {
      dataSource
    }
  }
}
</script>
```
