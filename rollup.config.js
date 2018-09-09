import { terser } from "rollup-plugin-terser";

export default {
        input: 'index.js',
	output: {
		sourcemap: true,
		format: 'esm',
		file: 'dist/index.es.js'
	},
	plugins: [
                terser({
                        module: true,
                        nameCache: {},
                        output: {
                                beautify: true
                        }
                })
	]
}
