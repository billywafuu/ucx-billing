<template>
    <div  style="width:100%">
        <q-card class="bg-grey-4">
            <q-card-section>
                <div class="text-h5"> Billing Info</div>
                <div class="text-h6"> {{data.tenant_name}} </div>
                <div class="text-caption">{{data.email_address}}</div>
                <div class="text-caption">{{data.payment_for}}</div>
                <div class="text-caption">RM {{data.payment_price}}</div>
                <div class="text-caption">Rental payment from {{data.payment_from}} to {{data.payment_to}}</div>
            </q-card-section>
        </q-card>
        <div class="q-pa-md text-caption">
            The link for the payment will be sent to tenant's email address.
        </div>
        <div class="text-right">
            <q-btn color="secondary" class="q-mr-sm" label="Cancel" v-close-popup @click="$emit('close')" />
            <q-btn color="primary" label="Send Bill" v-close-popup @click="sendBilling()" />            
        </div>
    </div>
</template>

<script>
export default {
    name: 'BillingInfo',
    props: ['data'],
    methods: {
        sendBilling() {
            this.$http({
            url: 'payments',
            data: {
                payment_for: this.data.payment_for,
                payment_to: this.data.payment_to,
                payment_from: this.data.payment_from,
                value: this.data.payment_price,
                tenancy_id: this.$store.state.currentTenancy.id,
                description: this.data.payment_for
            },
            method: 'POST',
            headers: {
                Authorization: this.$store.state.token
            }
            }).then((response) => {
            if (response.data['status'] == 'payment_create_success') {
                this.$q.dialog({
                    title: 'Billing Sent',
                    message: 'An email has been sent to the tenant email address containing the instruction on how to pay.'
                });
            }
        });
      }
    }
}
</script>

<style>

</style>