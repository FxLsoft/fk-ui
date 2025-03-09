```yaml
title:
  zh-CN: 切换拦截
  en-US: Switch intercept
```


设置 `beforeChange` 函数，函数的返回值将用于判断是否阻止切换。

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-switch :before-change="handleChangeIntercept"/>
    <fk-switch type="round" :before-change="handleChangeIntercept2"/>
    <fk-switch type="line" :before-change="handleChangeIntercept3"/>
  </fk-space>
</template>

<script>
import { Message } from '@erp/common';

export default {
  setup() {
    const handleChangeIntercept = async (newValue) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return true
    }

    const handleChangeIntercept2 = async (newValue) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      if (!newValue) {
        Message.error("OH, You can't change")
        return false
      }
      return true
    }

    const handleChangeIntercept3 = async (newValue) => {
      await new Promise((_, reject) => setTimeout(() => {
        Message.error("OH, Something went wrong")
        reject()
      }, 1000))
      return true
    }

    return {
      handleChangeIntercept,
      handleChangeIntercept2,
      handleChangeIntercept3
    }
  }
}
</script>
```
