import globals from 'globals'
import pluginJs from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'


export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node, ...globals.mocha } } },
  pluginJs.configs.recommended,
  {
    plugins: {

      '@stylistic/js': stylisticJs
    },
    rules: {
      indent: ['error', 2],
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      'no-unused-vars': ['off']
    }
  }
]