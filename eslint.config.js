import eslintPlugin from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import vuePlugin from 'eslint-plugin-vue'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'

const { configs: jsConfigs } = eslintPlugin

export default [
  // Configuración para js
  {
    files: ['src/**/*.{js,mjs,cjs}'],
    ignores: [
      'node_modules/',
      'public/',
      'dist/',
      'build/',
      'coverage/',
      '.gitignore',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs'
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.eslint.json'
      }
    },
    rules: {
      ...jsConfigs.recommended.rules,
      'no-undef': 'warn',
      'no-unused-vars': 'warn',
      'css-modules/no-undef-class': 'warn',
      'css-modules/no-undef-property': 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
    }
  },
  // Configuración para TypeScript
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        project: './tsconfig.eslint.json'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },
  // Configuración para Vue con TypeScript
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: tsParser,
        extraFileExtensions: ['.vue']
      }
    },
    plugins: {
      vue: vuePlugin,
      prettier: prettierPlugin,
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...vuePlugin.configs['essential'].rules,
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',

      'vue/block-order': [
        'error',
        {
          order: ['docs', 'template', 'script[setup]', 'style[scoped]']
        }
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 4,
          multiline: {
            max: 4
          }
        }
      ],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'GLOBAL',
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_ATTR',
            'OTHER_DIRECTIVES',
            'RENDER_MODIFIERS',
            'CONTENT',
            'EVENTS'
          ],
          alphabetical: false
        }
      ],
      'vue/order-in-components': [
        'error',
        {
          order: [
            'el',
            'name',
            'key',
            'parent',
            'functional',
            ['delimiters', 'comments'],
            ['components', 'directives', 'filters'],
            'extends',
            'mixins',
            ['provide', 'inject'],
            'ROUTER_GUARDS',
            'layout',
            'middleware',
            'validate',
            'scrollToTop',
            'transition',
            'loading',
            'inheritAttrs',
            'model',
            ['props', 'propsData'],
            'emits',
            'slots',
            'expose',
            'setup',
            'asyncData',
            'data',
            'fetch',
            'head',
            'computed',
            'watch',
            'watchQuery',
            'LIFECYCLE_HOOKS',
            'methods',
            ['template', 'render'],
            'renderError'
          ]
        }
      ],
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true
        }
      ]
    }
  }
]
