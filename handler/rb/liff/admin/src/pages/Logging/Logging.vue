<template>
  <q-layout view="lHh lpr lFf" container style="height: 100vh" class="shadow-2">
    <page-header>
      <template #title>
        RB Manager - Logging
      </template>
    </page-header>

    <page-footer></page-footer>

    <q-page-container>
      <q-page>
        <q-virtual-scroll
          style="max-height: 100vh"
          :items="logging"
          separator
        >

          <template v-slot="{ item: row, index }">
            <q-item
              :key="index"
              dense
            >

                <q-item-section top class="text-caption">{{ row['updated'] }}</q-item-section>
                <q-item-section top>{{ row['keysearch'] }}</q-item-section>
                <q-item-section top side>{{ row['result'] }}</q-item-section>

            </q-item>
          </template>
        </q-virtual-scroll>
<!--
        <q-list bordered separator>
          <q-item-label  overline header>
            <q-icon name="lab la-dashcube" /> Logging
          </q-item-label>
          <q-item clickable v-ripple v-for="item,index in logging" :key="index">
            <q-item-section top class="text-caption">{{ item.updated }}</q-item-section>
            <q-item-section top>{{ item.keysearch }}</q-item-section>
            <q-item-section top side>{{ item.result }}</q-item-section>
          </q-item>
        </q-list>
-->
      </q-page>

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
    let logging = ref({})
    const columns = [
      'id',
      'keysearch',
      'results',
      'updated'
    ]

    onMounted(() => {
      api.post('/rb_action',{
          action: 'logging'
        })
        .then(function (response) {
          console.log(response.data)
          logging.value = response.data.results.logging
        })
        .catch(function (error) {
          console.log(error);
        });
    })

    return {
      store,
      logging,
      columns
    }
  }
}
</script>
