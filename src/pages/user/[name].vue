<script lang="ts" setup>
import { useRoute } from 'vue-router'

const emit = defineEmits(['updateTitle'])
emit('updateTitle', 'User')

const params = useRoute('/user/[name]').params
</script>

<template>
  <div>
    <div i-carbon-user inline-block text-4xl />
    <p>
      User, {{ params.name }}
    </p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>
  </div>
</template>
