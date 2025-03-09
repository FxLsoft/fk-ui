```yaml
title:
  zh-CN: 自定义 data 的字段名称
  en-US: Customize data
```


通过 `fieldNames` 字段可以自定义 data 的字段名。

---


```vue { "component": true } 
<template>
  <fk-tree
    :default-selected-keys="['0-0-1']"
    :field-names="{
      key: 'value',
      title: 'label',
      children: 'items',
      icon: 'customIcon'
    }"
    :data="treeData"
  />
</template>
<script>
  import { h } from 'vue';
  import { IconDriveFile, IconStar } from '@erp/common';
  export default {
    data() {
      return {
        treeData,
      };
    },
  };

  const treeData = [
    {
      label: 'Trunk 0-0',
      value: '0-0',
      items: [
        {
          label: 'Branch 0-0-2',
          value: '0-0-2',
          selectable: false,
          customIcon: () => h(IconDriveFile),
          items: [
            {
              label: 'Leaf',
              value: '0-0-2-1',
              items: [
                {
                  label: 'Leaf 0-0-2',
                  value: '0-0-2-1-0',
                  items: [
                    {
                      label: 'Leaf',
                      customIcon: () => h(IconStar),
                      value: '0-0-2-1-0-0'
                    }
                  ]
                },
              ],
            }
          ]
        },
      ],
    },
    {
      label: 'Trunk 0-1',
      value: '0-1',
      items: [
        {
          label: 'Branch 0-1-1',
          value: '0-1-1',
          items: [
            {
              label: 'Leaf',
              value: '0-1-1-0',
            }
          ]
        },
      ],
    },
  ];
</script>
```
