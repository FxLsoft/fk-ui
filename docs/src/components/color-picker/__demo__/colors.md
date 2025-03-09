```yaml
title:
  zh-CN: 预设颜色和历史颜色
```

通过 `showPreset` 和 `showHistory` 开启预设颜色和历史颜色区域。历史颜色需要用户自行控制展示内容。

---

```vue  { "component": true } 
<template>
  <fk-color-picker
    default-value="#165DFF"
    :history-colors="history"
    show-history
    show-preset
    @popup-visible-change="addHistory"
  />
</template>

<script setup>
import { ref } from 'vue';

const history = ref(['#165DFF'])
const addHistory = (visible, color) => {
  if (!visible) {
    const index = history.value.indexOf(color);
    if (index !== -1) {
      history.value.splice(index, 1);
    }
    history.value.unshift(color);
  }
}
</script>
```
