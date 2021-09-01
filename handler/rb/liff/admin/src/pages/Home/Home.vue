<template>
  <q-layout view="lHh lpr lFf" style="height: 100vh">
    <page-header>
      <template #title>
        RB Manager - Home
      </template>
    </page-header>

    <page-footer></page-footer>

    <q-page-container>
      <div v-if="show">
        <div class="q-pa-md q-mt-lg">
            <q-list bordered separator>
              <q-item-label  overline header>
                <q-icon name="lab la-dashcube" /> Insight analytics
              </q-item-label>
              <q-item clickable v-ripple >
                <q-item-section avatar>
                  <q-icon name="las la-user-circle" />
                </q-item-section>
                <q-item-section>Users</q-item-section>
                <q-item-section side><q-badge class="q-pa-sm" rounded color="accent" :label="`${users.lastest}/${users.total}`" /></q-item-section>
              </q-item>
              <q-item clickable v-ripple >
                <q-item-section avatar>
                  <q-icon name="las la-search" />
                </q-item-section>
                <q-item-section>Search</q-item-section>
                <q-item-section side><q-badge class="q-pa-sm" rounded color="secondary" :label="`${search.lastest}/${search.total}`"  /></q-item-section>
              </q-item>
              <q-item clickable v-ripple >
                <q-item-section avatar>
                  <q-icon name="lab la-readme" />
                </q-item-section>
                <q-item-section>Read</q-item-section>
                <q-item-section side><q-badge class="q-pa-sm" rounded color="negative" :label="`${read.lastest}/${read.total}`"  /> </q-item-section>
              </q-item>
              <q-item clickable v-ripple >
                <q-item-section avatar>
                  <q-icon name="las la-coins" />
                </q-item-section>
                <q-item-section>Documents</q-item-section>
                <q-item-section side>{{ documents.total }}</q-item-section>
              </q-item>
              <q-item clickable v-ripple >
                <q-item-section avatar>
                  <q-icon name="las la-clock" />
                </q-item-section>
                <q-item-section>Last Updated</q-item-section>
                <q-item-section side>{{ documents.lastest }}</q-item-section>
              </q-item>
            </q-list>
            <div class="text-caption q-mt-sm text-grey-5">
              <i class="lar la-bell"></i> Note: (last month/total)
            </div>
          </div>
      </div>

      <div v-else class="no-tasks absolute-center">

        <div class="text-h5 text-grey-6 text-center">
          <q-icon name="close" size="20px" color="negative"/>
          not Authorized
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref , inject, onMounted, provide, defineComponent, getCurrentInstance } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'Home',
  setup() {
    const app = getCurrentInstance()
    const store = inject('store')
    let users = ref({})
    let search = ref({})
    let read = ref({})
    let documents = ref({})
    let show = ref('fasle')

    onMounted(() => {
      if (app.appContext.config.globalProperties.$token) {
        show.value = true
        let headers = {
          'Content-Type': 'application/json',
          'x-access-token': app.appContext.config.globalProperties.$token
        }

        console.log(headers)

        api.post('/rb_action',{
            action: 'summery'
          },
          {
            headers
          })
          .then(function (response) {
            users.value = response.data.results.users
            search.value = response.data.results.search
            read.value = response.data.results.read
            documents.value = response.data.results.documents
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        else {
          show.value = false
        }
    })

    return {
      store,
      users,
      search,
      read,
      documents,
      show
    }
  }
})
</script>

<style lang="scss">
  .done {
    .q-item__label {
      text-decoration: line-through;
      color: #bbb;
    }
  }
  .no-tasks {
    opacity: 0.8;
  }
</style>
