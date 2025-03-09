```yaml
title:
  zh-CN: 弹出框的页脚
  en-US: Dropdown Footer
```


自定义弹出框的页脚

---


```vue { "component": true } 
<template>
  <fk-auto-complete :data="data" :style="{width:'360px'}" placeholder="商品衣诚" @search="handleSearch">
    <template #footer>
      <div style="padding: 6px 0; text-align: center;">
        <fk-button>Click Me</fk-button>
      </div>
    </template>
  </fk-auto-complete>
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
