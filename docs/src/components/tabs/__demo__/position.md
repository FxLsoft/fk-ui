```yaml
title:
  zh-CN: 位置
  en-US: Position
```


通过 `position` 属性可以自定义标签栏的位置。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-radio-group v-model="position" type="button">
      <fk-radio value="top">Top</fk-radio>
      <fk-radio value="right">Right</fk-radio>
      <fk-radio value="bottom">Bottom</fk-radio>
      <fk-radio value="left">Left</fk-radio>
    </fk-radio-group>
    <fk-tabs :position="position">
      <fk-tab-pane key="1" title="Tab 1">
        Content of Tab Panel 1
      </fk-tab-pane>
      <fk-tab-pane key="2" title="Tab 2">
        Content of Tab Panel 2
      </fk-tab-pane>
      <fk-tab-pane key="3" title="Tab 3">
        Content of Tab Panel 3
      </fk-tab-pane>
    </fk-tabs>
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const position = ref('top');

    return {
      position
    }
  },
}
</script>
```
