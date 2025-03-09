```yaml
title:
  zh-CN: 带边框的标签
  en-US: Bordered
```


通过参数 `bordered`，可以显示带边框的标签。

---


```vue { "component": true } 
<template>
   <fk-space wrap>
    <fk-tag bordered>default</fk-tag>
    <fk-tag v-for="(color, index) of colors" :key="index" :color="color" bordered>{{ color }}</fk-tag>
  </fk-space>
</template>

<script>
export default {
  setup() {
    const colors = [
      'orangered',
      'orange',
      'gold',
      'lime',
      'green',
      'cyan',
      'blue',
      'fkblue',
      'purple',
      'pinkpurple',
      'magenta',
      'gray'
    ];
    return {
      colors
    }
  },
}
</script>
```
