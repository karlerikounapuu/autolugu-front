<template>
  <div class="nav-container">
    <div class="via-1527180388887" via="via-1527180388887" vio="dddd">
      <div class="bar bar--sm visible-xs">
        <div class="container">
          <div class="row">
            <div class="col-3 col-md-2">
              <router-link to="/"> <img class="logo logo-dark" alt="logo" src="static/img/logo-dark.png"> <img class="logo logo-light" alt="logo" src="static/img/logo-light.png"> </router-link>
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
                <router-link to="/"> <img class="logo logo-dark" alt="logo" src="static/img/logo-dark.png"> <img class="logo logo-light" alt="logo" src="static/imyg/logo-light.png"></router-link>
              </div>
            </div>
            <div class="col-lg-11 col-md-12 text-right text-left-xs text-left-sm">
              <div class="bar__module">
                <ul class="menu-horizontal text-left">
                  <li> <router-link to="/dashboard">Pealeht</router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard">Ajajoon</router-link>
                  </li>
                  <li class="dropdown">
                    <span class="dropdown__trigger">{{currentUser.email}}</span>
                    <div class="dropdown__container">
                      <div class="container">
                        <div class="row">
                          <div class="dropdown__content col-lg-2">
                            <ul class="menu-vertical">
                              <li>
                                <router-link to="/me" class="">Profiil</router-link>
                              </li>
                              <li>
                                <router-link to="/logout" class="">Logi välja</router-link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  }
}
</script>
