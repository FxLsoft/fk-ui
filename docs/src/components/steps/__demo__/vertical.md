```yaml
title:
  zh-CN: 竖直步骤条
  en-US: Vertical Steps
```


竖直方向的步骤条。

---


```vue { "component": true } 
<template>
  <div class="frame-bg">
    <div class="frame-body">
      <div class="frame-aside">
        <fk-steps :current="current" direction="vertical">
          <fk-step>Succeeded</fk-step>
          <fk-step>Processing</fk-step>
          <fk-step>Pending</fk-step>
        </fk-steps>
      </div>
      <div class="frame-main">
        <div class="main-content">The content of this step.</div>
        <div class="main-bottom">
          <fk-button :disabled="current===1" @click="onPrev">
            <icon-left />
            Back
          </fk-button>
          <fk-button :disabled="current===3" @click="onNext">
            Next
            <icon-right />
          </fk-button>
        </div>
      </div>
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

    return {
      current,
      onPrev,
      onNext,
    }
  },
};
</script>

<style scoped lang="less">
.frame-bg {
  max-width: 780px;
  padding: 40px;
  background: var(--color-fill-2);
}

.frame-body {
  display: flex;
  background: var(--color-bg-2);
}

.frame-aside {
  padding: 24px;
  height: 272px;
  border-right: 1px solid var(--color-border);
}

.frame-main {
  width: 100%;
}

.main-content {
  text-align: center;
  line-height: 200px;
}

.main-bottom {
  display: flex;
  justify-content: center;

  button {
    margin: 0 20px;
  }
}
</style>
```
