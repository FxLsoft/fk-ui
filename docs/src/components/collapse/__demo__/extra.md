```yaml
title:
  zh-CN: 额外节点
  en-US: Extra slot
```


通过 `extra` 可以设置额外节点。`extra` 单击可以以设置 `stop` 修饰符，以阻止当前项目展开。

---


```vue { "component": true } 
<template>
  <fk-collapse>
    <fk-collapse-item key="1" header="Aaaa Technology Co., Ltd.">
      <template #extra>
        <icon-copy />
      </template>
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item :key="2" header="Aaaa Technology Co., Ltd.">
      <template #extra>
        <fk-button type="primary" size="mini" @click.stop="sayHello">hello</fk-button>
      </template>
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item key="3" header="Aaaa Technology Co., Ltd.">
      <template #extra>
        <fk-tag size="small">city</fk-tag>
      </template>
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
  </fk-collapse>
</template>

<script>
import { Message } from '@erp/common';

export default {
  setup() {
    const sayHello = () => {
      Message.info('hello');
    };

    return {
      sayHello,
    };
  },
};
</script>
```
