<template>
  <router-view />
</template>
<script>
import { defineComponent, provide } from 'vue';
import store from 'src/myStore'

export default defineComponent({
  name: 'App',
  setup() {
    provide('store', store)
  }
})
</script>
