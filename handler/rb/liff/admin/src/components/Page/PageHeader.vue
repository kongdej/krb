<template>
  <q-header elevated>
    <q-separator  color="grey-4" />
    <q-toolbar class="bg-white">
      <q-avatar size="lg">
        <img :src="$pictureUrl">
      </q-avatar>
      <q-toolbar-title class="text-black text-body1">
        <slot name="title"></slot>
      </q-toolbar-title>
    </q-toolbar>

  </q-header>

  <!--
  <div class="page absolute-top fit bg-white">
    <header class="q-header q-layout__section--marginal fixed-top q-header--bordered bg-white text-primary">
      <div class="q-toolbar row no-wrap items-center">
        <slot name="buttons-left"></slot>
        <div class="page-header-title q-toolbar__title ellipsis text-body1 q-pl-none">
            <slot name="title"></slot>
        </div>
        <q-space ></q-space>
        <slot name="icon-right"></slot>
      </div>
    </header>
  </div>
-->
</template>

<script>
export default {
  name: 'PageHeader'
}
</script>
