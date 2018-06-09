<template>
<div class="main-container">
      <v-dialog/>
      <new-extra/>
      <new-activity/>
      <new-access/>
            <section class="space--xxs" style="padding-bottom: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>{{car.name}} | {{car.make}} {{car.model}} {{car.variant}} ({{car.year}})<br></h2>
                        </div>
                    </div>
                </div>
            </section>
            <section class="text-center space--xxs" style="padding-top: 0px;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                            <a class="block" href="#">
                                <div @click.prevent="extraModal()" class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Gears"></i> <span class="h5 color--primary"><p>Lisa varustus</p> </span> </div>
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
                            <a href="#" class="block">
                                <div @click.prevent="kys()" class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Eye"></i> <span class="h5 color--primary"><p>Vaata kogu informatsiooni</p></span> </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section class="space--xxs" style="padding-top: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Auto omadused<br></h3>
                        </div>
                    </div>
                </div>
            </section>

<section class="text-center space--xxs" style="padding-top: 0; padding-bottom: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-lg-3">
                            <div class="text-block"> <i class="icon icon--lg icon-Car-2 color--dark"></i>
                                <h4>{{car.make}}</h4>
                                <p> Mark </p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <div class="text-block"> <i class="icon icon--lg icon-Dashboard color--dark"></i>
                                <h4>{{car.model}}</h4>
                                <p> Mudel </p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <div class="text-block"> <i class="icon icon--lg icon-Oil color--dark"></i>
                                <h4>{{car.variant}}</h4>
                                <p> Variant </p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <div class="text-block"> <i class="icon icon--lg icon-Timer color--dark"></i>
                                <h4>{{car.year}}</h4>
                                <p> Tootmisaasta </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="space--xxs" style="padding-top: 0; padding-bottom: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Sõiduki lisavarustus<br></h3>
                        </div>
                    </div>
                </div>
            </section>
            <section class="space--xxs" style="padding-top: 0; padding-bottom: 0;">
              <div class="container">
                <table v-if="extras.length" class="table">
  <thead class="thead-dark">
    <tr>
      <!-- <th scope="col">#</th> -->
      <th scope="col">Kategooria</th>
      <th scope="col">Lisavarustus</th>
      <th scope="col">Kirjeldus</th>
      <th scope="col">Toimingud</th>
      <!-- <th scope="col">Handle</th> -->
    </tr>
  </thead>
  <tbody>
    <!-- eslint-disable-next-line -->
    <tr v-for="extra in extras">
      <td>{{ extra.category }}</td>
      <td>{{ extra.name }} ({{ extra.id }})</td>
      <td>{{ extra.description}}</td>
      <td><center><a style="padding-right: 10px;" class="can-i-have-some-sleep-please" @click.prevent="kys()" href="#"><i style="text-decoration: none;" class="icon--sm icon-Pencil"></i></a>
      <a style="padding-left: 10px;" class="can-i-have-some-sleep-please" href="#" @click.prevent="showExtraAlert(extra.name, extra.id)"><i style="text-decoration: none;" class="icon--sm icon-Close"></i></a></center></td>
    </tr>
  </tbody>
</table>
<p v-else>Sõidukile ei ole lisavarustust lisatud.</p>
</div>
            </section>
            <section class="space--xxs" style="padding-bottom: 0px;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Seotud toimingud<br></h3>
                        </div>
                    </div>
                </div>
            </section>
            <section class="space--xxs" style="padding-top: 0; padding-bottom: 0;">
              <div class="container">
                <table v-if="activities.length" class="table">
  <thead class="thead-dark">
    <tr>
      <!-- <th scope="col">#</th> -->
      <th scope="col">Kuupäev</th>
      <th scope="col">Tegevus</th>
      <th scope="col">Kirjeldus</th>
      <th scope="col">Toimingud</th>
      <!-- <th scope="col">Handle</th> -->
    </tr>
  </thead>
  <tbody>
    <!-- eslint-disable-next-line -->
    <tr v-for="activity in activities">
      <td>{{ activity.date }}</td>
      <td>{{ activity.type }} ({{ activity.id }})</td>
      <td>{{ activity.description}}</td>
      <td><center><a style="padding-right: 10px;" class="can-i-have-some-sleep-please" @click.prevent="kys()" href="#"><i style="text-decoration: none;" class="icon--sm icon-Pencil"></i></a>
      <a style="padding-left: 10px;" class="can-i-have-some-sleep-please" href="#" @click.prevent="showActivityAlert(activity.type, activity.id)"><i style="text-decoration: none;" class="icon--sm icon-Close"></i></a></center></td>
    </tr>
  </tbody>
