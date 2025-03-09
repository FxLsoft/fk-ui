```yaml
title:
  zh-CN: 下拉菜单滚动
  en-US: Dropdown Scroll
```


可以通过 `dropdown-scroll` 监听下拉菜单的滚动事件。或者通过 `dropdown-reach-bottom` 监听下拉菜单滚动到底部的事件。

---


```vue { "component": true } 
<template>
  <fk-select
    :style="{width:'320px'}"
    default-value="Beijing"
    placeholder="Please select ..."
    @dropdown-scroll="handleScroll"
    @dropdown-reach-bottom="handleReachBottom"
  >
    <fk-option>Beijing</fk-option>
    <fk-option>Shanghai</fk-option>
    <fk-option>Guangzhou</fk-option>
    <fk-option disabled>Disabled</fk-option>
    <fk-option>Shenzhen</fk-option>
    <fk-option>Chengdu</fk-option>
    <fk-option>Wuhan</fk-option>
  </fk-select>
</template>

<script>
export default {
  setup() {
    const handleScroll = (ev) => {
      console.log('scroll', ev)
    }
    const handleReachBottom = (ev) => {
      console.log('reach the bottom', ev)
    }

    return {
      handleScroll,
      handleReachBottom
    }
  },
}
</script>
```
