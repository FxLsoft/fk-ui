```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

自动补全的基础用法

---

```vue { "component": true } 
<template>
  <fk-auto-complete :data="data" allow-clear :style="{width:'360px'}" placeholder="商品衣诚" @search="handleSearch"/>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  methods: {
    handleSearch(value) {
      if (value) {
        this.data = [...Array.from({length: 5})].map((_, index) => `${value}-${index}`)
        console.log(this.data)
      } else {
        this.data = []
      }
    }
  }
}
</script>
```
