```yaml
title:
  zh-CN: 简单模式
  en-US: Simple
```


通过设置 `simple` 来开启简单模式，点击选项即可移动。

---


```vue { "component": true } 
<template>
  <fk-transfer :data="data" :default-value="value" simple />
</template>

<script>
export default {
  setup() {
    const data = Array.from({length: 8}).fill(undefined).map((_, index) => ({
      value: `option${index + 1}`,
      label: `Option ${index + 1}`
    }));
    const value = ['option1', 'option3', 'option5'];

    return {
      data,
      value
    }
  },
}
</script>
```
