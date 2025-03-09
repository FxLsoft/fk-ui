// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generate } = require('../../../color');

module.exports = {
	install(_, __, functions) {
		functions.add('color-palette-dark', (color, index) => {
			return generate(color.value, { index: index.value, dark: true });
		});
	},
};
