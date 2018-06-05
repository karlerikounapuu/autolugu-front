
<template>
  <div>
        <div class="nav-container">
            <div class="via-1527180388887" via="via-1527180388887" vio="dddd">
                <div class="bar bar--sm visible-xs">
                    <div class="container">
                        <div class="row">
                            <div class="col-3 col-md-2">
                                <a href="index.html"> <img class="logo logo-dark" alt="logo" src="static/img/logo-dark.png"> <img class="logo logo-light" alt="logo" src="img/logo-light.png"> </a>
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
                                    <a href="index.html"> <img class="logo logo-dark" alt="logo" src="static/img/logo-dark.png"> <img class="logo logo-light" alt="logo" src="img/logo-light.png"> </a>
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
            <section class="text-center height-auto space--xs">
                <div class="container pos-vertical-center">
                    <div class="row">
                        <div class="col-md-7 col-lg-5">
                            <h2>Autentimine</h2>
                            <p class="lead">Sisestage oma konto rekvisiidid</p>
                            <form @submit.prevent="login">
                              <div class="alert alert-danger" v-if="error">{{ error }}</div>
                              <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="E-posti aadress" required autofocus>
                              <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Salasõna" required autofocus>
                              <button class="btn btn--primary type--uppercase" type="submit">Sisene</button>
                            </form> <span class="type--fine-print block">Pole veel kasutajat? <a href="#">Loo omale uus konto</a></span> </div>
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
                        <div class="col-sm-7"> <span class="type--fine-print">© <span class="update-year">2018</span> Autolugu</span> <a class="type--fine-print" href="#">Kasutustingimused</a> <a class="type--fine-print" href="#">Privaatsus</a> </div>
                        <div class="col-sm-5 text-right text-center-xs"> <a class="type--fine-print" href="#">devnull@idg.af</a> </div>
                    </div>
                </div>
            </footer>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: false
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
    login () {
      this.$http.post('/account/login', { email: this.email, password: this.password })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    loginSuccessful (req) {
      if (req.status !== 200) {
        this.loginFailed()
        return
      }
      this.error = false
      console.log(req.data)
      localStorage.token = req.data
      this.$store.dispatch('login')
      this.$toasted.show('Edukalt sisselogitud!').goAway(3000)
      this.$router.replace(this.$route.query.redirect || '/dashboard')
    },
    loginFailed () {
      this.error = 'Vale e-posti aadress või parool!'
      this.$toasted.show('Vale e-posti aadress või parool').goAway(3000)
      this.$store.dispatch('logout')
      delete localStorage.token
    }
  }
}
</script>
