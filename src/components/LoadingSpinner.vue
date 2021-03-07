<template>
    <div class="q-pa-xl text-center">
        <q-spinner
            color="primary"
            size="3em"
            :thickness="10"
        />
        <div class="q-pa-sm text-h6" v-if="!label"> Loading..</div>
        <div class="q-pa-sm text-h6" v-if="label"> {{label}}</div>
    </div>
</template>

<script>
export default {
    name: "LoadingSpinner",
    props: ['label']
}
</script>