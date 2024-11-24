<script lang="ts" setup>
import { ref } from 'vue'
import { httpApi } from '~/api'
import { formatTimeToLocale } from '~/composable/time'

const emit = defineEmits(['updateTitle'])
emit('updateTitle', 'Policy')

const aclContent = ref('')
const aclUpdateTime = ref('')

function fetchAcl() {
  httpApi.policy.get().then((data) => {
    aclContent.value = data.policy
    aclUpdateTime.value = data.updatedAt
  })
}
function updateAcl() {
  httpApi.policy.set(aclContent.value).finally(() => {
    fetchAcl()
  })
}

fetchAcl()
</script>

<template>
  <v-container fluid>
    <div class="text-right">
      <v-btn variant="outlined" text="Fetch" color="primary" prepend-icon="mdi-refresh" @click="fetchAcl" />
      <v-btn class="mx-2" text="Save" variant="outlined" color="success" prepend-icon="mdi-content-save" @click="updateAcl" />
    </div>
    <div class="text-right mt-4">
      Update At: {{ formatTimeToLocale(aclUpdateTime) }}
    </div>
    <v-textarea rows="20" :model-value="aclContent" variant="outlined" no-resize />
  </v-container>
</template>
