<script lang="ts" setup>
import { ref } from 'vue'
import { httpApi } from '~/api'

const currProps = defineProps({
  afterRegister: { type: Function, required: false },
})

const registerNodeDialog = ref(false)
const registerNodeUser = ref('')
const registerNodeKey = ref('')

function registerNode() {
  const user = registerNodeUser.value
  const key = registerNodeKey.value
  if (!user || !key)
    return
  httpApi.nodes.register(user, key).then(() => {
    registerNodeDialog.value = false
    if (currProps.afterRegister)
      currProps.afterRegister()
  })
}
</script>

<template>
  <v-dialog v-model="registerNodeDialog" max-width="500px">
    <template #activator="{ props }">
      <v-btn variant="text" icon="mdi-plus" v-bind="props" />
    </template>

    <v-card>
      <v-card-title>
        Register Node
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="registerNodeUser"
          label="User"
        />
        <v-text-field
          v-model="registerNodeKey"
          label="Key"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="registerNodeDialog = false">
          Cancel
        </v-btn>
        <v-btn variant="text" color="primary" @click="registerNode">
          Register
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
