```yaml
title:
  zh-CN: 下拉菜单滚动
  en-US: Dropdown Scroll
```


可以通过 `dropdown-scroll` 监听下拉菜单的滚动事件。或者通过 `dropdown-reach-bottom` 监听下拉菜单滚动到底部的事件。

---


```vue { "component": true } 
<template>
  <fk-auto-complete
    :data="data"
    :style="{ width: '360px' }"
    placeholder="商品衣诚"
    @dropdown-scroll="handleScroll"
    @dropdown-reach-bottom="handleReachBottom"
  />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const data = ref([...Array.from({length: 100})].map((_, index) => `option-${index}`))

    const handleScroll = (ev) => {
      console.log('scroll', ev)
    }
    const handleReachBottom = (ev) => {
      console.log('reach the bottom', ev)
    }

    return {
      data,
      handleScroll,
      handleReachBottom
    }
  },
}
</script>
```
