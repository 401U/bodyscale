<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleDark() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <nav mt-6 inline-flex gap-2 text-xl>
    <button icon-btn @click="toggleDark()">
      <div i-carbon-sun dark:i-carbon-moon />
    </button>

    <a
      i-carbon-logo-github icon-btn
      rel="noreferrer"
      href="https://github.com/antfu-collective/vitesse-lite"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>
