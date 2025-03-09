```yaml
title:
  zh-CN: 自定义节点
  en-US: Custom node
```


步骤条的基本用法。

---


```vue { "component": true } 

<template>
  <div>
    <fk-steps
      changeable
      label-placement="vertical"
      :current="current"
      @change="setCurrent"
    >
      <fk-step description="This is a description">
        Succeeded
        <template #node="slotProps">
          <fk-popover content="step tip" :popup-visible="current === 1">
            <span>{{ slotProps.step }}</span>
          </fk-popover>
        </template>
      </fk-step>
      <fk-step description="This is a description">
        Processing Succeeded
        <template #node="slotProps">
          <fk-popover content="step tip" :popup-visible="current === 2">
            <span>{{ slotProps.step }}</span>
          </fk-popover>
        </template>
      </fk-step>
      <fk-step description="This is a description"
      >Pending
        <template #node="slotProps">
          <fk-popover content="step tip" :popup-visible="current === 3">
            <span>{{ slotProps.step }}</span>
          </fk-popover>
        </template>
      </fk-step>
    </fk-steps>
    <div style="margin-top: 20px; text-align: center;">
      <fk-space size="large">
        <fk-button type="secondary" :disabled="current <= 1" @click="onPrev">
          <IconLeft />
          Back
        </fk-button>
        <fk-button type="primary" :disabled="current >= 3" @click="onNext">
          Next
          <IconRight />
        </fk-button>
      </fk-space>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const current = ref(1);

    const onPrev = () => {
      current.value = Math.max(1, current.value - 1);
    };

    const onNext = () => {
      current.value = Math.min(3, current.value + 1);
    };

    const setCurrent = (current) => {
      current.value = current;
    };

    return {
      current,
      onPrev,
      onNext,
      setCurrent
    }
  },
};
</script>
```
