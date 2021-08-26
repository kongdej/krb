<template>
  <page>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back
          to="/home/child"
          label="Child"
        />
      </template>
      <template #title>GrandChild</template>
    </page-header>

    <page-body>
      <div class="q-pa-lg">
      <div class="text-h6">This is grand child</div>
      <q-option-group
         v-model="group"
         :options="options"
         color="primary"
         inline
       />
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

    </page-body>
  </page>
</template>

<script>
import { ref, inject, onActivated, onMounted } from 'vue'

export default {
  name: 'Grandchild',

  setup () {
    const store = inject('store')
    onActivated(() => {
      store.methods.increateCount()
      console.log('counter = ', store.state.grandChildVisit)
    })
    return {
      store,
      group: ref('op1'),
      options: [
        {
          label: 'Option 1',
          value: 'op1'
        },
        {
          label: 'Option 2',
          value: 'op2'
        },
        {
          label: 'Option 3',
          value: 'op3'
        }
      ]
    }
  }

}
</script>
