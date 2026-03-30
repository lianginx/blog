import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  vue: true,
  typescript: true,
  rules: {
    'e18e/prefer-static-regex': 'off',
  },
})
