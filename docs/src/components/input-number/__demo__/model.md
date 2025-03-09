```yaml
title:
  zh-CN: v-model 的触发事件
  en-US: Trigger event of v-model
```


数字输入框默认在 blur 或者按下 Enter 时会修改绑定的值，通过设置属性 model-event="input" 让组件在输入时修改绑定的值。
注意：在此模式下，输入时的值会超出设置的 min/max，组件会在失焦时修正值的大小。

---


```vue { "component": true } 
<template>
  <fk-input-number v-model="value" :style="{width:'320px'}" placeholder="Please Enter" class="input-demo" :min="10" :max="100" model-event="input"/>
  <div>value: {{value}}</div>
</template>

<script>
export default {
  data(){
    return {
      value:15
    }

  }
}
</script>
```
