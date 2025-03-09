```yaml
title:
  zh-CN: 区分大小写
  en-US: Strict
```


使用 `strict` 属性来指明在匹配时严格区分大小写。

---


```vue { "component": true } 

<template>
  <fk-auto-complete :data="data" :style="{width:'360px'}" placeholder="商品衣诚" strict />
</template>

<script>
export default {
  data() {
    return {
      data: ['Beijing', 'Shanghai', 'Chengdu', 'WuHan']
    }
  },
}
</script>
```
