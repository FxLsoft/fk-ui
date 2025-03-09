# 商品上传组件


## API


### `<shop-upload>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|@ zh 绑定值|`ShopUploadItem`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|accept|文件类型|`string`|`'image'`|
|multiple|是否可以多长图片上传|`boolean`|`false`|
|width|上传图片宽度|`number`|`120`|
|height|上传图片高度|`number`|`120`|
|action|上传地址|`string`|`-`|
|max-siz|最大上传大小|`number`|`5`|
|limit|最大上传数量|`number`|`function(props) { if (props.multiple) { return 5; } else { return 1; } }`|
|hover-preview|预览数量|`boolean`|`true`|
|preview-width|预览图片宽度|`number`|`240`|
|image-url-formatter|图片地址格式化|`(item: ShopUploadItem, type: ImageViewType) => string`|`-`|
|draggable|是否可拖拽 DraggableProps|`boolean \| DraggableProps`|`false`|
|tip|提示|`string`|`-`|
### `<shop-upload>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|name|footer slot|fileItem: `FileItem`<br>index: `Number`|


