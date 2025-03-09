```yaml
title:
  zh-CN: 自定义图标
  en-US: Custom Icon
```


通过 `#icon` 插槽可以自定义节点图标。


---


```vue { "component": true } 
<template>
  <fk-steps>
    <fk-step description="This is a description">
      Succeeded
      <template #icon>
        <icon-home/>
      </template>
    </fk-step>
    <fk-step description="This is a description">
      Processing
      <template #icon>
        <icon-loading/>
      </template>
    </fk-step>
    <fk-step description="This is a description">
      Pending
      <template #icon>
        <icon-thumb-up/>
      </template>
    </fk-step>
  </fk-steps>
</template>
```
