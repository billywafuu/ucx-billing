<template>
  <div class="q-pa-md">
    <q-table
      title="Payments"
      :data="payments"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'PaymentsTable',
    props: ['payments'],
    data() {
        return {
            columns: [
                {
                name: 'order_num',
                required: true,
                label: 'Order Number',
                align: 'left',
                field: row => row.order_num,
                format: val => `${val}`,
                sortable: true
                },
                { 
                    name: 'payment_for', 
                    align: 'center', 
                    label: 'Payment Details', 
                    sortable: true, 
                    field: row => row.payment_for 
                },
                { 
                    name: 'payment_from', 
                    align: 'center', 
                    label: 'Payment From',  
                    sortable: true, 
                    field: row => moment(row.payment_from).format('LLL')
                },
                { 
                    name: 'payment_to', 
                    label: 'Payment To', 
                    sortable: true,
                    field: row => moment(row.payment_to).format('LLL')
                },
                { name: 'value', label: 'Amount Paid', sortable: true, field: row => 'RM ' + row.value},
                { name: 'created_at', label: 'Date of Payment', sortable: true, field: row => moment(row.created_at).format('LLL')}
            ],
        }
    }
}
</script>

<style>

</style>