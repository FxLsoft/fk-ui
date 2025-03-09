```yaml
title:
  zh-CN: 不同类型
  en-US: Types
```


通过 `type` 可以设置标签的类型。

---


```vue { "component": true } 

<template>
  <fk-space direction="vertical" size="large">
    <fk-radio-group v-model="type" type="button">
      <fk-radio value="line">Line</fk-radio>
      <fk-radio value="card">Card</fk-radio>
      <fk-radio value="card-gutter">Card Gutter</fk-radio>
      <fk-radio value="card-radian">Card Radian</fk-radio>
      <fk-radio value="text">Text</fk-radio>
      <fk-radio value="rounded">Rounded</fk-radio>
      <fk-radio value="capsule">Capsule</fk-radio>
    </fk-radio-group>
    <fk-radio-group v-model="size" type="button">
      <fk-radio value="mini">Mini</fk-radio>
      <fk-radio value="small">Small</fk-radio>
      <fk-radio value="medium">Medium</fk-radio>
      <fk-radio value="large">Large</fk-radio>
    </fk-radio-group>
    <fk-tabs :type="type" :size="size">
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
    const type = ref('line');
    const size = ref('medium');

    return {
      type,
      size
    }
  },
}
</script>
```
