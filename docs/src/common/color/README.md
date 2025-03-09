# 颜色
组件库内置了一套符合人眼视觉的色彩算法。

## 简介
组件库内置了一套基于动态梯度的色彩算法，并且在亮色的色彩算法基础上，经过反转和微调，得到了一套暗黑模式下的色彩算法。

色板中包含了 13 个常见的颜色，每个颜色分为 10 个梯度。通常，我们把 6 号色作为色板中的主色。

<!--@include: ./__demo__/basic.md-->

## 业务颜色

<ClientOnly>
  <ColorBiz />
</ClientOnly>


## 颜色系统

<ClientOnly>
  <ColorPanel />
</ClientOnly>

<script setup>
import ColorPanel from './__demo__/color-panel.vue';
import ColorBiz from './__demo__/color-biz.vue'
</script>
