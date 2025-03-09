```yaml
title:
  zh-CN: 鼠标悬浮样式
  en-US: Hoverable
```


指定 `hoverable` 来为卡片添加鼠标悬浮样式，同时你可以通过样式覆盖来自定义悬浮样式。

---


```vue { "component": true } 
<template>
  <div :style="{ display: 'flex' }">
    <fk-card :style="{ width: '360px' }" title="Aaaa Card" hoverable>
      <template #extra>
        <fk-link>More</fk-link>
      </template>
      Card content <br />
      Card content
    </fk-card>
    <fk-card
      class="card-demo"
      title="Custom hover style"
      hoverable
    >
      <template #extra>
        <fk-link>More</fk-link>
      </template>
      Card content <br />
      Card content
    </fk-card>
  </div>
</template>
<style scoped>
.card-demo {
  width: 360px;
  margin-left: 24px;
  transition-property: all;
}
.card-demo:hover {
  transform: translateY(-4px);
}
</style>
```
