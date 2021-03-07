<template>
  <div>
    <LoadingSpinner v-if="isVerifying" label="Retrieving Tenant Info.." />
    <Message v-if="isUnathorized && !isVerifying"
        title="You need to login first" 
        description="In order to use the Billing System, you must be logged in on either Administrator or an Operator account.
        You can login by visiting the main website."
    />
    <Message v-if="!hasTenant"
        title="Tenant ID is required" 
        description="You need to specify which tenant you would like to bill. You can basically select one from the main website and try again."
    />
  </div>
</template>

<script>
import Message from '@/components/Message'
import LoadingSpinner from '@/components/LoadingSpinner'
export default {
    name: "Authentication",
    components: {
        Message,
        LoadingSpinner
    },
    data() {
        return {
            isUnathorized: false,
            isVerifying: true,
            hasTenant: true
        }
    },
    mounted() {
        if (this.$route.query.token == undefined || this.$route.query.tenant_id == undefined) {
            this.$router.push({name:'Unauthorized'});
            return;
        }

        this.isVerifying = true;
        this.isUnathorized = false;
        let tenant_id = this.$route.query.tenant_id;

        this.$http({
            url: 'billings/' + tenant_id,
            method: 'GET',
            headers: {
                Authorization: this.$route.query.token
            }
        }).then((response) =>{
            console.log('wtf');
            if (response.data['status'] == 'auth_success') {
                let data = response.data['body'];
                var user = {
                    userId: 1,
                    token:  data.token,
                    tenant: data.tenant,
                    tenancies: data.tenancies
                }
                this.$store.commit('login', user);
                this.isVerifying = false;
                this.$router.push({name: 'Dashboard'});
                console.log("Opening the dashboard page.");
            } else {
                this.isUnathorized = true; 
                this.isVerifying = false;
            }
        }).catch((err) => {
            console.log("Error");
            if (err.response.status == 404) {
                this.$router.push('/404'); 
            }
        });
    }
}
</script>

<style>

</style>