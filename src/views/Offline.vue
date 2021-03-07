<template>
  <div>
    <Message
        title="Under Maintenance" 
        description="We are sorry for the inconvenience but the system is under maintenance. Please try again later."
    />
  </div>
</template>
<script>
import Message from '@/components/Message'
export default {
    name: "Offline",
    components: {
        Message
    }
}
</script>

<style>

</style>