</table>
<p v-else>Antud sõidukiga ei ole seotud ühtegi toimingut</p>
</div>
            </section>
            <div v-if="car.description">
            <section class="space--xxs" style="padding-bottom: 0px;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Kirjeldus sõiduki kohta<br></h3>
                        </div>
                    </div>
                </div>
            </section>
            <div class="container">
              <p>{{car.description}}</p>
            </div>
          </div>
            <section class="space--xxs" style="padding-bottom: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Volitatud kasutajad<br></h3>
                        </div>
                    </div>
                </div>
              </section>
            <section class="space--xxs" style="padding-top: 0; padding-bottom: 0;">
              <div class="container">
                <table v-if="grandtheftauto.length" class="table">
  <thead class="thead-dark">
    <tr>
      <!-- <th scope="col">#</th> -->
      <th scope="col">Alates</th>
      <th scope="col">Kuni</th>
      <th scope="col">Volitatud kasutaja</th>
      <th scope="col">Toimingud</th>
      <!-- <th scope="col">Handle</th> -->
    </tr>
  </thead>
  <tbody>
    <!-- eslint-disable-next-line -->
    <tr v-for="access in grandtheftauto">
      <td>{{ access.from }}</td>
      <td>{{ access.to }}</td>
      <td>{{ access.userId }}</td>
      <td><center><a style="padding-right: 10px;" class="can-i-have-some-sleep-please" @click.prevent="kys()" href="#"><i style="text-decoration: none;" class="icon--sm icon-Pencil"></i></a>
      <a style="padding-left: 10px;" class="can-i-have-some-sleep-please" @click.prevent="kys()"><i style="text-decoration: none;" class="icon--sm icon-Close"></i></a></center></td>
    </tr>
  </tbody>
</table>
<p v-else>Te ei ole ühelegi teisele kasutajale muutmisõiguseid andnud.</p>
</div>
            </section>
        </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NewExtra from '@/components/modals/new-extra'
