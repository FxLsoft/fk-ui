```yaml
title:
  zh-CN: 触发方式
  en-US: Trigger
```


通过 `trigger` 指定触发方式。

---


```vue { "component": true } 
<template>
  <fk-radio-group v-model="trigger">
    <fk-radio value="click">click</fk-radio>
    <fk-radio value="hover">hover</fk-radio>
  </fk-radio-group>
  <fk-tabs default-active-key="1" :trigger="trigger">
    <fk-tab-pane key="1" title="Tab 1"> Content of Tab Panel 1 </fk-tab-pane>
    <fk-tab-pane key="2" title="Tab 2"> Content of Tab Panel 2 </fk-tab-pane>
    <fk-tab-pane key="3">
      <template #title>Tab 3</template>
      Content of Tab Panel 3
    </fk-tab-pane>
  </fk-tabs>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const trigger = ref('click');
    return {
      trigger,
    };
  },
};
</script>
```
