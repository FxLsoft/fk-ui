import path from 'path';
import fs from 'fs-extra';
import matter from 'gray-matter';
import { parseFrontMatter } from './front-matter-parse';

export function processIncludes(srcDir: string, src: string, file: string, includes: string[]): string {
	const includesRE = /<!--\s*@include:\s*(.*?)\s*-->/g;
	const regionRE = /(#[\w-]+)/;
	const rangeRE = /\{(\d*),(\d*)\}$/;
	src = parseFrontMatter(src, includes.length > 0 ? '##' : '#');
	return src.replace(includesRE, (m: string, m1: string) => {
		if (!m1.length) return m;

		const range = m1.match(rangeRE);
		const region = m1.match(regionRE);

		const hasMeta = !!(region || range);

		if (hasMeta) {
			const len = (region?.[0].length || 0) + (range?.[0].length || 0);
			m1 = m1.slice(0, -len); // remove meta info from the include path
		}

		const atPresent = m1[0] === '@';

		try {
			const includePath = atPresent ? path.join(srcDir, m1.slice(m1[1] === '/' ? 2 : 1)) : path.join(path.dirname(file), m1);
			let content = fs.readFileSync(includePath, 'utf-8');

			if (region) {
				const [regionName] = region;
				const lines = content.split(/\r?\n/);
				const regionLines = findRegion(lines, regionName.slice(1));
				content = lines.slice(regionLines?.start, regionLines?.end).join('\n');
			}

			if (range) {
				const [, startLine, endLine] = range;
				const lines = content.split(/\r?\n/);
				content = lines
					.slice(startLine ? Number.parseInt(startLine, 10) - 1 : undefined, endLine ? Number.parseInt(endLine, 10) : undefined)
					.join('\n');
			}

			if (!hasMeta && path.extname(includePath) === '.md') {
				content = matter(content).content;
			}

			includes.push(slash(includePath));
			// recursively process includes in the content
			return processIncludes(srcDir, content, includePath, includes);

			//
		} catch {
			if (process.env.DEBUG) {
				process.stderr.write(`\nInclude file not found: ${m1}`);
			}

			return m; // silently ignore error if file is not present
		}
	});
}

export function findRegion(lines: Array<string>, regionName: string) {
	const regionRegexps = [
		/^\/\/ ?#?((?:end)?region) ([\w*-]+)$/, // javascript, typescript, java
		/^\/\* ?#((?:end)?region) ([\w*-]+) ?\*\/$/, // css, less, scss
		/^#pragma ((?:end)?region) ([\w*-]+)$/, // C, C++
		/^<!-- #?((?:end)?region) ([\w*-]+) -->$/, // HTML, markdown
		/^#((?:End )Region) ([\w*-]+)$/, // Visual Basic
		/^::#((?:end)region) ([\w*-]+)$/, // Bat
		/^# ?((?:end)?region) ([\w*-]+)$/, // C#, PHP, Powershell, Python, perl & misc
	];

	let regexp = null;
	let start = -1;

	for (const [lineId, line] of lines.entries()) {
		if (regexp === null) {
			for (const reg of regionRegexps) {
				if (testLine(line, reg, regionName)) {
					start = lineId + 1;
					regexp = reg;
					break;
				}
			}
		} else if (testLine(line, regexp, regionName, true)) {
			return { start, end: lineId, regexp };
		}
	}

	return null;
}

function testLine(line: string, regexp: RegExp, regionName: string, end = false) {
	const [full, tag, name] = regexp.exec(line.trim()) || [];

	return full && tag && name === regionName && tag.match(end ? /^[Ee]nd ?[rR]egion$/ : /^[rR]egion$/);
}

function slash(p: string): string {
	return p.replace(/\\/g, '/');
}