import NewActivity from '@/components/modals/new-activity'
import NewAccess from '@/components/modals/new-access'
export default {

  name: 'car',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  mounted () {
    this.getVehicle()
    this.getVehicleActivities()
    // this.getVehicleExtras()
    // this.getVehicleActivities()
    // this.getAccessList()
  },
  props: [],
  data () {
    return {
      car: {},
      extras: [],
      properties: [],
      activities: [],
      grandtheftauto: []
    }
  },
  components: {NewExtra, NewActivity, NewAccess},
  methods: {
    showActivityAlert (activity, activityid) {
      this.$modal.show('dialog', {
        title: 'Kas olete kindel?',
        text: 'Olete valinud tegevuse "' + activity + '" kustutamiseks. Seda sammu ei saa tagasi võtta.',
        buttons: [{
          title: 'Ḱustuta',
          handler: () => {
            this.$modal.hide('dialog')
            this.deleteActivity(activityid)
          }
        },
        { title: '', default: true, handler: () => {} },
        { title: 'Tagasi' }]
      })
    },
    showExtraAlert (extra, extraid) {
      this.$modal.show('dialog', {
        title: 'Kas olete kindel?',
        text: 'Olete valinud objekti "' + extra + '" kustutamiseks. Seda sammu ei saa tagasi võtta.',
        buttons: [{
          title: 'Ḱustuta',
          handler: () => {
            this.$modal.hide('dialog')
            this.deleteExtra(extraid)
          }
        },
        { title: '', default: true, handler: () => {} },
        { title: 'Tagasi' }]
      })
    },
    getVehicle () {
      this.$http.get('/api/car/' + this.$route.params.id, {})
        .then(res => this.fetchVehicle(res))
        .catch(res => this.fetchVehicleFailed(res))
    },
    fetchVehicle (res) {
      if (res.status !== 200) {
        this.fetchVehicleFailed(res)
      }
      var vm = this
      vm.car = {
        'name': res.data.name,
        'make': res.data.make.name,
        'model': res.data.model.name,
        'variant': res.data.variant,
        'year': res.data.year,
        'description': res.data.description
      }

      res.data.extras.forEach(function (extra) {
        vm.extras.push({
          id: extra.carExtraId,
          name: extra.name,
          description: extra.description,
          category: extra.category
        })
      })

      console.log('Found total of ' + vm.extras.length + ' extras')
    },
    fetchVehicleFailed (res) {
      console.log('Fetching error.' + res)
      this.$router.push('/404')
      this.$toasted.show('Can not fetch car').goAway(3000)
    },
    getVehicleActivities () {
      console.log('Fetching vehicle activities')
      this.$http.get('/api/caractivity/' + this.$route.params.id, {})
        .then(res => this.fetchActivity(res))
        .catch(res => this.fetchActivityFailed(res))
    },
    fetchActivity (res) {
      if (res.status !== 200) {
        this.fetchActivityFailed(res)
      }
      var vm = this
      vm.activities = []
      res.data.forEach(function (activity) {
        // console.log('Found activity ' + activity.name)
        vm.activities.push({
          'id': activity.activityId,
          'date': activity.from,
          'description': activity.content,
          'type': activity.activityType
        })
      })
      //  console.log(res.data)
      // console.log('Nimi: ' + res.data.name + ' Mark: ' + res.data.make.name + ' Mudel: ' + res.data.model.name)
    },
    deleteExtra (extraId) {
      console.log('Attempting to delete extra')
      this.$http.delete('/api/carextras/' + extraId, {})
        .then(res => this.processExtra(res))
        .catch(res => this.processExtraFailed(res))
    },
    processExtra (res) {
      if (res.status !== 200) {
        this.processExtraFailed(res)
      }
      this.$toasted.show('Lisavarustus edukalt kustutatud!').goAway(3000)
    },
    processExtraFailed (res) {
      //  this.$router.push('/404')
      console.log('Fetching error.' + res)
      this.$toasted.show('Viga lisavarustuse kustutamisel').goAway(3000)
    },
    deleteActivity (activityId) {
      console.log('Attempting to delete activity')
      this.$http.delete('/api/caractivity/' + activityId, {})
        .then(res => this.processActivity(res))
        .catch(res => this.processActivityFailed(res))
    },
    processActivity (res) {
      if (res.status !== 200) {
        this.processActivityFailed(res)
      }
      this.$toasted.show('Tegevus edukalt kustutatud!').goAway(3000)
    },
    processActivityFailed (res) {
      //  this.$router.push('/404')
      console.log('Fetching error.' + res)
      this.$toasted.show('Viga tegevuste kustutamisel').goAway(3000)
    },
    fetchActivityFailed (res) {
      //  this.$router.push('/404')
      console.log('Fetching error.' + res)
      this.$toasted.show('Viga tegevuste laadimisel').goAway(3000)
    },
    getAccessList () {
      this.$http.get('/api/caraccess/', {})
        .then(res => this.fetchAccess(res))
        .catch(res => this.fetchAccessFailed(res))
    },
    fetchAccess (res) {
      if (res.status !== 200) {
        this.fetchPropertyFailed(res)
      }
      var vm = this
      vm.grandtheftauto = []
      res.data.forEach(function (access) {
        // console.log('Found property ' + prop.property.name)
        if (access.car.id === vm.$route.params.id && access.userId !== vm.currentUser.UserId) {
          vm.grandtheftauto.push({
            'id': access.accessId,
            'userid': access.userId,
            'from': access.from,
            'to': access.to
          })
        }
      })
      console.log('Discovered ' + vm.grandtheftauto.length + ' accesses to car')
      //  console.log(res.data)
      // console.log('Nimi: ' + res.data.name + ' Mark: ' + res.data.make.name + ' Mudel: ' + res.data.model.name)
    },
    fetchAccessFailed (res) {
      //  this.$router.push('/404')
      console.log('Fetching error.' + res)
      this.$toasted.show('Ei õnnestu lugeda volitatud kasutajaid')
    },
    extraModal () {
      console.log('triggered extra modal')
      this.$modal.show('new-extra')
    },
    activityModal () {
      console.log('triggered activity modal')
      this.$modal.show('new-activity')
    },
    accessModal () {
      console.log('triggered access modal')
      this.$modal.show('new-access')
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
