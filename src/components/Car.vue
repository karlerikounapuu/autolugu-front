<template>
<div class="main-container">
      <v-dialog/>
      <new-property/>
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
                                <div @click="propertyModal()" class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Gears"></i> <span class="h5 color--primary"><p>Lisa uus parameeter</p> </span> </div>
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="#" class="block">
                                <div @click="activityModal()" class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Repair"></i> <span class="h5 color--primary"><p>Lisa uus tegevus&nbsp;</p></span> </div>
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="#" class="block">
                                <div @click="accessModal()" class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Checked-User"></i> <span class="h5 color--primary"><p>Anna kasutajale ligipääs<br></p></span> </div>
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="#" class="block">
                                <div @click="kys()" class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Eye"></i> <span class="h5 color--primary"><p>Vaata kogu informatsiooni</p></span> </div>
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
                <table v-if="properties.length" class="table">
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
    <tr v-for="property in properties">
      <td>{{ property.category }}</td>
      <td>{{ property.name }}</td>
      <td>{{ property.description}}</td>
      <td><center><a style="padding-right: 10px;" class="can-i-have-some-sleep-please" @click="kys()" href="#"><i style="text-decoration: none;" class="icon--sm icon-Pencil"></i></a>
      <a style="padding-left: 10px;" class="can-i-have-some-sleep-please" @click="kys()" href="#"><i style="text-decoration: none;" class="icon--sm icon-Close"></i></a></center></td>
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
      <td>{{ activity.type }}</td>
      <td>{{ activity.description}}</td>
      <td><center><a style="padding-right: 10px;" class="can-i-have-some-sleep-please" @click="kys()" href="#"><i style="text-decoration: none;" class="icon--sm icon-Pencil"></i></a>
      <a style="padding-left: 10px;" class="can-i-have-some-sleep-please" @click="kys()" href="#"><i style="text-decoration: none;" class="icon--sm icon-Close"></i></a></center></td>
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
      <td><center><a style="padding-right: 10px;" class="can-i-have-some-sleep-please" @click="kys()" href="#"><i style="text-decoration: none;" class="icon--sm icon-Pencil"></i></a>
      <a style="padding-left: 10px;" class="can-i-have-some-sleep-please" @click="kys()" href="#"><i style="text-decoration: none;" class="icon--sm icon-Close"></i></a></center></td>
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
import NewProperty from '@/components/modals/new-property'
import NewActivity from '@/components/modals/new-activity'
import NewAccess from '@/components/modals/new-access'
export default {

  name: 'car',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  mounted () {
    this.getVehicle()
    this.getVehicleProperties()
    this.getVehicleActivities()
    this.getAccessList()
  },
  props: [],
  data () {
    return {
      car: {},
      properties: [],
      activities: [],
      grandtheftauto: []
    }
  },
  components: {NewProperty, NewActivity, NewAccess},
  methods: {
    propertyModal () {
      console.log('triggered property modal')
      this.$modal.show('new-property')
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
        if(access.car.id == vm.$route.params.id && access.userId != vm.currentUser.UserId) {
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
    getVehicle () {
      this.$http.get('/api/car/' + this.$route.params.id, {})
        .then(res => this.fetchCar(res))
        .catch(res => this.fetchCarFailed(res))
    },
    getVehicleProperties () {
      console.log('Fetching vehicle properties')
      this.$http.get('/api/carproperty/' + this.$route.params.id, {})
        .then(res => this.fetchProperty(res))
        .catch(res => this.fetchPropertyFailed(res))
    },
    fetchProperty (res) {
      if (res.status !== 200) {
        this.fetchPropertyFailed(res)
      }
      var vm = this
      vm.properties = []
      res.data.forEach(function (prop) {
        console.log('Found property ' + prop.property.name)
        vm.properties.push({
          'id': prop.property.id,
          'name': prop.property.name,
          'description': prop.property.description,
          'category': prop.value
        })
      })
      //  console.log(res.data)
      // console.log('Nimi: ' + res.data.name + ' Mark: ' + res.data.make.name + ' Mudel: ' + res.data.model.name)
    },
    fetchPropertyFailed (res) {
      //  this.$router.push('/404')
      console.log('Fetching error.' + res)
      this.$toasted.show('Can not fetch properties')
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
    fetchActivityFailed (res) {
      //  this.$router.push('/404')
      console.log('Fetching error.' + res)
      this.$toasted.show('Can not fetch activities')
    },
    fetchCar (res) {
      if (res.status !== 200) {
        this.fetchCarFailed(res)
      }
      var vm = this
      vm.car = {}
      //  console.log(res.status)
      //  console.log(res.data)
      console.log('Nimi: ' + res.data.name + ' Mark: ' + res.data.make.name + ' Mudel: ' + res.data.model.name)
      vm.car = {
        'name': res.data.name,
        'make': res.data.make.name,
        'model': res.data.model.name,
        'variant': res.data.variant,
        'year': res.data.year,
        'description': res.data.description
      }
    },
    fetchCarFailed (res) {
      //  this.$router.push('/404')
      console.log('Fetching error.' + res)
      this.$router.push('/404')
      this.$toasted.show('Can not fetch car').goAway(3000)
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
