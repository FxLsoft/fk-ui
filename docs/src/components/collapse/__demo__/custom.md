```yaml
title:
  zh-CN: 自定义样式
  en-US: Custom style
```


自定义面板样式。

---


```vue { "component": true } 
<template>
  <fk-collapse :default-active-key="['1', 2]" :bordered="false">
    <fk-collapse-item key="1" header="Aaaa Technology Co., Ltd." :style="customStyle">
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item :key="2" header="Aaaa Technology Co., Ltd." :style="customStyle">
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item key="3" header="Aaaa Technology Co., Ltd." :style="customStyle">
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
  </fk-collapse>
</template>

<script>
export default {
  setup() {
    const customStyle = {
      borderRadius: '6px',
      marginBottom: '18px',
      border: 'none',
      overflow: 'hidden',
    }

    return {
      customStyle
    }
  }
}
</script>
```
