import path from 'path';
import { compileScript, parse } from '@vue/compiler-sfc';
import fs from 'fs-extra';
import { ModuleResolutionKind, Project, ScriptTarget } from 'ts-morph';
import glob from 'glob';
import { s8 } from '../../utils/common';
import type { EmitOutput, SourceFile } from 'ts-morph';

export async function build(input: string, options?: { outDir?: string }) {
	const root = process.cwd();
	const tsConfigFilePath = fs.existsSync('tsconfig.json') ? 'tsconfig.json' : undefined;
	const project = new Project({
		compilerOptions: {
			allowJs: true,
			declaration: true,
			emitDeclarationOnly: true,
			strict: true,
			target: ScriptTarget.ES2015,
			moduleResolution: ModuleResolutionKind.NodeJs,
			isolatedModules: true,
			esModuleInterop: true,
			skipLibCheck: true,
			jsx: 1,
		},
		tsConfigFilePath,
		skipAddingFilesFromTsConfig: true,
	});
	const isComponents = input.startsWith('components');
	if (isComponents) {
		project.compilerOptions.set({
			rootDir: path.resolve(root, 'components'),
		});
	} else {
		project.compilerOptions.set({
			rootDir: path.resolve(root, './'),
		});
	}
	let outDir = root;
	if (options?.outDir) {
		outDir = path.resolve(root, options.outDir);
		project.compilerOptions.set({
			outDir,
		});
	}
	const files = glob
		.sync(input, {
			ignore: ['./node_modules/**', './dist/**', './lib/**', '**/__test__/*', '**/__demo__/*'].concat(
				/components\/icon/.test(input) ? [] : ['components/icon/**/*'],
			),
		})
		.sort((x, y) => {
			if (x.endsWith('.vue')) {
				return -1;
			}
			if (y.endsWith('.vue')) {
				return 1;
			}
			return 1;
		});
	const sourceFiles: SourceFile[] = [];

	await Promise.all(
		files.map(async file => {
			const content = await fs.promises.readFile(path.resolve(root, file), 'utf8');
			if (file.endsWith('.vue')) {
				const fileName = file.slice(file.lastIndexOf('/') + 1);
				const sfc = parse(content, {
					sourceRoot: root,
					filename: fileName,
				});
				const { script, scriptSetup } = sfc.descriptor;
				let vueScript = script;
				if (scriptSetup) {
					try {
						vueScript = compileScript(sfc.descriptor, {
							id: s8(),
							inlineTemplate: true,
							babelParserPlugins: ['jsx', 'typescript'],
							fs: {
								fileExists(fileSrc) {
									const targetSrc = path.join(root, file, '..', fileSrc);
									const globFiles = glob.sync(targetSrc);
									console.log('fileExists >>', fileSrc, root, file, globFiles);
									return globFiles.length > 0;
								},
								readFile(fileSrc) {
									const targetSrc = path.join(root, file, '..', fileSrc);
									const globFiles = glob.sync(targetSrc);
									if (globFiles.length) {
										return fs.readFileSync(globFiles[0], {
											encoding: 'utf-8',
										});
									} else {
										return undefined;
									}
								},
							},
						});
					} catch (error) {
						console.error(error);
					}
				}
				if (vueScript) {
					let scriptContent = '';
					let isTSX = false;
					if (vueScript && vueScript.content) {
						scriptContent += vueScript.content;
						if (vueScript.lang === 'tsx') isTSX = true;
					}
					const sourceFile = project.createSourceFile(path.relative(root, file).replace('.vue', isTSX ? '.tsx' : '.ts'), scriptContent);
					if (sourceFile) {
						removeVueSpecifier(sourceFile);
						sourceFiles.push(sourceFile);
					}
				}
			} else {
				const sourceFile = project.createSourceFile(path.relative(root, file), content, {
					overwrite: true,
				});
				if (sourceFile) {
					removeVueSpecifier(sourceFile);
					sourceFiles.push(sourceFile);
				}
			}
		}),
	);

	try {
		await Promise.all(
			sourceFiles.map(async (sourceFile, index) => {
				// eslint-disable-next-line no-console
				const filePath = sourceFile.getFilePath();
				console.log(`Transform start:[${index + 1}/${sourceFiles.length}] ${filePath}`);
				const diagnostics = sourceFile.getPreEmitDiagnostics();
				// eslint-disable-next-line no-console
				console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));
				let emitOutput: EmitOutput;
				if (/.d.ts$/.test(filePath)) {
					// 不用处理直接输出
					const targetFile = path.join(outDir, path.relative(root, filePath));
					await fs.ensureDir(path.dirname(targetFile));
					await fs.writeFile(targetFile, sourceFile.getText(), 'utf8');
					return;
				} else {
					emitOutput = sourceFile.getEmitOutput({ emitOnlyDtsFiles: true });
				}
				const outputFiles = emitOutput.getOutputFiles();
				await Promise.all(
					outputFiles.map(async outputFile => {
						const filepath = outputFile.getFilePath();
						await fs.ensureDir(path.dirname(filepath));
						await fs.writeFile(filepath, outputFile.getText(), 'utf8');
						// eslint-disable-next-line no-console
						console.log(`Emitted ${filepath}`);
					}),
				);
			}),
		);
	} catch {}
}

const removeVueSpecifier = (sourceFile: SourceFile) => {
	const imports = sourceFile.getImportDeclarations();
	imports.forEach(item => {
		const specifier = item.getModuleSpecifierValue();
		const ext = path.extname(specifier);
		if (ext === '.vue') {
			item.setModuleSpecifier(specifier.replace('.vue', ''));
		}
	});
};

export default build;
