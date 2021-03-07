<template>
  <q-card stretch>
      <q-card-section class="text-center">
        <q-avatar size="50px">
          <img src="logo.png">
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <div class="text-h5 q-pa-sm text-center">
            {{title}}
        </div>
        <q-separator/>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle q-pa-sm text-center">
            {{description}}
        </div>
      </q-card-section>
      <q-card-section class="text-center">
          <q-btn label="Go Back" icon="fas fa-arrow-left" color="primary" @click="$router.go(-1)" />
      </q-card-section>
  </q-card>
</template>

<script>
export default {
    name: "Message",
    props: ['title', 'description', 'icon']
}
</script>