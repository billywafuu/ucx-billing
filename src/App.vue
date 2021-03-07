<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar class="bg-black glossy text-white">
        <q-avatar>
          <img src="logo.png">
        </q-avatar>
        <q-toolbar-title>UCX Billing Manager</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <div class="row justify-center q-mt-xl">
      <div class="col-12 col-md-8 q-pa-sm">
        <q-page-container>
          <router-view />
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'App',
  created() {
    let system = this;
    this.$http.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if(error.response.status == 401) {
        system.$store.commit('logout');
        system.$router.push('/unauthorized');
      }
      if (error.response.status == 500) {
        system.$router.push('/servererror'); 
      }
      return Promise.reject(error);
    });
  }
}
</script>

<style>
</style>
