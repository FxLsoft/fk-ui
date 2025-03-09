```yaml
title:
  zh-CN: 展开图标位置
  en-US: Expand icon position
```


通过 `expand-icon-position` 属性设置展开图标的位置。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" :style="{ width: '100%' }">
    <fk-space>
      <fk-radio-group v-model="position" type="button">
        <fk-radio value="left">Left</fk-radio>
        <fk-radio value="right">Right</fk-radio>
      </fk-radio-group>
      <fk-checkbox v-model="hideIcon">Hide Expand Icon</fk-checkbox>
    </fk-space>
    <fk-collapse
      :default-active-key="['1']"
      :expand-icon-position="position"
      :show-expand-icon="!hideIcon"
    >
      <fk-collapse-item key="1" header="Aaaa Technology Co., Ltd.">
        <template #expand-icon>
          <icon-plus />
        </template>
        <template #extra>
          <fk-tag size="small">city</fk-tag>
        </template>
        <div>Aaaa Technology Co., Ltd.</div>
        <div>Aaaa Technology Co., Ltd.</div>
        <div>Aaaa Technology Co., Ltd.</div>
      </fk-collapse-item>
      <fk-collapse-item
        key="2"
        header="Aaaa Technology Co., Ltd."
        disabled
      >
        <div>Aaaa Technology Co., Ltd.</div>
        <div>Aaaa Technology Co., Ltd.</div>
        <div>Aaaa Technology Co., Ltd.</div>
      </fk-collapse-item>
      <fk-collapse-item key="3" header="Aaaa Technology Co., Ltd.">
        <div>Aaaa Technology Co., Ltd.</div>
        <div>Aaaa Technology Co., Ltd.</div>
        <div>Aaaa Technology Co., Ltd.</div>
      </fk-collapse-item>
    </fk-collapse>
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const position = ref('left');
    const hideIcon = ref(false);

    return {
      position,
      hideIcon,
    };
  },
};
</script>
```
