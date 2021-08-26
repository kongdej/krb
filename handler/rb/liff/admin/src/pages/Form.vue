<template>
  <transition
    appear
    enter-active-class="animated fadeInLeft"
    leave-active-class="animated fadeOutLeft"
  >
  <q-page>


    <q-header reveal elevated>
      <q-toolbar>
        <q-btn flat round dense icon="chevron_left" class="q-mr-sm" to="/" />

        <q-toolbar-title>Document Info.</q-toolbar-title>


      </q-toolbar>
    </q-header>

    Form

  </q-page>
  </transition>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',

})
</script>
