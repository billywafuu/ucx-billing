<template>
  <div>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
            filled
            v-model="payment_for"
            label="Payment For"
            hint="Enter the title of this billing."
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'This field is required to create a billing.']"
        />
        <q-input
            filled
            type="number"
            v-model="payment_price"
            label="Payment Price"
            hint="Enter the price of this billing."
            lazy-rules
            :rules="[ val => val && val > 0 || 'This field is required to create a billing.']"
        />
        <q-input filled v-model="payment_from" label="Billing Start Date" mask="date" :rules="['date']">
            <template v-slot:append>
                <q-icon name="fas fa-calendar" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="payment_from">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                    </q-date>
                </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
        <q-input filled v-model="payment_to" label="Billing End Date" mask="date" :rules="['date']">
            <template v-slot:append>
                <q-icon name="fas fa-calendar" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="payment_to">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                    </q-date>
                </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
        <div class="q-px-xs">
            <q-input
                v-model="payment_description"
                filled
                type="textarea"
                label="Enter description of this billing."
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'This field is required to create a billing.']"                
            />
        </div>
        <div class="text-right">
            <q-btn color="secondary" class="q-mr-sm" label="Cancel" v-close-popup @click="$emit('close')" />
            <q-btn color="primary" label="Send Bill" type="submit" />
        </div>
      </q-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    name: "BillingCreate",
    data() {
        return {
            payment_for: null,
            payment_price: 0,
            payment_from: moment().format('YYYY/MM/DD'),
            payment_to: moment().format('YYYY/MM/DD'),
            payment_description: null
        }
    },
    methods: {
        onSubmit() {
            this.$emit('submitting');
            this.$http({
            url: 'payments',
            data: {
                payment_for: this.payment_for,
                payment_to: this.payment_to,
                payment_from: this.payment_from,
                value: this.payment_price,
                tenancy_id: this.$store.state.currentTenancy.id,
                description: this.payment_description
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
        },
        onReset() {

        }
    }
}
</script>

<style>

</style>