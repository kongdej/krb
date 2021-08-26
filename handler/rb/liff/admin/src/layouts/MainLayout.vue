<template>
  <q-layout view="lHh Lpr lFf">

    <q-footer bordered class="bg-white text-primary">
      <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey">
        <q-route-tab
          v-for="item in store.state.navItems"
          :to="item.to"
          :label="item.label"
          :icon="item.icon"
        />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import store from 'src/myStore'

export default {
  name: 'MainLayout',

  setup() {
    return {
      store
    }

  }
}
</script>
