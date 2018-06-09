<template>
<div class="main-container">
      <v-dialog/>
      <new-extra/>
      <edit-extra/>
      <new-activity/>
      <edit-activity/>
      <new-access/>
      <edit-access/>
            <section class="space--xxs" style="padding-bottom: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>{{car.name}} | {{car.make}} {{car.model}} {{car.variant}} ({{car.year}})<br></h2>
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
  <thead class="">
    <tr>
      <!-- <th scope="col">#</th> -->
      <th style="border-bottom: 0" scope="col">Kategooria</th>
      <th style="border-bottom: 0" scope="col">Lisavarustus</th>
      <th style="border-bottom: 0" scope="col">Kirjeldus</th>
      <!-- <th scope="col">Handle</th> -->
    </tr>
  </thead>
  <tbody>
    <!-- eslint-disable-next-line -->
    <tr v-for="extra in extras">
      <td>{{ extra.category }}</td>
      <td>{{ extra.name }}</td>
      <td>{{ extra.description}}</td>
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
                            <h3>Seotud tegevused<br></h3>
                        </div>
                    </div>
                </div>
            </section>
            <section class="space--xxs" style="padding-top: 0; padding-bottom: 0;">
              <div class="container">
                <table v-if="activities.length" class="table">
  <thead class="">
    <tr>
      <!-- <th scope="col">#</th> -->
      <th style="border-bottom: 0" scope="col">Kuupäev</th>
      <th style="border-bottom: 0" scope="col">Tegevus</th>
      <th style="border-bottom: 0" scope="col">Kirjeldus</th>
      <!-- <th scope="col">Handle</th> -->
    </tr>
  </thead>
  <tbody>
    <!-- eslint-disable-next-line -->
    <tr v-for="activity in activities">
      <td>{{ activity.date }}</td>
      <td>{{ activity.type }}</td>
      <td>{{ activity.description}}</td>
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
        </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NewExtra from '@/components/modals/new-extra'
import EditExtra from '@/components/modals/edit-extra'
import NewActivity from '@/components/modals/new-activity'
import EditActivity from '@/components/modals/edit-activity'
import NewAccess from '@/components/modals/new-access'
import EditAccess from '@/components/modals/edit-access'

export default {
  name: 'CarOverview',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  mounted () {
    this.getVehicle()
    this.getVehicleActivities()
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
  components: {NewExtra, EditExtra, EditActivity, NewActivity, NewAccess, EditAccess},
  methods: {
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
          'type': activity.activityType,
          'typeid': activity.typeId
        })
      })
      console.log(vm.activities)
      // console.log('Nimi: ' + res.data.name + ' Mark: ' + res.data.make.name + ' Mudel: ' + res.data.model.name)
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
