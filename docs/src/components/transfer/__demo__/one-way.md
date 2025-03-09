```yaml
title:
  zh-CN: 单向
  en-US: One Way
```


通过设置 `one-way` ，使用单向模式的穿梭框。

---


```vue { "component": true } 
<template>
  <fk-transfer :data="data" :default-value="value" one-way/>
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
