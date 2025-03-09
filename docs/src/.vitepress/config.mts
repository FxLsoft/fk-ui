import { defineConfig } from 'vitepress';
import componentsRouters from '../components/path';

// https://vitepress.dev/reference/site-config
export default async ({ mode, command }) => {
	return defineConfig({
		title: '商品衣诚-ERP 组件库',
		description: '商品衣诚-ERP 组件库',
		outDir: '../dist',
		ignoreDeadLinks: true,
		markdown: {
			lineNumbers: true,
			theme: { light: 'github-light', dark: 'github-dark' },
			image: {
				// 默认禁用图片懒加载
				lazyLoading: true,
			},
		},
		themeConfig: {
			// https://vitepress.dev/reference/default-theme-config
			logo: '/logo.svg',
			nav: [
				{ text: '首页', link: '/' },
				{ text: 'Examples', link: '/common/input/README' },
			],
			search:
				mode === 'development'
					? undefined
					: {
							provider: 'local',
					  },
			sidebar: [
				{
					text: '开发指南',
					items: [
						{
							text: '颜色',
							link: '/common/color/README',
						},
						{
							text: '图标',
							link: '/common/icon/README',
						},
					],
				},
				{
					text: '自定义组件',
					items: [
						{
							text: '输入组件',
							link: '/common/input/README',
							// items: [
							// 	{
							// 		text: '输入框',
							// 		link: '/common/input/__demo__/text.md',
							// 	},
							// 	{
							// 		text: '文本域',
							// 		link: '/common/input/__demo__/textarea.md',
							// 	},
							// 	{
							// 		text: '数字输入框',
							// 		link: '/common/input/__demo__/number.md',
							// 	},
							// 	{
							// 		text: '密码输入框',
							// 		link: '/common/input/__demo__/password.md',
							// 	},
							// ],
						},
						{
							text: '弹窗类组件',
							link: '/common/modal/README',
						},
						{
							text: '动态表单',
							link: '/common/form/README',
							items: [
								{
									text: '基础配置',
									link: '/common/form/demo',
								},
								{
									text: '带侧边栏',
									link: '/common/form/demo1',
								},
								{
									text: '带底部按钮并可校验',
									link: '/common/form/demo2',
								},
								{
									text: '带侧边栏带底部按钮',
									link: '/common/form/demo3',
								},
							],
						},
						{
							text: '查询表单',
							link: '/common/search-form/README',
							collapsed: true,
						},
						{
							text: '配置表格',
							link: '/common/table/README',
							items: [
								{
									text: '配置实例',
									link: '/common/table/CODE_EXAMPLE',
								},
								{
									text: '表头过滤器',
									link: '/common/table/__demo__/filter-table-demo',
								},
								{
									text: '表头行过滤器',
									link: '/common/table/__demo__/header-filter-demo',
								},
								{
									text: '行编辑',
									link: '/common/table/__demo__/edit-row-demo',
								},
							],
						},
					],
				},
				{
					text: '业务组件',
					items: [
						{
							text: '字典选择输入',
							link: '/biz/dic-input',
						},
						{
							text: '选择店铺',
							link: '/biz/select-shop-pop',
						},
						{
							text: '选择关联商品',
							link: '/biz/select-goods-pop',
						},
						{
							text: '商品分类输入',
							link: '/biz/goods-category-input',
						},
						{
							text: '视频播放器',
							link: '/biz/video-player',
						},
						{
							text: 'Markdown富文本输入',
							link: '/biz/rich-text-input',
						},
						{
							text: '添加商品',
							link: '/biz/create-add-goods-pop',
						},
						{
							text: '选择客户',
							link: '/biz/select-customer-pop',
						},
						{
							text: '添加客户',
							link: '/biz/add-customer-pop',
						},
						{
							text: '选择线索',
							link: '/biz/select-clue-pop',
						},
						{
							text: '数字范围',
							link: '/biz/range-number-input',
						},
						{
							text: '右键菜单',
							link: '/biz/contextmenu/doc',
						},
						{
							text: '商品上传组件',
							link: '/biz/shop-upload',
						},
						{
							text: '批量输入',
							link: '/biz/batch-input',
						},
						{
							text: 'HTML富文本编辑器',
							link: '/biz/htm-editor',
						},
						{
							text: 'Excel批量导入',
							link: '/biz/import-excel',
						},
					],
				},
				{
					text: '全局API',
					items: [
						{
							text: '上传文件',
							link: '/api-docs/select-file',
						},
						{
							text: '图片预览',
							link: '/api-docs/image-preview',
						},
						{
							text: '文件粘贴',
							link: '/api-docs/pasted-file',
						},
					],
				},
				{
					text: '指令组件',
					items: [
						{
							text: '图片懒加载',
							link: '/directives/lazy',
						},
						{
							text: '自定义懒加载',
							link: '/directives/lazyLoad',
						},
					],
				},
				{
					text: '组件库',
					items: [...componentsRouters],
				},
			],

			socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
		},
		vite: {
			configFile: './vite.config.ts',
		},
	});
};

const toCamelCase = (string: string): string => {
	return string
		.replace(/^./, match => match.toUpperCase())
		.replace(/-(\w)/g, (_, p1: string) => {
			return p1?.toUpperCase() ?? '';
		});
};
