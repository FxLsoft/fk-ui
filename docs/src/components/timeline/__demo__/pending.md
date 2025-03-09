```yaml
title:
  zh-CN: 幽灵节点
  en-US: Pending
```


当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，通过`slot#pending-dot`定制其轴点。

---


```vue { "component": true } 

<template>
  <fk-row align="center" :style="{ marginBottom: '24px' }">
    <fk-checkbox
      :checked="!!pendingProps.direction"
      @change="(v) => onChange({ direction: v ? 'horizontal' : '' })"
    >
      horizontal &nbsp; &nbsp;
    </fk-checkbox>
    <fk-checkbox
      :checked="!!pendingProps.reverse"
      @change="(v) => onChange({ reverse: v })"
    >
      reverse &nbsp; &nbsp;
    </fk-checkbox>
    <fk-checkbox
      :checked="!!pendingProps.pending"
      @change="
        (v) => onChange({ pending: v ? 'This is a pending dot' : false })
      "
    >
      pending &nbsp; &nbsp;
    </fk-checkbox>

    <fk-checkbox
      :checked="!!pendingProps.hasPendingDot"
      @change="(v) => onChange({ hasPendingDot: v })"
    >
      custom pendingDot
    </fk-checkbox>
  </fk-row>
  <fk-timeline v-bind="pendingProps">
    <template v-if="pendingProps.hasPendingDot" #dot>
      <IconFire :style="{ color: '#e70a0a' }" />
    </template>
    <fk-timeline-item label="2017-03-10" dot-color="#52C419">
      The first milestone
    </fk-timeline-item>
    <fk-timeline-item label="2018-05-12" dot-color="#F5222D">
      The second milestone
    </fk-timeline-item>
    <fk-timeline-item label="2020-09-30">The third milestone</fk-timeline-item>
  </fk-timeline>
</template>

<script>
import { ref } from 'vue';
import { IconFire } from '@erp/common';

export default {
  components: {
    IconFire,
  },
  setup() {
    const pendingProps = ref({});

    const onChange = (newProps) => {
      pendingProps.value = {
        ...pendingProps.value,
        ...newProps,
      };
    };

    return {
      pendingProps,
      onChange
    }
  },
};
</script>
```
