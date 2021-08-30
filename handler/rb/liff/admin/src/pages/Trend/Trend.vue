<template>
  <q-layout view="lHh lpr lFf" container style="height: 100vh" class="shadow-2">
    <page-header>
      <template #title>
        RB Manager - Trend
      </template>
    </page-header>

    <page-footer></page-footer>

    <q-page-container>
      <div class="q-pa-md">

        <q-list bordered separator>
          <q-item-label  overline header class="bg-grey-6 text-white">
            <q-icon name="lab la-dashcube" /> Top Search
          </q-item-label>
          <q-item clickable v-ripple v-for="item,index in search" :key="index">
            <q-item-section>{{ index+1 }}. {{ item.keysearch }}</q-item-section>
            <q-item-section side>{{ item.total }}</q-item-section>
          </q-item>
        </q-list>

        <q-list bordered separator class="q-mt-lg">
          <q-item-label  overline header class="bg-grey-6 text-white">
            <q-icon name="lab la-dashcube" /> Top Read
          </q-item-label>
          <q-item clickable v-ripple v-for="item,index in read" :key="index">
            <q-item-section>{{ index+1 }}. {{ item.docname }}</q-item-section>
            <q-item-section side>{{ item.total }}</q-item-section>
          </q-item>
        </q-list>

      </div>

    </q-page-container>
  </q-layout>

</template>

<script>
import { ref , inject, onMounted } from 'vue'
import { api } from 'boot/axios'

export default {
  name: 'Trend',
  setup() {
    const store = inject('store')
    let search = ref({})
    let read = ref({})

    onMounted(() => {
      api.post('/rb_action',{
          action: 'trend'
        })
        .then(function (response) {
          console.log(response.data)
          search.value = response.data.results.search
          read.value = response.data.results.read
        })
        .catch(function (error) {
          console.log(error);
        });
    })

    return {
      store,
      search,
      read,
    }
  }
}
</script>
