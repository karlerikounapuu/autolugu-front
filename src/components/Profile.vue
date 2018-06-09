<template>
<div class="main-container">
            <section class="height-auto text-center space--xxs">
                <div class="container pos-vertical-center">
                    <div class="row">
                        <div class="col-md-7 col-lg-5">
                            <h2>Profiil</h2>
                            <p class="lead"> Antud lehel saate muuta enda kasutajakonto sätteid. </p>
                            <form @submit.prevent="updateProfile">
                              <input type="text" v-model='firstname' required placeholder="Eesnimi">
                              <input type="text" v-model='lastname' required placeholder="Perekonnanimi">
                              <input type="email" v-model='email' required placeholder="E-posti Address">
                              <input type="password" v-model='password' placeholder="Uus parool">
                              <input type="password" v-model='passwordconfirm' placeholder="Uus parool uuesti">
                              <button class="btn btn--primary type--uppercase" type="submit">Uuenda andmeid</button> </form> <span class="type--fine-print block"><router-link to="/">Tagasi pealehele</router-link></span> </div>
                    </div>
                </div>
            </section>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordconfirm: '',
      identityid: '',
      error: '',
      errors: []
    }
  },
  mounted () {
    this.getUserProfile()
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    getUserProfile () {
      this.$http.get('/api/customers/' + this.currentUser.UserId, {})
        .then(res => this.getDetails(res))
        .catch(res => this.getDetailsFailed(res))
    },
    getDetails (res) {
      if (res.status !== 200) {
        this.getDetailsFailed(res)
        return
      }
      this.firstname = res.data.firstName
      this.lastname = res.data.lastName
      this.email = this.currentUser.email
      this.identityId = res.data.identityId
      console.log('response status ' + res.status)
      console.log(res.data)
    },
    getDetailsFailed (res) {
      console.log(res)
      this.$toasted.show('Viga andmete saamisel: ' + res)
    },
    checkCurrentLogin () {
      if (!this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/')
      }
    },
    updateProfile () {
      if (this.password && this.password === this.passwordconfirm) {
        this.$http.put('/api/customers/' + this.currentUser.UserId, {
          identityId: this.identityId,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password
        })
          .then((response) => this.updateSuccessful(response))
          .catch((error) => this.updateFailed(error))
      } else if ((this.password || this.passwordconfirm) && this.password !== this.passwordconfirm) {
        this.$toasted.show('Paroolid ei kattu').goAway(3000)
      } else {
        this.$http.put('/api/customers/' + this.currentUser.UserId, {
          identityId: this.identityId,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email
        })
          .then((response) => this.updateSuccessful(response))
          .catch((error) => this.updateFailed(error))
      }
    },
    updateSuccessful (res) {
      console.log('Register successful triggered')
      if (res.status !== 200) {
        this.registerFailed(res)
        return
      }
      this.$toasted.show('Konto edukalt uuendatud').goAway(3000)
      this.$router.push({ path: '/' })
    },
    updateFailed (res) {
      console.log(res.response.data)
      if (res.response.data) {
        if (res.response.data.errors) {
          var vm = this
          vm.errors = []
          res.response.data.errors.forEach(function (err) {
            // console.log(err.description)
            vm.errors.push(err['description'])
            // Vue.toasted.show(err.description);
          })
        } else {
          for (var k in res.response.data) {
            this.$toasted.show('Viga atribuudil ' + k + ': ' + res.response.data[k][0]).goAway(5000)
          }
        }
      }
      console.log(this.errors)
      this.errors.forEach(function (err) {
        vm.$toasted.show(err).goAway(5000)
      })
      this.error = 'Kasutaja registreerimine ebaõnnestus.'
    }
  }
}
</script>
