<template>
  <q-layout view="lHh lpr lFf" container style="height: 100vh" class="shadow-2">
    <q-header>
      <q-toolbar>
        <q-btn flat round dense icon="las la-angle-left" to="/keyword"/>
        <q-toolbar-title>Edit Keyword</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <page-footer></page-footer>

    <q-page-container>
      <div class="q-pa-xs">

        <q-card flat bordered square>
          <q-card-section class="bg-primary">
            <div class="text-subtitle2 text-white">{{ title }}</div>
          </q-card-section>
          <q-separator />

          <q-card-actions vertical>
            <q-form @submit="onSubmit" class="q-gutter-md">

              <q-input
                class="q-mt-lg"
                type="textarea"
                v-model="keyword"
                color="primary"
                label="Keyword"
                filled
                clearable
              />

              <div>
                <q-btn label="Submit" type="submit" color="primary"/>
              </div>
            </q-form>

          </q-card-actions>
        </q-card>

      </div>

    </q-page-container>
  </q-layout>
  <!--

  <page>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back
          to="/keyword"
          label="Keyword"
        />
      </template>
      <template #title>Edit</template>
    </page-header>

    <page-body>

      <div class="q-pa-xs">

        <q-card flat bordered square>
          <q-card-section class="bg-primary">
            <div class="text-subtitle2 text-white">{{ title }}</div>
          </q-card-section>
          <q-separator />

          <q-card-actions vertical>
            <q-form @submit="onSubmit" class="q-gutter-md">

              <q-input
                class="q-mt-lg"
                type="textarea"
                v-model="keyword"
                color="primary"
                label="Keyword"
                filled
                clearable
              />

              <div>
                <q-btn label="Submit" type="submit" color="primary"/>
              </div>
            </q-form>

          </q-card-actions>
        </q-card>

      </div>

    </page-body>
  </page>
-->
</template>

<script>
import { ref, inject, onActivated, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export default {
  name: 'EditPage',
  setup() {
    const store = inject('store')
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    let result = ref({})
    let keyword = ref('')

    const title =  computed(() => {
      if (result.value.id) {
        return  result.value.filename.split('.').slice(0,-1).join('.')
      }
      else
        return '-'

    })

    onActivated(() => {
      //console.log('get info.')
      api.post('/rb_action',{
          action: 'search_detail',
          id: route.params.id
        })
        .then(function (response) {
          //console.log(response.data);
          result.value =  response.data.results[0]
          keyword.value = response.data.results[0].keyword
        })
        .catch(function (error) {
          console.log(error);
        });
    })

    const onSubmit = () => {
      console.log('submit')
      api.post('/rb_action',{
          action: 'update_keyword',
          id: route.params.id,
          keyword: keyword.value
        })
        .then(function (response) {
          //console.log(response.data);
          $q.notify({
            message: 'Update keyword done.',
            color: 'purple'
          })
          router.push('/keyword')
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return {
      store,
      result,
      keyword,
      title,
      onSubmit
    }
  }
}
</script>
