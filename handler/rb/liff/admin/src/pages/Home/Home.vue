<template>
  <page>
    <q-header elevated>
      <q-toolbar class="glossy">

        <q-avatar size="lg">
          <img :src="$pictureUrl">
        </q-avatar>

        <q-toolbar-title>RB Manager</q-toolbar-title>


      </q-toolbar>
    </q-header>
<!--
    <page-header>
      <template #title>Home</template>
    </page-header>
-->
    <page-body>
      <div class="q-mt-none q-pa-lg bg-grey-1">
        <q-input rounded outlined  bottom-slots v-model="text" placeholder="Search.."   @keyup.enter="searchDocument">
            <template v-slot:after>
              <q-btn round dense flat icon="send" @click="searchDocument"/>
            </template>
        </q-input>
      </div>
      <q-banner inline-actions class="text-white bg-blue-grey-6"  v-if="searchResults.length > 0">
        Found {{ searchResults.length }} document(s)
      </q-banner>
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="i,index in searchResults" :key="index" :to= "`/home/edit/${i.id}`">
          <q-item-section>{{ i.filename }}</q-item-section>
          <q-item-section avatar>
            <q-icon color="primary" name="chevron_right" />
          </q-item-section>
        </q-item>
      </q-list>


    </page-body>
  </page>
</template>

<script>
import { ref,inject } from 'vue'
import { api } from 'boot/axios'

export default {
  name: 'Home',
  setup() {
    const store = inject('store')
    let text = ref('')
    let searchResults = ref([])

    const searchDocument = () => {
      //console.log('search = ', text.value)
      api.post('/rb3_action',{
          action: 'search',
          keysearch: text.value
        })
        .then(function (response) {
          searchResults.value = response.data.results
          console.log(response.data);
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
