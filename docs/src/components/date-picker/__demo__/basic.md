```yaml
title:
  zh-CN: 基本用法
  en-US: Basic
```

日期输入器的基础使用。

---

```vue { "component": true }
<template>
  <fk-date-picker style="width: 200px;" />
</template>
```

```vue { "component": true }
<template>
  <fk-range-picker
    style="width: 240px; marginBottom: 20px;"
    @change="onChange"
    @select="onSelect"
  />
  <br />
  <fk-date-picker
    style="width: 240px; margin-bottom: 20px; margin-right: 24px;"
    shortcuts-position="left"
    :shortcuts="shortcuts"
  />
  <br />
  <fk-range-picker
    style="width: 240px;"
    shortcuts-position="left"
    :shortcuts="rangeShortcuts"
  />
</template>

<script>
import dayjs from 'dayjs';

export default {
  setup() {
    return {
      dayjs,
      shortcuts: [
        {
          label: '今天',
          value: () => dayjs(),
        },
        {
          label: '昨天',
          value: () => dayjs().subtract(1, 'day')
        },
        {
          label: '最近一周',
          value: () => dayjs().add(1, 'week'),
        },
        {
          label: '最近一月',
          value: () => dayjs().add(1, 'month'),
        },
        {
          label: '最近两月',
          value: () => dayjs().add(2, 'month'),
        }
      ],
      rangeShortcuts: [
        {
          label: '今天',
          value: () => [dayjs(), dayjs()],
        },
        {
          label: '昨天',
          value: () => [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
        },
        {
          label: '上周',
          value: () => [dayjs().startOf('week').subtract(7, 'day'), dayjs().endOf('week').subtract(7, 'day')],
        },
        {
          label: '上月',
          value: () => [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
        },
        {
          label: '本月',
          value: () => [dayjs().startOf('month'), dayjs().endOf('month')],
        },
        {
          label: '最近7天',
          value: () => [dayjs().subtract(7 - 1, 'day'), dayjs()],
        },
        {
          label: '最近30天',
          value: () => [dayjs().subtract(30 - 1, 'day'), dayjs()],
        },
        {
          label: '最近60天',
          value: () => [dayjs().subtract(60 - 1, 'day'), dayjs()],
        },
        {
          label: '最近90天',
          value: () => [dayjs().subtract(90 - 1, 'day'), dayjs()],
        },
      ],
      onSelect(dateString, date) {
        console.log('onSelect', dateString, date);
      },
      onChange(dateString, date) {
        console.log('onChange:', dateString, date);
      },
    };
  },
}
</script>
```
