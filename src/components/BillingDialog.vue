<template>
  <div>
    <q-dialog v-model="isOpen">
      <q-card style="width:500px">
        <q-card-section class="row items-center">
            <q-btn-dropdown 
                color="primary" 
                :label="currentLabel" 
                style="width:100%"
            >
                <q-list>
                    <q-item clickable v-close-popup @click="onItemClick('Room Rental')">
                        <q-item-section>
                            <q-item-label>Room Rental</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick('Utility')">
                        <q-item-section>
                            <q-item-label>Utility</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick('Parking Fee')">
                        <q-item-section>
                            <q-item-label>Parking Fee</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick('Penalty')">
                        <q-item-section>
                            <q-item-label>Penalty</q-item-label>
                        </q-item-section>
                    </q-item>
                    </q-list>
                </q-btn-dropdown>
                <BillingInfo 
                    class="q-my-lg"
                    :data="getBillingInformation"
                    v-if="currentLabel == 'Room Rental' || currentLabel == 'Parking Fee'"
                />
                <BillingCreate 
                    class="q-my-lg"
                    v-if="currentLabel == 'Utility' || currentLabel == 'Penalty'"
                    style="width:100%"
                    v-on:submitting="isOpen = !isOpen"
                />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import BillingInfo from '@/components/BillingInfo'
export default {
    name: "BillingDialog",
    props: ['room', 'isOpen'],
    data() {
        return {
            currentLabel: "Select Billing Type",
            payment_for: 'Room Rental',
            payment_from: moment().format('MMMM YYYY'),
            payment_to: moment(moment().add(1, 'months').calendar()).format('MMMM YYYY'),
            payment_price: this.$store.state.currentTenancy.room_price,
            description: 'Payment from ' + moment().format('MMMM YYYY') + ' to ' + moment(moment().add(1, 'months').calendar()).format('MMMM YYYY'),
            hasSelectedType: false
        }
    },
    methods: {
        onItemClick(type) {

            if (type == 'Parking Fee') {
                this.payment_price = this.$store.state.currentTenancy.parking;
            }

            if (type == 'Room Rental') {
                this.payment_price = this.$store.state.currentTenancy.room_price;
            }

            this.payment_for = type;
            this.currentLabel = type;
            this.hasSelectedType = true;
        }
    },
    components: {
        BillingInfo,
        BillingCreate: () => import('@/components/BillingCreate')
    },
    computed: {
        getBillingInformation() {
            return {
                currentLabel: this.currentLabel,
                payment_for: this.payment_for,
                payment_to: this.payment_to,
                payment_from: this.payment_from,
                payment_price: this.payment_price,
                tenant_name: this.$store.state.tenant.first_name + ' ' + this.$store.state.tenant.last_name,
                email_address: this.$store.state.tenant.email_address
            }
        }
    }
}
</script>

<style>

</style>