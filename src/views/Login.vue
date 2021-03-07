<template>
  <div>
      <q-card flat>
        <div class="text-h5 q-pa-md text-center">
            Login
        </div>
        <q-form
        @submit="Login"
        class="q-gutter-md"
        >
        <q-input
            filled
            v-model="email_address"
            type="email"
            label="Email Address *"
            hint="Your UCX Operator/Administrator email address."
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please enter valid email address.']"
        />

        <q-input
            filled
            type="password"
            v-model="password"
            label="Password *"
            lazy-rules
            :rules="[
            val => val !== null && val !== '' || 'Please enter the account password.',
            ]"
        />
        <div class="text-center">
            <q-btn label="Login" type="submit" color="primary"/>
        </div>
        </q-form>
      </q-card>
  </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            email_address: "",
            password: ""
        }
    },
    methods: {
        Login() {
            this.$http({
                url: 'authentication/login', 
                method: 'POST',
                data: {
                    email_address: this.email_address,
                    password: this.password,
                    keepMeLoggedIn: false
                }
            }).then((response) => {
                if (response.data['status'] == 'login_success') {
                    if (response.data['body']['role_name'] !== 'SKA' && response.data['body']['role_name'] !== 'Operator')  {
                        this.$q.notify({
                            message: "Only administrators and operators can access the billing system.",
                            color: "negative"
                        });
                    }

                    var user = {
                        userId: response.data['body']['user_id'],
                        token: response.data['body']['token'],
                        name: response.data['body']['first_name'] + ' ' + response.data['body']['last_name'],
                        role: response.data['body']['role_name']
                    }

                    this.$store.commit('login', user);
                    this.$q.notify({
                        message: "Login success. Please enter the tenancy number that you want to bill.",
                        color: "positive"
                    });
                    this.$router.push({name: 'BillingPage'});
                    console.log("Opening the billing page..");
                } else {
                    this.$q.notify({
                        message: "Login failed. Please enter your email address and password correctly.",
                        color: "negative"
                    });
                }
            }).catch((err) => {
                if (err.response.status == 400) {
                    this.$q.notify({
                        message: "Login failed. Please enter your email address and password correctly.",
                        color: "negative"
                    });                    
                }
            })
        }
    }, 
    created() {
        if (this.$store.state.isLoggedIn) {
            this.$router.push({name: 'BillingPage'});
            console.log("Opening the billing page..");
        }
    }
}
</script>

<style>

</style>