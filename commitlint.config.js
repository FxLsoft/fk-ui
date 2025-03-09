const scopes = ['common', 'common-biz', 'style', 'docs', 'config', 'example', 'test', 'all'];
/**
 * [规则名称]:[level, applicable, value]
 * level 校验等级
 * > 0 禁用
 * > 1 警告
 * > 2 错误
 * applicable
 * > always
 * > never
 * value 参数值
 * > 1. 规则数组 Array
 * > 2. 返回规则数组的函数 () => array
 * > 3. Promise规则数组 Promise<array>
 */
module.exports = {
	rules: {
		'scope-enum': [2, 'always', [...scopes]],
		'body-leading-blank': [1, 'always'],
		'footer-leading-blank': [1, 'always'],
		'header-max-length': [1, 'always', 72],
		'header-min-length': [1, 'always', 16],
		'scope-case': [2, 'always', 'lower-case'],
		'subject-case': [1, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'Merge']],
	},
};
