<template>
  <q-layout view="lHh lpr lFf" container style="height: 100vh">
    <page-header>
      <template #title>
        RB Manager - Keyword
      </template>
    </page-header>

    <page-footer></page-footer>

    <q-page-container>
      <div class="q-mt-none q-pa-md bg-grey-5">
        <q-input bg-color="white" rounded outlined  v-model="text" placeholder="Search.." dense  @keyup.enter="searchDocument">
            <template v-slot:append>
              <q-btn round dense flat icon="send" @click="searchDocument"/>
            </template>
        </q-input>
      </div>
      <q-banner inline-actions class="text-black bg-blue-grey-1"  v-if="searchResults.length > 0">
        Found {{ searchResults.length }} document(s)
      </q-banner>

      <q-list bordered separator>
        <q-item clickable v-ripple v-for="i,index in searchResults" :key="index" :to= "`/keyword/edit/${i.id}`">
          <q-item-section>{{ i.filename }}</q-item-section>
          <q-item-section avatar>
            <q-icon color="primary" name="chevron_right" />
          </q-item-section>
        </q-item>
      </q-list>

    </q-page-container>
  </q-layout>

</template>

<script>
import { ref,inject } from 'vue'
import { api } from 'boot/axios'

export default {
  name: 'Keyword',
  setup() {
    const store = inject('store')
    let text = ref('')
    let searchResults = ref([])

    const searchDocument = () => {
      //console.log('search = ', text.value)
      api.post('/rb_action',{
          action: 'search',
          keysearch: text.value
        })
        .then(function (response) {
          searchResults.value = response.data.results
          //console.log(response.data);
          text.value = ''
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return {
      store,
      text,
      searchDocument,
      searchResults
    }
  }
}
</script>
