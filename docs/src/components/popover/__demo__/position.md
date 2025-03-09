```yaml
title:
  zh-CN: 弹出位置
  en-US: Popup Position
```


`Popover`支持 12 个不同的方位。分别为：`上左` `上` `上右` `下左` `下` `下右` `左上` `左` `左下` `右上` `右` `右下`。

---


```vue { "component": true } 
<template>
  <div :style="{position: 'relative', width: '440px', height: '280px'}">
    <fk-popover position="tl">
      <fk-button class="button" :style="{position: 'absolute',top:'0',left:'70px'}">TL</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover position="top">
      <fk-button class="button" :style="{position: 'absolute',top:'0',left:'180px'}">TOP</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover position="tr">
      <fk-button class="button" :style="{position: 'absolute',top:'0',left:'290px'}">TR</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover position="bl">
      <fk-button class="button" :style="{position: 'absolute',top:'240px',left:'70px'}">BL</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover position="bottom">
      <fk-button class="button" :style="{position: 'absolute',top:'240px',left:'180px'}">BOTTOM</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover position="br">
      <fk-button class="button" :style="{position: 'absolute',top:'240px',left:'290px'}">BR</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover position="lt">
      <fk-button class="button" :style="{position: 'absolute',top:'60px',left:'10px'}">LT</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover position="left">
      <fk-button class="button" :style="{position: 'absolute',top:'120px',left:'10px'}">LEFT</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover position="lb">
      <fk-button class="button" :style="{position: 'absolute',top:'180px',left:'10px'}">LB</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover position="rt">
      <fk-button class="button" :style="{position: 'absolute',top:'60px',left:'350px'}">RT</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover position="right">
      <fk-button class="button" :style="{position: 'absolute',top:'120px',left:'350px'}">RIGHT</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover position="rb">
      <fk-button class="button" :style="{position: 'absolute',top:'180px',left:'350px'}">RB</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
  </div>
</template>

<style scoped lang="less">
.button{
  width: 100px;
}
</style>
```
