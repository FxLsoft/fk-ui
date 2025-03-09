```yaml
title:
  zh-CN: 自定义节点
  en-US: Custom node
```


通过插槽自定义内容，或者设置相应属性来控制显示或隐藏。

---


```vue { "component": true } 
<template>
  <fk-checkbox-group v-model="custom" :options="['hide header', 'hide footer', 'hide cancel']"/>
  <div :style="{marginTop: '20px'}">
    <fk-button type="primary" @click="handleClick">Open Drawer</fk-button>
  </div>
  <fk-drawer
    :width="340"
    :header="!custom.includes('hide header')"
    :footer="!custom.includes('hide footer')"
    :hide-cancel="custom.includes('hide cancel')"
    :visible="visible"
    unmount-on-close
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #header>
      <span>Header and title</span>
    </template>
    <div>
      You can customize modal body text by the current situation. This modal will be closed immediately once you
      press the OK button.
    </div>
  </fk-drawer>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);
    const custom = ref([])

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
      custom,
      visible,
      handleClick,
      handleOk,
      handleCancel
    }
  },
};
</script>
```
