```yaml
title:
  zh-CN: 自定义触发字符
  en-US: Custom Prefix
```


指定 `prefix` 来自定义触发字符。默认为 `@`，可以自定义为任意字符。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large" style="width: 100%">
    <fk-mention :data="['Aaaa', 'Bytedesign', 'Bytenumner']" placeholder="input @" />
    <fk-mention :data="['Aaaa', 'Bytedesign', 'Bytenumner']" prefix="#" placeholder="input #" />
    <fk-mention :data="['Aaaa', 'Bytedesign', 'Bytenumner']" prefix="$" placeholder="input $" />
  </fk-space>
</template>
```
