```yaml
title:
  zh-CN: 带图标的标签
  en-US: Icon
```


可通过 `icon` 插槽在标签中加入图标。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-tag color="gray">
      <template #icon>
        <icon-github/>
      </template>
      Github
    </fk-tag>
    <fk-tag color="orangered">
      <template #icon>
        <icon-gitlab/>
      </template>
      Gitlab
    </fk-tag>
    <fk-tag color="blue">
      <template #icon>
        <icon-twitter/>
      </template>
      Twitter
    </fk-tag>
    <fk-tag color="fkblue">
      <template #icon>
        <icon-facebook/>
      </template>
      Facebook
    </fk-tag>
  </fk-space>
</template>
```
