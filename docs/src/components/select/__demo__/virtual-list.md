```yaml
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
```


虚拟列表的使用方法。

---


```vue { "component": true } 

<template>
  <fk-select :style="{width:'320px'}" :options="options" placeholder="Please select ..." :virtual-list-props="{height:200}" />
</template>

<script>
export default {
  setup() {
    const options = Array.from({length: 1000}).fill(null).map((_, index) => `Option ${index}`);

    return {
      options
    }
  },
}
</script>
```
