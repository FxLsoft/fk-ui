```yaml
title:
  zh-CN: 错误状态
  en-US: Error state
```


当加载图片失败的时候显示的内容。

---


```vue { "component": true } 
<template>
  <fk-space :size="20">
    <fk-image
      width="300"
      height="200"
      src="some-error.png"
    />
    <fk-image
      width="300"
      height="200"
      src="some-error.png"
      alt="This is a picture of humans eating ice cream. The humans on the screen are very happy just now. The ice cream is green, it seems to be flavored with matcha. The gender of the human is unknown. It has very long hair and the human hair is brown."
    />
  </fk-space>
</template>
```
