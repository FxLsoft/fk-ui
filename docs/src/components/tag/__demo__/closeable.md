```yaml
title:
  zh-CN: 可关闭标签
  en-US: Closeable
```


通过 `closable` 属性控制标签是否可关闭。可关闭标签可通过 `close` 事件执行一些关闭后操作，也可通过 `visible` 属性控制标签的显示或隐藏。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-tag closable>Tag</fk-tag>
    <fk-tag closable>
      <template #icon>
        <icon-star/>
      </template>
      Tag
    </fk-tag>
  </fk-space>
</template>
```
