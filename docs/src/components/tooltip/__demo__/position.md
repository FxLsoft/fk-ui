```yaml
title:
  zh-CN: 位置
  en-US: Position
```


文字气泡支持 12 个不同的方位。分别为：`上左`、`上`、`上右`、`下左`、`下`、`下右`、`左上`、`左`、`左下`、`右上`、`右`、`右下`。

---


```vue { "component": true } 
<template>
  <div :style="{position: 'relative', width: '440px', height: '280px'}">
    <fk-tooltip content="This is a Tooltip" position="tl">
      <fk-button class="button" :style="{position: 'absolute',top:'0',left:'70px'}">TL</fk-button>
    </fk-tooltip>
    <fk-tooltip content="This is a Tooltip" position="top">
      <fk-button class="button" :style="{position: 'absolute',top:'0',left:'180px'}">TOP</fk-button>
    </fk-tooltip>
    <fk-tooltip content="This is a Tooltip" position="tr">
      <fk-button class="button" :style="{position: 'absolute',top:'0',left:'290px'}">TR</fk-button>
    </fk-tooltip>
    <fk-tooltip content="This is a Tooltip" position="bl">
      <fk-button class="button" :style="{position: 'absolute',top:'240px',left:'70px'}">BL</fk-button>
    </fk-tooltip>
    <fk-tooltip content="This is a Tooltip" position="bottom">
      <fk-button class="button" :style="{position: 'absolute',top:'240px',left:'180px'}">BOTTOM</fk-button>
    </fk-tooltip>
    <fk-tooltip content="This is a Tooltip" position="br">
      <fk-button class="button" :style="{position: 'absolute',top:'240px',left:'290px'}">BR</fk-button>
    </fk-tooltip>
    <fk-tooltip content="This is a Tooltip" position="lt">
      <fk-button class="button" :style="{position: 'absolute',top:'60px',left:'10px'}">LT</fk-button>
    </fk-tooltip>
    <fk-tooltip content="This is a Tooltip" position="left">
      <fk-button class="button" :style="{position: 'absolute',top:'120px',left:'10px'}">LEFT</fk-button>
    </fk-tooltip>
    <fk-tooltip content="This is a Tooltip" position="lb">
      <fk-button class="button" :style="{position: 'absolute',top:'180px',left:'10px'}">LB</fk-button>
    </fk-tooltip>
    <fk-tooltip content="This is a Tooltip" position="rt">
      <fk-button class="button" :style="{position: 'absolute',top:'60px',left:'350px'}">RT</fk-button>
    </fk-tooltip>
    <fk-tooltip content="This is a Tooltip" position="right">
      <fk-button class="button" :style="{position: 'absolute',top:'120px',left:'350px'}">RIGHT</fk-button>
    </fk-tooltip>
    <fk-tooltip content="This is a Tooltip" position="rb">
      <fk-button class="button" :style="{position: 'absolute',top:'180px',left:'350px'}">RB</fk-button>
    </fk-tooltip>
  </div>
</template>

<style scoped>
.button {
  width: 100px;
}
</style>
```
