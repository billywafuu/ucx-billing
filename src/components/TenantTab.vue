<template>
    <q-card>
        <q-tabs
            v-model="tab"
            class="bg-grey-3 text-grey-7 q-mt-xl"
            active-color="primary"
            indicator-color="blue"
            align="justify"
        >
            <q-tab name="details" label="Tenant Info" />
            <q-tab name="tenancies" label="Rooms" />
            <q-tab name="meter" label="Metering" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="details">
                <div class="text-h6 q-mb-lg">Info</div>
                <q-list bordered separator>
                    <q-item>
                        <q-item-section>
                            <q-item-label>{{$store.state.tenant.nickname}}</q-item-label>
                            <q-item-label caption>Nickname</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label>{{$store.state.tenant.mobile_number}}</q-item-label>
                            <q-item-label caption>Mobile Number</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-tab-panel>

            <q-tab-panel name="tenancies">
                <div class="text-h6 q-mb-lg">Select a Room</div>
                <q-list bordered separator>
                    <q-item 
                        v-for="tenancy in $store.state.tenancies" 
                        v-bind:key="tenancy.id" 
                        clickable 
                        v-ripple 
                        @click="selectTenancy(tenancy)"
                    >
                    <q-item-section>
                        <q-item-label>{{tenancy.property_name}}</q-item-label>
                        <q-item-label caption>{{tenancy.room_title}}</q-item-label>
                        <q-item-label caption>{{tenancy.room_type}}</q-item-label>
                        <q-item-label caption>RM {{tenancy.room_price}}</q-item-label>
                    </q-item-section>
                    </q-item>
                </q-list>
            </q-tab-panel>
            </q-tab-panels>
            </q-card>
</template>

<script>
export default {
    name: 'TenantTab',
    data() {
        return {
            tab: 'tenancies'
        }
    },
    methods: {
        selectTenancy(tenancy) {
            this.$store.commit('setCurrentTenancy', tenancy);
            this.$router.push({name:'Tenancy'});
        }
    }
}
</script>

<style>

</style>