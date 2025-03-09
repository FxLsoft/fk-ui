```yaml
title:
  zh-CN: 自定义标题栏
  en-US: Custom Header
```


通过 `source-title` ,`target-title` 插槽自定义标题栏的渲染内容

---


```vue { "component": true } 
<template>
  <fk-transfer :data="data" :default-value="value">
    <template
      #source-title="{
        countTotal,
        countSelected,
        checked,
        indeterminate,
        onSelectAllChange,
      }"
    >
      <div :style="styleHeader">
        Source Title {{ countSelected }}-{{ countTotal }}
        <fk-checkbox
          :model-value="checked"
          :indeterminate="indeterminate"
          @change="onSelectAllChange"
        />
      </div>
    </template>

    <template #target-title="{ countTotal, countSelected, onClear }">
      <div :style="styleHeader">
        Target Title {{ countSelected }}-{{ countTotal }}
        <IconDelete @click="onClear" />
      </div>
    </template>
  </fk-transfer>
</template>

<script>
import { IconDelete } from '@erp/common';

export default {
  components: { IconDelete },
  setup() {
    const data = Array.from({length: 8})
      .fill(undefined)
      .map((_, index) => ({
        value: `option${index + 1}`,
        label: `Option ${index + 1}`,
      }));
    const value = ['option1', 'option3', 'option5'];

    const styleHeader = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: '8px'
    };

    return {
      styleHeader,
      data,
      value,
    };
  },
};
</script>
```
