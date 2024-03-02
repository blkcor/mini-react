import { getPackageJSON, resolvePkgPath, getBasePlugins } from './utils'
import generataPackageJson from 'rollup-plugin-generate-package-json'

const { name, module } = getPackageJSON('react')
//react source path
const reactPkgPath = resolvePkgPath(name, false)
//react dist path
const reactDistPath = resolvePkgPath(name, true)
export default [
	//React
	{
		input: `${reactPkgPath}/${module}`,
		output: {
			file: `${reactDistPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		plugins: [
			...getBasePlugins(),
			generataPackageJson({
				inputFolder: reactPkgPath,
				outputFolder: reactDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	//jsx-runtime
	{
		input: `${reactPkgPath}/src/jsx.ts`,
		output: [
			// prod
			{
				file: `${reactDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			// dev
			{
				file: `${reactDistPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		],
		plugins: [
			...getBasePlugins(),
			generataPackageJson({
				inputFolder: reactPkgPath,
				outputFolder: reactDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version
				})
			})
		]
	}
]
