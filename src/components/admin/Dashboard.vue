<template>
<div class="main-container">
      <v-dialog/>
      <edit-password/>
            <section class="space--xxs" style="padding-bottom: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>Admin | Dashboard<br></h2>
                        </div>
                    </div>
                </div>
            </section>
            <section class="text-center space--xxs" style="padding-top: 0px;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                            <a class="block" href="#">
                                <div @click.prevent="passwordEditModal()" class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Key"></i> <span class="h5 color--primary"><p>Muuda kasutaja parool</p> </span> </div>
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="#" class="block">
                                <div @click.prevent="activityModal()" class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Repair"></i> <span class="h5 color--primary"><p>Lisa uus tegevus</p></span> </div>
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="#" class="block">
                                <div @click.prevent="accessModal()" class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Checked-User"></i> <span class="h5 color--primary"><p>Anna kasutajale ligipääs<br></p></span> </div>
                            </a>
                        </div>
                        <div class="col-md-3">
                            <router-link :to="'/car/overview/' + this.$route.params.id" class="block">
                                <div class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Eye"></i> <span class="h5 color--primary"><p>Vaata kogu informatsiooni</p></span> </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </section>
            <section class="space--xxs" style="padding-top: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Globaalne logi (viimased 10)<br></h3>
                        </div>
                    </div>
                </div>
            </section>
            <section class="space--xxs" style="padding-top: 0; padding-bottom: 0;">
              <div class="container">
                <table v-if='logs.length' class="table">
  <thead class="thead-dark">
    <tr>
      <!-- <th scope="col">#</th> -->
      <th scope="col">Identity</th>
      <th scope="col">Aeg</th>
      <th scope="col">Tegevus</th>
      <!-- <th scope="col">Handle</th> -->
    </tr>
  </thead>
  <tbody>
    <!-- eslint-disable-next-line -->
    <tr v-for="log in logs.slice(0, 9)">
      <td>{{ log.uid }}</td>
      <td>{{ log.time }}</td>
      <td>{{ log.text }}</td>
    </tr>
  </tbody>
</table>
<p v-else>Ühtegi logi pole süsteemi salvestatud.</p>
</div>
</section>
            <section class="space--xxs" style="padding-top: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Kasutajakontod<br></h3>
                        </div>
                    </div>
                </div>
            </section>
            <section class="space--xxs" style="padding-top: 0; padding-bottom: 0;">
              <div class="container">
                <table v-if='accounts.length' class="table">
  <thead class="thead-dark">
    <tr>
      <!-- <th scope="col">#</th> -->
      <th scope="col">Eesnimi</th>
      <th scope="col">Perekonnanimi</th>
      <th scope="col">Viimati külastanud</th>
      <th scope="col">Toimingud</th>
      <!-- <th scope="col">Handle</th> -->
    </tr>
  </thead>
  <tbody>
    <!-- eslint-disable-next-line -->
    <tr v-for="acc in accounts">
      <td>{{ acc.firstname }}</td>
      <td>{{ acc.lastname }}</td>
      <td>{{ acc.lastlogin }}</td>
      <td><center><router-link style="padding-right: 10px;" class="can-i-have-some-sleep-please" :to="'/superman/userlog/' + acc.identityId"><i style="text-decoration: none;" class="icon--sm icon-Receipt"></i></router-link>
      <a style="padding-left: 10px;" class="can-i-have-some-sleep-please" href="#" @click.prevent="showIdentityAlert(acc.firstname + ' ' + acc.lastname,acc.id)"><i style="text-decoration: none;" class="icon--sm icon-Fingerprint"></i></a></center></td>
    </tr>
  </tbody>
</table>
<p v-else>Ühtegi kasutajakontot pole süsteemi lisatud.</p>
</div>
</section>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import EditPassword from '@/components/admin/modals/edit-password'
export default {
  name: 'AdminDashboard',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  mounted () {
    // this.getVehicle()
    // this.getVehicleActivities()
    // this.getAccessList()
    this.getAccounts()
    this.getLogs()
  },
  props: [],
  data () {
    return {
      accounts: [],
      car: {},
      extras: [],
      properties: [],
      activities: [],
      grandtheftauto: [],
      logs: []
    }
  },
  components: {EditPassword},
  methods: {
    showIdentityAlert (username, userid) {
      this.$modal.show('dialog', {
        title: 'Kas olete kindel?',
        text: 'Olete valinud tegevuse siseneda kasutajasse "' + username + '". Teid logitakse välja. Seda sammu ei saa tagasi võtta.',
        buttons: [{
          title: 'Minek',
          handler: () => {
            this.$modal.hide('dialog')
            this.getUserToken(userid)
          }
        },
        { title: '', default: true, handler: () => {} },
        { title: 'Tagasi' }]
      })
    },
    getAccounts () {
      this.$http.get('/api/customers/', {})
        .then(res => this.fetchAccounts(res))
        .catch(res => this.fetchAccountFailed(res))
    },
    fetchAccounts (res) {
      if (res.status !== 200) {
        this.fetchAccountFailed(res)
      }
      var vm = this
      res.data.forEach(function (acc) {
        vm.accounts.push({
          id: acc.id,
          identityId: acc.identityId,
          firstname: acc.firstName,
          lastname: acc.lastName,
          lastlogin: acc.lastLogin
        })
      })

      console.log('Found total of ' + vm.accounts.length + ' accounts')
    },
    fetchAccountFailed (res) {
      console.log('Fetching error.' + res)
      // this.$router.push('/404')
      this.$toasted.show('Ei saa lugeda kasutajaid').goAway(3000)
    },
    getLogs () {
      this.$http.get('/api/log/', {})
        .then(res => this.fetchLogs(res))
        .catch(res => this.fetchlogsFailed(res))
    },
    fetchLogs (res) {
      if (res.status !== 200) {
        this.fetchLogsFailed(res)
      }
      var vm = this
      res.data.forEach(function (log) {
        vm.logs.push({
          id: log.id,
          uid: log.identityId,
          time: log.time,
          text: log.text
        })
      })

      console.log('Found total of ' + vm.logs.length + ' logs')
    },
    fetchLogsFailed (res) {
      console.log('Fetching error.' + res)
      // this.$router.push('/404')
      this.$toasted.show('Ei saa lugeda logisid').goAway(3000)
    },
    getUserToken (token) {
      this.$http.get('/api/AdminToken/' + token, {})
        .then(res => this.fetchToken(res))
        .catch(res => this.fetchTokenFailed(res))
    },
    fetchToken (res) {
      if (res.status !== 200) {
        this.fetchTokenFailed(res)
      }

      if (res.data.result) {
        // this.$toasted.show(res.data.result).goAway(3000)
        localStorage.token = res.data.result
        this.$store.dispatch('login')
        this.$toasted.show('Kasutaja vahetus tehtud!').goAway(3000)
        this.$router.push('/dashboard')
      } else {
        this.fetchTokenFailed(res)
      }
    },
    fetchTokenFailed (res) {
      console.log('Fetching error.' + res)
      // this.$router.push('/404')
      this.$toasted.show('Kasutaja tokeni saamine ebaõnnestus').goAway(3000)
    },
    passwordEditModal () {
      console.log('triggered password modal')
      this.$modal.show('edit-password', this.accounts)
    },
    kys () {
      this.$toasted.show('Idi nahui bljat').goAway(3000)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a.can-i-have-some-sleep-please:link, a.can-i-have-some-sleep-please:visited, a.can-i-have-some-sleep-please:hover, a.can-i-have-some-sleep-please:active  {
  text-decoration: none;
}
</style>
