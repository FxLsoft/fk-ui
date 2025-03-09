```yaml
title:
  zh-CN: 多层嵌套
  en-US: Nest
```


弹出层可以嵌套在另一个弹出层内。

---


```vue { "component": true } 
<template>
  <fk-trigger trigger="click">
    <fk-button>Click Me</fk-button>
    <template #content>
      <div class="trigger-demo-nest">
        <fk-empty />
        <fk-trigger position="right">
          <fk-button>Hover Me</fk-button>
          <template #content>
            <div class="trigger-demo-nest">
              <fk-empty />
              <fk-trigger trigger="click" position="right">
                <fk-button>Click Me</fk-button>
                <template #content>
                  <div class="trigger-demo-nest">
                    <fk-empty />
                    <fk-trigger position="right">
                      <fk-button>Hover Me</fk-button>
                      <template #content>
                        <fk-empty class="trigger-demo-nest" />
                      </template>
                    </fk-trigger>
                  </div>
                </template>
              </fk-trigger>
            </div>
          </template>
        </fk-trigger>
      </div>
    </template>
  </fk-trigger>
</template>

<style scoped>
.trigger-demo-nest {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.trigger-demo-nest-popup-content {
  text-align: right;
}
</style>
```
