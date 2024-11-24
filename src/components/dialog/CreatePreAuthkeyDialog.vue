<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { httpApi } from '~/api'

const dialogEnabled = ref(false)
const userInput = ref('')
const reusableInput = ref(false)
const ephemeralInput = ref(false)
const expirationInput: Ref<Date> = ref(new Date())
const aclTagsInput = ref([])
function post() {
  const user = userInput.value
  const reusable = reusableInput.value
  const ephemeral = ephemeralInput.value
  const expiration = expirationInput.value
  const aclTags = aclTagsInput.value
  if (!user || !expiration) {
    return
  }
  httpApi.preauthkey.create({
    user,
    reusable,
    ephemeral,
    expiration,
    aclTags,
  }).then(() => {
    userInput.value = ''
    reusableInput.value = false
    ephemeralInput.value = false
    expirationInput.value = new Date()
    aclTagsInput.value = []
    dialogEnabled.value = false
  })
}
</script>

<template>
  <v-dialog v-model="dialogEnabled" max-width="300px">
    <template #activator="{ props }">
      <v-btn variant="text" icon="mdi-plus" v-bind="props" />
    </template>
    <v-card>
      <v-card-title>
        Create PreAuthkey
      </v-card-title>

      <v-card-text>
        <!-- use form -->
        <v-form>
          <v-text-field v-model="userInput" label="User" />
          <v-text-field
            v-model="expirationInput"
            label="Expiration"
            type="datetime-local"
          />
          <v-text-field
            v-model="aclTagsInput"
            label="ACL Tags"
          />
          <v-checkbox v-model="reusableInput" label="Reusable" density="compact" />
          <v-checkbox v-model="ephemeralInput" label="Ephemeral" density="compact" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="dialogEnabled = false">
          Cancel
        </v-btn>
        <v-btn variant="text" color="primary" @click="post">
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
