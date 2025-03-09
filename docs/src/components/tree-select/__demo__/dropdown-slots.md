```yaml
title:
  zh-CN: 下拉框的页头和页脚
  en-US: Dropdown Header and Footer
```


自定义树选择下拉框的页头和页脚

---


```vue { "component": true } 
<template>
  <fk-form layout="inline" :model="form">
   <fk-form-item label="empty">
      <fk-switch v-model="form.empty" />
    </fk-form-item>
    <fk-form-item label="showHeaderOnEmpty">
      <fk-switch v-model="form.showHeaderOnEmpty" />
    </fk-form-item>
    <fk-form-item label="showFooterOnEmpty">
      <fk-switch v-model="form.showFooterOnEmpty" />
    </fk-form-item>
  </fk-form>
  <fk-tree-select
    style="width: 300px"
    placeholder="Please select ..."
    :data="computedTreeData"
    :show-header-on-empty="form.showHeaderOnEmpty"
    :show-footer-on-empty="form.showFooterOnEmpty"
  >
    <template #header>
      <div style="padding: 6px 12px;" >
        <fk-checkbox value="1">All</fk-checkbox>
      </div>
    </template>
      <template #footer>
      <div style="padding: 6px 0; text-align: center;">
        <fk-button>Click Me</fk-button>
      </div>
    </template>
  </fk-tree-select>
</template>
<script>
  import { computed, h, reactive } from 'vue';
  import { IconCalendar } from '@erp/common';

  export default {
    setup() {
      const form = reactive({
        empty: false,
        showHeaderOnEmpty: false,
        showFooterOnEmpty: false,
      });

      const treeData = [
        {
          key: 'node1',
          icon: () => h(IconCalendar),
          title: 'Trunk',
          children: [
            {
              key: 'node2',
              title: 'Leaf',
            },
          ],
        },
        {
          key: 'node3',
          title: 'Trunk2',
          icon: () => h(IconCalendar),
          children: [
            {
              key: 'node4',
              title: 'Leaf',
            },
            {
              key: 'node5',
              title: 'Leaf',
            },
          ],
        },
        {
          key: 'node6',
          title: 'Trunk3',
          icon: () => h(IconCalendar),
          children: [
            {
              key: 'node7',
              title: 'Leaf',
            },
            {
              key: 'node8',
              title: 'Leaf',
            },
          ],
        },
      ];

      const computedTreeData = computed(() => {
        return form.empty ? [] : treeData;
      });

      return {
        form,
        computedTreeData,
      };
    },
  };
</script>
```
