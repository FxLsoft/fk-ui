```yaml
title:
  zh-CN: 自适应高度
  en-US: Auto Size
```


通过设置 `auto-size`，可以让文本框自适应输入内容。

---


```vue { "component": true } 
<template>
  <fk-textarea default-value="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea." auto-size />
  <fk-textarea
default-value="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea." :auto-size="{
    minRows:2,
    maxRows:5
  }" style="margin-top: 20px"/>
</template>
```
