```yaml
title:
  zh-CN: 标签文本位置
  en-US: Label Position
```


通过 `labelPosition` 可以设置标签文本的位置。

---


```vue { "component": true } 
<template>
  <div>
    <fk-row align="center">
      <fk-typography-text>labelPosition: &nbsp; &nbsp;</fk-typography-text>
      <fk-radio-group :model-value="pos" @change="onLabelPositionChange">
        <fk-radio value="same">same</fk-radio>
        <fk-radio value="relative">relative</fk-radio>
      </fk-radio-group>
    </fk-row>
    <fk-row align="center" :style="{ margin: '20px 0px 24px' }">
      <fk-typography-text>mode: &nbsp; &nbsp;</fk-typography-text>
      <fk-radio-group :model-value="mode" @change="onModeChange">
        <fk-radio value="left">left</fk-radio>
        <fk-radio value="right">right</fk-radio>
        <fk-radio value="alternate">alternate</fk-radio>
      </fk-radio-group>
    </fk-row>
    <fk-timeline :mode="mode" :label-position="pos">
      <fk-timeline-item label="2017-03-10" dot-color="#52C419">
        The first milestone
      </fk-timeline-item>
      <fk-timeline-item
        label="2018-05-12"
        dot-color="#F5222D"
        label-position="same"
      >
        The second milestone
      </fk-timeline-item>
      <fk-timeline-item label="2020-09-30" position="bottom">
        The third milestone
      </fk-timeline-item>
    </fk-timeline>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const mode = ref('left');
    const pos = ref('same');

    const onLabelPositionChange = (_pos) => {
      pos.value = _pos;
    };

    const onModeChange = (_mode) => {
      mode.value = _mode;
    };

    return {
      mode,
      pos,
      onLabelPositionChange,
      onModeChange
    }
  },
};
</script>
```
