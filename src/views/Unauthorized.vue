<template>
  <div>
    <Message
        title="Unauthorized Access" 
        description="You are unauthorized to access this page. Please login from the main website."
    />
  </div>
</template>
<script>
import Message from '@/components/Message'
export default {
    name: "Unauthorized",
    components: {
        Message
    }
}
</script>

<style>

</style>