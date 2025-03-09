```yaml
title:
  zh-CN: 格栅列表
  en-US: Grid
```


通过 `grid` 属性来配置格栅列表。

---


```vue { "component": true } 
<template>
  <fk-list :grid-props="{ gutter: 0, span: 6 }" :bordered="false">
    <fk-list-item>
      <fk-list>
        <template #header>Platform</template>
        <fk-list-item>iOS</fk-list-item>
        <fk-list-item>Android</fk-list-item>
        <fk-list-item>Web</fk-list-item>
      </fk-list>
    </fk-list-item>
    <fk-list-item>
      <fk-list>
        <template #header>Framework</template>
        <fk-list-item>Angular</fk-list-item>
        <fk-list-item>Vue</fk-list-item>
        <fk-list-item>React</fk-list-item>
      </fk-list>
    </fk-list-item>
    <fk-list-item>
      <fk-list>
        <template #header>Language</template>
        <fk-list-item>C++</fk-list-item>
        <fk-list-item>JavaScript</fk-list-item>
        <fk-list-item>Python</fk-list-item>
      </fk-list>
    </fk-list-item>
    <fk-list-item>
      <fk-list>
        <template #header>Component</template>
        <fk-list-item>Button</fk-list-item>
        <fk-list-item>Breadcrumb</fk-list-item>
        <fk-list-item>Transfer</fk-list-item>
      </fk-list>
    </fk-list-item>
  </fk-list>
</template>
```
