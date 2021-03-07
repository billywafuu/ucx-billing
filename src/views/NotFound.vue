<template>
  <div>
    <Message
        title="Server Access Failed" 
        description="We seem cannot access the server at this moment. Please try again later."
    />
  </div>
</template>
<script>
import Message from '@/components/Message'
export default {
    name: "NotFound",
    components: {
        Message
    }
}
</script>

<style>

</style>