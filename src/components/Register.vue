<template>
<div>
  <div class="nav-container">
    <div class="via-1527180388887" via="via-1527180388887" vio="dddd">
        <div class="bar bar--sm visible-xs">
            <div class="container">
                <div class="row">
                    <div class="col-3 col-md-2">
                        <router-link to="/"> <img class="logo logo-dark" alt="logo" src="/static/img/logo-dark.png"> <img class="logo logo-light" alt="logo" src="/static/img/logo-light.png"> </router-link>
                    </div>
                    <div class="col-9 col-md-10 text-right">
                        <a href="#" class="hamburger-toggle" data-toggle-class="#menu1;hidden-xs hidden-sm"> <i class="icon icon--sm stack-interface stack-menu"></i> </a>
                    </div>
                </div>
            </div>
        </div>
        <nav id="menu1" class="bar bar-1 hidden-xs">
            <div class="container">
                <div class="row">
                    <div class="col-lg-1 col-md-2 hidden-xs">
                        <div class="bar__module">
                            <router-link to="/"> <img class="logo logo-dark" alt="logo" src="/static/img/logo-dark.png"> <img class="logo logo-light" alt="logo" src="/static/img/logo-light.png"> </router-link>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-10 text-right text-left-xs text-left-sm">
                        <div class="bar__module">
                            <ul class="menu-horizontal text-left">
                                <li> <router-link to="/" class="">Logi sisse</router-link>
                          </li>
                          <li>
                            <router-link to="register" class="">Loo konto</router-link> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</div>
<div class="main-container">
    <section class="space--xs imageblock switchable feature-large">
        <div class="imageblock__content col-lg-5 col-md-4 pos-right">
            <div class="background-image-holder"><img src="/static/img/inner-3.jpg"></div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-md-7">
                    <h2>Uue konto loomine</h2>
                    <div class="alert alert-danger" v-if="error">{{ error }}</div>
                    <form @submit.prevent="register">
                        <div class="row">
                            <div class="col-12"><input v-model="firstname" type="text" id="firstname" class="validate" placeholder="Eesnimi" required autofocus></div>
                            <div class="col-12"><input v-model="lastname" type="text" id="lastname" class="validate" placeholder="Perekonnanimi" required autofocus></div>
                            <div class="col-12"><input v-model="email" type="email" id="email" class="validate" placeholder="E-posti aadress" required autofocus></div>
                            <div class="col-12"><input v-model="password" type="password" id="password" class="validate" placeholder="Parool" required autofocus></div>
                            <div class="col-12"><button class="btn btn--primary type--uppercase" type="submit">Loo konto</button></div>
                            <hr>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
            <footer class="text-center-xs space--xs">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-7">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-7"> <span class="type--fine-print">© <span class="update-year">2018</span> Autolugu</span> <router-link to="/" class="type--fine-print" >Kasutustingimused</router-link> <router-link class="type--fine-print" to="/">Privaatsus</router-link> </div>
                        <div class="col-sm-5 text-right text-center-xs"> <router-link class="type--fine-print" to="/">devnull@idg.af</router-link> </div>
                    </div>
                </div>
            </footer>
</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      error: '',
      errors: []
    }
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
    checkCurrentLogin () {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/dashboard')
      }
    },
    register () {
      this.$http.post('/account/register', {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      })
        .then((response) => this.registerSuccessful(response))
        .catch((error) => this.registerFailed(error))
    },
    registerSuccessful (res) {
      console.log('Register successful triggered')
      if (res.status !== 201) {
        this.registerFailed(res)
        return
      }
      this.$toasted.show('Konto edukalt loodud. Saate nüüd sisse logida.').goAway(3000)
      this.$router.push({ path: '/' })
    },
    registerFailed (res) {
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
