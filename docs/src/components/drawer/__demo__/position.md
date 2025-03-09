```yaml
title:
  zh-CN: 抽屉位置
  en-US: Position
```


自定义位置，点击触发按钮抽屉从相应的位置滑出。

---


```vue { "component": true } 
<template>
  <fk-radio-group v-model="position">
    <fk-radio value="top">Top</fk-radio>
    <fk-radio value="right">Right</fk-radio>
    <fk-radio value="bottom">Bottom</fk-radio>
    <fk-radio value="left">Left</fk-radio>
  </fk-radio-group>
  <div :style="{marginTop: '20px'}">
    <fk-button type="primary" @click="handleClick">Open Drawer</fk-button>
  </div>
  <fk-drawer
    :width="340"
    :height="340"
    :visible="visible"
    :placement="position"
    unmount-on-close
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </fk-drawer>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);
    const position = ref('right');

    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
    }

    return {
      visible,
      position,
      handleClick,
      handleOk,
      handleCancel
    }
  },
};
</script>
```
