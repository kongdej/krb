<template>
  <q-footer bordered class="bg-white text-primary">
    <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey">

      <q-route-tab
        class="text-caption"
        v-for="item in store.state.navItems"
        :to="item.to"
        :label="item.label"
        :icon="item.icon"
      />

    </q-tabs>
  </q-footer>

</template>

<script>
import { inject } from 'vue'
export default {
  name: 'PageFooter',
  setup() {
    const store = inject('store')
    return {
      store
    }
  }
}
</script>
