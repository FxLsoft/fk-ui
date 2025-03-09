```yaml
title:
  zh-CN: 字数统计
  en-US: Word Limit
```


设置 `max-length` 可以限制最大字数，配合 `show-word-limit` 可以显示字数统计。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large" fill>
    <fk-textarea placeholder="商品衣诚" :max-length="10" allow-clear show-word-limit />
    <fk-textarea
placeholder="商品衣诚" :max-length="{length:10,errorOnly:true}" allow-clear
                show-word-limit />
  </fk-space>
</template>
```
