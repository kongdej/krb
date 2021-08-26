<template>
  <div class="page absolute-top fit bg-white">
    <div class="fit">
      <slot />
    </div>

    <router-view v-slot="{ Component }">
      <transition
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
        :css="store.state.usePageTransition"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>


  </div>
</template>

<script>
import { ref } from 'vue'
import store from 'src/myStore'

export default {
  name: 'Page',
  setup () {
    return {
      store
    }
  }
}
</script>
