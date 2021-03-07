<template>
  <div v-if="$store.state.isLoggedIn">
    <q-card flat>
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" size="100px" name="fas fa-user" />
            </q-item-section>
            <q-item-section>
              <div class="text-h4">
                {{$store.state.tenant.first_name}} {{$store.state.tenant.last_name}}
              </div>
              <div class="text-h6 text-grey">
                {{$store.state.tenant.email_address}}
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section>
        <TenantTab/>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import TenantTab from '@/components/TenantTab'
export default {
  name: 'Dashboard',
  created() {
    if (!this.$store.state.isLoggedIn) {
      this.$router.push({name: 'Unauthorized'});
    }
  },
  components: {
    TenantTab
  }
}
</script>

<style>

</style>