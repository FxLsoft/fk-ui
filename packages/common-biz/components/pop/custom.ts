import { h } from 'vue';
import { IconCopy, IconDownload, Image, ImagePreviewAction, isNumber } from '@erp/common';
import { copyImageByUrl, downloadImageByUrl } from '../../utils';
import { pop } from '.';

/**
 * 添加图片组预览
 * @param srcList
 * @param params 如果为number类型，则为图片组件的index，copy自定义复制事件，download自定义下载事件，previewUrlFormatter
 * @returns
 */
export function createImagePreviewPop(
	srcList: string[] | string,
	params?: number | { current?: number; copy?: (url: string) => void; download?: (url: string) => void; previewUrlFormatter?: (url: string) => string },
) {
	if (!Array.isArray(srcList)) {
		srcList = [srcList];
	}
	if (isNumber(params)) {
		params = {
			current: params,
		};
	}
	const actions = ({ url }) => [
		h(
			ImagePreviewAction,
			{
				name: '复制',
				onClick() {
					if (params?.copy) {
						params.copy(url);
					} else {
						copyImageByUrl(url);
					}
				},
			},
			{
				default: () => h(IconCopy),
			},
		),
		h(
			ImagePreviewAction,
			{
				name: '下载',
				onClick() {
					if (params?.download) {
						params.download(url);
					} else {
						downloadImageByUrl(url);
					}
				},
			},
			{
				default: () => h(IconDownload),
			},
		),
	];
	if (srcList.length < 2) {
		return pop.createPage(
			h(Image.Preview, null, {
				actions,
			}),
			{
				src: srcList[0] ?? '',
				renderToBody: false,
				visible: true,
			},
		);
	} else {
		return pop.createPage(
			h(Image.PreviewGroup, null, {
				actions,
			}),
			{
				srcList,
				defaultCurrent: params.current,
				renderToBody: false,
				visible: true,
				previewUrlFormatter: params.previewUrlFormatter,
			},
		);
	}
}
