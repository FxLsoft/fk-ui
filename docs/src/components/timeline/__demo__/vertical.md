```yaml
title:
  zh-CN: 纵向时间轴
  en-US: Vertical
```


竖直方向的时间轴。

---


```vue { "component": true } 
<template>
  <div>
    <fk-row align="center" :style="{ marginBottom: '24px' }">
      <fk-typography-text>mode: &nbsp; &nbsp;</fk-typography-text>
      <fk-radio-group :model-value="mode" @change="onChange">
        <fk-radio value="left">left</fk-radio>
        <fk-radio value="right">right</fk-radio>
        <fk-radio value="alternate">alternate</fk-radio>
      </fk-radio-group>
    </fk-row>
    <fk-timeline :mode="mode" label-position="relative">
      <fk-timeline-item label="2012-08">
        <fk-row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <img
            width="40"
            :style="{ marginRight: '16px', marginBottom: '12px' }"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b5d834b83708a269b4562924436eac48.png~tplv-uwbnlip3yd-png.png"
          />
          <div :style="{ marginBottom: '12px' }">
            Aaaa
            <div :style="{ fontSize: '12px', color: '#4E5969' }">
              Founded in 2012
            </div>
          </div>
        </fk-row>
      </fk-timeline-item>
      <fk-timeline-item label="2017-05">
        <fk-row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <img
            width="40"
            :style="{ marginRight: '16px', marginBottom: '12px' }"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
          />
          <div :style="{ marginBottom: '12px' }">
            Xigua Video
            <div :style="{ fontSize: '12px', color: '#4E5969' }">
              Founded in 2017
            </div>
          </div>
        </fk-row>
      </fk-timeline-item>
      <fk-timeline-item label="2018-07">
        <fk-row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <img
            width="40"
            :style="{ marginRight: '16px', marginBottom: '12px' }"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
          />
          <div :style="{ marginBottom: '12px' }">
            Pipidance
            <div :style="{ fontSize: '12px', color: '#4E5969' }">
              Founded in 2018
            </div>
          </div>
        </fk-row>
      </fk-timeline-item>
    </fk-timeline>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const mode = ref('left');

    const onChange = (_mode) => {
      mode.value = _mode;
    };

    return {
      mode,
      onChange
    }
  },
};
</script>
```
