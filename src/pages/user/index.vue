<script setup lang="ts">
import type { Ref } from 'vue'
import { onUnmounted, ref } from 'vue'
import { type User, httpApi } from '~/api'
import { formatTimeToLocale } from '~/composable/time'

const emit = defineEmits(['updateTitle'])
emit('updateTitle', 'User')

const users: Ref<User[]> = ref([])
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Create Time', key: 'createdAt', value: getUserCreateTime },
  { title: 'Actions', key: 'actions' },
]

function getUserCreateTime(item: any) {
  const user = item as User
  return formatTimeToLocale(user.createdAt)
}

function refresh() {
  httpApi.user.list().then((data) => {
    users.value = data
  })
}

refresh()

const refreshInterval = setInterval(refresh, 10000)

onUnmounted(() => {
  clearInterval(refreshInterval)
})
function deleteUser(name: string) {
  httpApi.user.delete(name).then(() => {
    refresh()
  })
}

const renameInput = ref('')
function renameUser(name: string) {
  const newName = renameInput.value
  if (name === newName || name === '' || newName === '') {
    return
  }
  httpApi.user.rename(name, newName).then(() => {
    refresh()
  })
}

const createUserDialog = ref(false)
const userNameInput = ref('')
function createUser() {
  const userName = userNameInput.value
  if (userName === '') {
    return
  }
  httpApi.user.create(userNameInput.value).then(() => {
    createUserDialog.value = false
    userNameInput.value = ''
    refresh()
  })
}
</script>

<template>
  <v-data-table-virtual :headers="headers" :items="users">
    <template #top>
      <v-toolbar flat>
        <v-spacer />
        <v-dialog v-model="createUserDialog" max-width="300px">
          <template #activator="{ props }">
            <v-btn variant="text" icon="mdi-plus" v-bind="props" />
          </template>
          <v-card>
            <v-card-title>
              Create User
            </v-card-title>
            <v-card-text>
              <v-text-field v-model="userNameInput" />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn variant="text" @click="createUser">
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
      <v-dialog max-width="300px">
        <template #activator="{ props }">
          <v-btn variant="text" size="small" color="blue" icon="mdi-pencil" v-bind="props" @click="renameInput = item.name" />
        </template>
        <v-card>
          <v-card-title>
            Rename User
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="renameInput" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" @click="renameUser(item.name)">
              Rename
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn variant="text" size="small" color="red" icon="mdi-delete" @click="deleteUser(item.name)" />
    </template>
  </v-data-table-virtual>
</template>
