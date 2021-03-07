<template>
  <div>
    <q-card flat>
      <q-card-section>
        <q-btn color="primary" icon="fas fa-arrow-left" label="Back to Dashboard" @click="$router.push({name: 'Dashboard'})" />
      </q-card-section>
      <q-card-section>
        <div class="text-h3">{{$store.state.currentTenancy.property_name}}</div>
        <div class="text-h6 text-grey">{{$store.state.currentTenancy.property_type}}</div>
        <div class="text-h6">{{$store.state.currentTenancy.address}}</div>
        <q-separator class="q-my-md"/>
      </q-card-section>
      <q-card-section>
        <q-card flat>
          <q-card-section>
            <q-table
              title="Room Details"
              :data="data"
              :columns="columns"
              row-key="name"
            />
          </q-card-section>
        </q-card>
        <q-card flat>
            <PaymentsTable :payments="$store.state.currentTenancy.payments" />
        </q-card>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn size="lg" color="primary" label="Back" icon="fas fa-arrow-left" @click="$router.push({name: 'Dashboard'})"/>
        <q-btn size="lg" color="positive" label="Create Billing" icon="far fa-clipboard"/>
      </q-card-actions>
    </q-card>
    <q-separator/>
  </div>
</template>

<script>
import moment from 'moment'
import PaymentsTable from '@/components/PaymentsTable'
// import LoadingSpinner from '@/components/LoadingSpinner'
export default {
    name: "Tenancy",
    components: {
      //LoadingSpinner
      PaymentsTable
    },
    data() {
      return {
        columns: [
          {
            name: 'details',
            label: 'Details',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'value',
            label: 'Value',
            align: 'left',
            field: row => row.value,
          },
        ],
        data: [
          {
            name: 'Room Name',
            value: this.$store.state.currentTenancy.room_title
          },
          {
            name: 'Room Type',
            value: this.$store.state.currentTenancy.room_type
          },
          {
            name: 'Room Price',
            value: 'RM ' + this.$store.state.currentTenancy.room_price + '/month'
          },
          {
            name: 'Booking Date',
            value: moment(this.$store.state.currentTenancy.booking_date).format('LLL')
          }
        ]
      }
    },
    methods: {
      selectTenancy(tenancy) {
        this.selectedTenancy = tenancy;
      },
      sendBilling() {
        this.openBillingForm = false;
        this.isSending = true;
        this.$http({
          url: 'payments',
          data: {
            payment_for: this.payment_for,
            payment_to: this.payment_to,
            payment_from: this.payment_from,
            value: this.price,
            tenancy_id: this.selectedTenancy.id,
            description: this.description
          },
          method: 'POST',
          headers: {
            Authorization: this.$store.state.token
          }
        }).then((response) => {
          if (response.data['status'] == 'payment_create_success') {
            this.isSending = false;
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