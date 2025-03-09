# 弹窗交互组件

-   弹窗交互组件包括消息确认弹窗、Modal 弹窗、Message、drawer 抽屉等组件
-   弹窗类组件全部用命令模式来替换声明式的开发方式，使弹窗跟页面跟符合高内聚低耦合的设计思想
-   弹窗组件所有交互规范满足 Promise，其中 resolve 是用户在弹窗里有正常的操作后关闭，reject 是没有操作任何消息而关闭或者直接关闭弹窗。

## 对话确认框

二次确认提示消息弹窗

`pop.confirm`

```vue { "component": true }
<template>
	<fk-button type="primary" @click="handleConfirm">确认对话框</fk-button>
</template>
<script setup lang="ts">
import { pop } from '@erp/biz';

const handleConfirm = () => {
	pop.confirm('确认提示信息？')
		.then(() => {
			console.log('确认...');
		})
		.catch(e => {
			console.log('取消...');
		});
};
</script>
```

## 打开`page`弹窗

`pop.createPage`

<ClientOnly>
  <PageDemo />
</ClientOnly>

::: code-group

<<< ./__demo__/page-demo.vue

<<< ./__demo__/custom-page.vue

:::

## 打开`modal`弹窗

`pop.createModal`

<ClientOnly>
  <ModalDemo />
</ClientOnly>

::: code-group

<<< ./__demo__/modal-demo.vue

<<< ./__demo__/columns-config.vue

:::

### 弹窗内容

> [!CAUTION] 其他都已经封装，只需要开发主要的业务内容 `./__demo__/columns-config.vue`

## 打开`drawer`弹窗

`pop.createDrawer`

<ClientOnly>
  <DrawerDemo />
</ClientOnly>

::: code-group

<<< ./__demo__/drawer-demo.vue

<<< ./__demo__/default.vue

:::

## 打开`message`消息提示弹窗

`pop.info()` `pop.success()` `pop.warning()` `pop.error()`

```vue { "component": true }
<template>
	<fk-space>
		<fk-button @click="handleInfo">普通消息</fk-button>
		<fk-button status="success" @click="handleSuccess">成功消息 </fk-button>
		<fk-button status="warning" @click="handleWarning">警告消息 </fk-button>
		<fk-button status="danger" @click="handleError">错误消息</fk-button>
	</fk-space>
</template>
<script setup lang="ts">
import { pop } from '@erp/biz';

const handleSuccess = () => {
	pop.success('This is a success message!');
};

const handleInfo = () => {
	pop.info('This is an info message!');
};

const handleWarning = () => {
	pop.warning('This is an warning message!');
};

const handleError = () => {
	pop.error('This is an error message!');
};
</script>
```

## 打开`notification`消息通知弹窗

`pop.inf()` `pop.succ()` `pop.warn()` `pop.err()`

```vue { "component": true }
<template>
	<fk-space>
		<fk-button @click="handleInf">普通通知</fk-button>
		<fk-button status="success" @click="handleSucc">成功通知 </fk-button>
		<fk-button status="warning" @click="handleWarn">警告通知 </fk-button>
		<fk-button status="danger" @click="handleErr">错误通知</fk-button>
	</fk-space>
</template>

<script setup lang="ts">
import { pop } from '@erp/biz';

const handleSucc = () => {
	pop.succ('This is a success Notification!');
};

const handleInf = () => {
	pop.inf('This is an info Notification!');
};

const handleWarn = () => {
	pop.warn('This is an warning Notification!');
};

const handleErr = () => {
	pop.err('This is an error Notification!');
};
</script>
```

<script setup>
import PageDemo from './__demo__/page-demo.vue';
import ModalDemo from './__demo__/modal-demo.vue';
import DrawerDemo from './__demo__/drawer-demo.vue';
</script>
