<template>
  <div id="app">
    <template v-if="currentUser && this.$router.currentRoute.fullPath != '/404'">
      <Navbar></Navbar>
    </template>
    <div class="container-fluid">
      <router-view></router-view>
      <template v-if="currentUser && this.$router.currentRoute.fullPath != '/404'">
        <Foot></Foot>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'
export default {
  name: 'app',
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
      console.log(this.$router.currentRoute)
      if (!this.currentUser && this.$route.path !== '/register' && this.$route.path !== '/') {
        this.$router.push('/?redirect=' + this.$route.path)
      } else {
        console.log(localStorage.token)
        console.log(this.currentUser.UserId)
      }
    }
  },
  components: {
    Navbar,
    Foot
  }
}
</script>
