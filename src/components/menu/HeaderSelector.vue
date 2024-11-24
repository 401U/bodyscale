<script setup lang="ts">
import draggable from 'vuedraggable'

const headers = defineModel<
  {
    title: string
    key: string
  }[]
>('headers')

const enabledHeaders = defineModel<string[]>('enabledHeaders')

function switchHeaderEnabled(key: string) {
  if (!enabledHeaders.value) {
    enabledHeaders.value = [key]
    return
  }
  if (enabledHeaders.value.includes(key)) {
    enabledHeaders.value = enabledHeaders.value.filter(header => header !== key)
  }
  else {
    enabledHeaders.value.push(key)
  }
}
</script>

<template>
  <v-tooltip text="Select Headers">
    <template #activator="{ props: tooltipProps }">
      <v-menu :close-on-content-click="false">
        <template #activator="{ props: menuProps }">
          <div v-bind="tooltipProps">
            <v-btn variant="text" icon="mdi-cog" v-bind="menuProps" />
          </div>
        </template>
        <v-list>
          <v-list-subheader class="text-left">
            Headers
          </v-list-subheader>
          <draggable v-model="headers">
            <template #item="{ element: item } : { element: { title: string, key: string } }">
              <v-list-item
                density="compact"
                @click="switchHeaderEnabled(item.key)"
              >
                <v-checkbox-btn density="compact" :color="enabledHeaders?.includes(item.key) ? 'blue' : ''" :model-value="enabledHeaders?.includes(item.key)" :label="item.title" />
              </v-list-item>
            </template>
          </draggable>
        </v-list>
      </v-menu>
    </template>
  </v-tooltip>
</template>
