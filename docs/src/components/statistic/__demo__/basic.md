```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


当需要突出某个或某组数字或展示带描述的统计类数据时使用。

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-statistic title="Downloads" :value="125670" show-group-separator />
    <fk-statistic extra="Comments" :value="40509" :precision="2" />
  </fk-space>
</template>
```
