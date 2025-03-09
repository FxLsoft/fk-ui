```yaml
title:
  zh-CN: 自动调整字体大小
  en-US: Auto Fix Font Size
```


如果头像是文字的话，会自动调节字体大小，来适应头像框。

---

```vue { "component": true } 

<template>
  <fk-avatar
    :style="{
      marginRight: '24px',
      verticalAlign: 'middle',
      backgroundColor: '#14a9f8',
    }"
  >
    {{ text }}
  </fk-avatar>
  <fk-button
    type="secondary"
    :style="{ verticalAlign: 'middle' }"
    @click="onClick"
  >
    Change
  </fk-button>
</template>

<script>
import { computed, ref } from 'vue';

const list = ['B', 'AAAA', 'Design', 'Tom', 'AD'];
export default {
  setup() {
    const index = ref(0);
    const text = computed(() => list[index.value])

    const onClick = () => {
      index.value = index.value >= list.length - 1 ? 0 : index.value + 1;
    };

    return {
      text,
      onClick
    }
  },
};
</script>
```
