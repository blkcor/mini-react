import path from 'node:path'
import fs from 'node:fs'
import ts from 'rollup-plugin-typescript2'
import cjs from '@rollup/plugin-commonjs'

const pkgPath = path.resolve(__dirname, '../../packages')
const distPath = path.resolve(__dirname, '../../dist/node_modules')

export function resolvePkgPath(pkgName, isDist) {
	if (!isDist) return `${pkgPath}/${pkgName}`
	else return `${distPath}/${pkgName}`
}

export function getPackageJSON(pkgName) {
	const res = fs.readFileSync(
		`${resolvePkgPath(pkgName, false)}/package.json`,
		{
			encoding: 'utf-8'
		}
	)
	return JSON.parse(res)
}

export function getBasePlugins({ typescript = {} } = {}) {
	return [ts(typescript), cjs()]
}
