<template>
  <page>
    <page-header>
      <template #title>Questons</template>
    </page-header>
    <page-body>
      <div class="q-pa-lg">
      Quesions krab : {{ store.state.grandChildVisit }}
      <q-list bordered separator>

        <q-item clickable v-ripple v-for="i in 10" :key="i"
          :to='`/questions/answer/${i}`'>
            <q-item-section>How do I do this?</q-item-section>
            <q-item-section avatar>
              <q-icon color="primary" name="chevron_right" />
            </q-item-section>
        </q-item>

      </q-list>
      </div>
    </page-body>
  </page>
</template>

<script>
import store from 'src/myStore'

export default {
  name: 'Question',
  setup() {
    return {
      store
    }
  }

}
</script>
