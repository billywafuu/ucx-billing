<template>
  <div>
    <Message
        title="Server Error" 
        description="We have experienced some technical difficulties and we are now resolving this issue. Please try again later."
    />
  </div>
</template>
<script>
import Message from '@/components/Message'
export default {
    name: "ServerError",
    components: {
        Message
    }
}
</script>

<style>

</style>