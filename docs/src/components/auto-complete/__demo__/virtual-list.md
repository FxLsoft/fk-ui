```yaml
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
```


虚拟列表的使用方法。

---


```vue { "component": true } 
<template>
  <fk-auto-complete
    :data="data"
    :style="{ width: '360px' }"
    placeholder="商品衣诚"
    :virtual-list-props="{ height: 200, threshold: 20 }"
    @search="handleSearch"
  />
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {
    handleSearch(value) {
      if (value) {
        this.data = [...Array.from({length: 5000})].map((_, index) => `${value}-${index}`);
      } else {
        this.data = [];
      }
    },
  },
};
</script>
```
