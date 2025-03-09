```yaml
title:
  zh-CN: 可切换步骤条
  en-US: Changeable
```


设置 `changeable` 开启点击切换步骤。

---


```vue { "component": true } 
<template>
  <div>
    <fk-steps changeable :current="current" @change="setCurrent">
      <fk-step description="This is a description">Succeeded</fk-step>
      <fk-step description="This is a description">Processing</fk-step>
      <fk-step description="This is a description">Pending</fk-step>
    </fk-steps>
    <div
:style="{
          width: '100%',
          height: '200px',
          textAlign: 'center',
          background: 'var(--color-bg-2)',
          color: '#C2C7CC',
        }">
      <div style="line-height: 160px;">Step{{current}} Content</div>
      <fk-space size="large">
        <fk-button type="secondary" :disabled="current <= 1" @click="onPrev">
          <IconLeft/> Back
        </fk-button>
        <fk-button type="primary" :disabled="current >= 3" @click="onNext">
          Next <IconRight/>
        </fk-button>
      </fk-space>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 1,
    };
  },
  methods: {
    onPrev() {
      this.current = Math.max(1, this.current - 1)
    },

    onNext() {
      this.current = Math.min(3, this.current + 1)
    },

    setCurrent(current) {
      this.current = current
    }
  }
};
</script>
```
