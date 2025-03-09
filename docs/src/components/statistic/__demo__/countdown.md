```yaml
title:
  zh-CN: 倒计时组件
  en-US: Countdown
```


倒计时组件 `countdown` 的基本使用方法。

---


```vue { "component": true } 
<template>
  <fk-row>
    <fk-col :flex="1">
      <fk-countdown
        title="Countdown"
        :value="now + 1000 * 60 * 60 * 2"
        :now="now"
      />
    </fk-col>
    <fk-col :flex="1">
      <fk-countdown
        title="Milliseconds"
        :value="now + 1000 * 60 * 60 * 2"
        :now="now"
        format="HH:mm:ss.SSS"
      />
    </fk-col>
    <fk-col :flex="1">
      <fk-countdown
        title="Days"
        :value="now + 1000 * 60 * 60 * 24 * 4"
        :now="now"
        format="D 天 H 时 m 分 s 秒"
      />
    </fk-col>
  </fk-row>
  <fk-space direction="vertical" style="margin-top: 10px">
    <fk-countdown
      title="Trigger on finish"
      :value="Date.now() + 5 * 1000"
      format="mm:ss.SSS"
      :now="Date.now()"
      :start="start"
      @finish="handleFinish"
    />
    <fk-button type="primary" @click="start = true">Start</fk-button>
  </fk-space>
</template>

<script>
import { ref } from 'vue';
import { Message } from '@erp/common';

export default {
  setup() {
    const now = Date.now();
    const start = ref(false);

    const handleFinish = () => {
      Message.info('Finish');
    };

    return {
      now,
      start,
      handleFinish,
    };
  },
};
</script>
```
