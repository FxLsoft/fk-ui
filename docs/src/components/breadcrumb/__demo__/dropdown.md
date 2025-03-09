```yaml
title:
  zh-CN: 带有下拉菜单
  en-US: Dropdown menu
```


通过 `droplist` 或者 `routes` 来指定下拉菜单。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-breadcrumb :routes="routes"/>
    <fk-breadcrumb>
      <fk-breadcrumb-item>Home</fk-breadcrumb-item>
      <fk-breadcrumb-item :droplist="droplist">
        Channel
      </fk-breadcrumb-item>
      <fk-breadcrumb-item>News</fk-breadcrumb-item>
    </fk-breadcrumb>
    <fk-breadcrumb>
      <fk-breadcrumb-item>Home</fk-breadcrumb-item>
      <fk-breadcrumb-item>
        <template #droplist>
          <fk-doption>Option 1</fk-doption>
          <fk-dsubmenu value="option-1">
            <template #default>Option 2</template>
            <template #content>
              <fk-doption>Option 2-1</fk-doption>
              <fk-doption>Option 2-2</fk-doption>
              <fk-doption>Option 2-3</fk-doption>
            </template>
            <template #footer>
              <div style="padding: 6px; text-align: center;">
                <fk-button>Click</fk-button>
              </div>
            </template>
          </fk-dsubmenu>
          <fk-doption>Option 3</fk-doption>
        </template>
        Channel
      </fk-breadcrumb-item>
      <fk-breadcrumb-item>News</fk-breadcrumb-item>
    </fk-breadcrumb>
  </fk-space>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          path: '/',
          label: 'Home'
        },
        {
          path: '/channel',
          label: 'Channel',
          children: [
            {
              path: '/users',
              label: 'Users',
            },
            {
              path: '/permission',
              label: 'Permission',
            }
          ]
        },
        {
          path: '/news',
          label: 'News'
        },
      ],
      droplist: [
        {
          path: '/goods',
          label: 'Goods',
        },
        {
          path: '/wallet',
          label: 'Wallet',
        }
      ]
    }
  }
}
</script>
```
