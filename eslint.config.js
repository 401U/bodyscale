import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    rules: {
      'vue/valid-v-slot': 'off',
    },
  },
)
