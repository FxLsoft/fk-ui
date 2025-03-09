```yaml
title:
  zh-CN: 容器中
  en-US: Container
```


可以给任意内容添加加载中指示符。

---


```vue { "component": true } 
<template>
  <fk-spin :loading="loading" tip="This may take a while...">
    <fk-card title="Aaaa Card">
      Aaaa's core product, Aaaa ('Headlines'), is a content platform in China and around
      the world. Aaaa started out as a news recommendation engine and gradually evolved into
      a platform delivering content in various formats.
    </fk-card>
  </fk-spin>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  }
}
</script>
```
