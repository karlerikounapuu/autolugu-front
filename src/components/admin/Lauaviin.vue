<template>
<div class="main-container">
      <v-dialog/>
            <section class="space--xxs" style="padding-bottom: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <router-link class="can-i-have-some-sleep-please" to="/superman"><h2><i style="font-size: 40px;" class="icon--sm icon-Back"></i> Admin | Dashboard<br></h2></router-link>
                        </div>
                    </div>
                </div>
            </section>
            <section class="space--xxs" style="padding-top: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Globaalne logi kasutaja kohta<br></h3>
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
      <th scope="col">Aeg</th>
      <th scope="col">Tegevus</th>
      <!-- <th scope="col">Handle</th> -->
    </tr>
  </thead>
  <tbody>
    <!-- eslint-disable-next-line -->
    <tr v-for="log in logs">
      <td>{{ log.time }}</td>
      <td>{{ log.text }}</td>
    </tr>
  </tbody>
</table>
<p v-else>Ühtegi logi pole süsteemi salvestatud.</p>
</div>
</section>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import EditPassword from '@/components/admin/modals/edit-password'
export default {
  name: 'UserLogs',
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
  components: {},
  methods: {
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
      this.$http.get('/api/log/' + this.$route.params.id, {})
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
