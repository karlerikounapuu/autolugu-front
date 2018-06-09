<template>
<div class="main-container">
            <section v-if="cars.length" class="space--xxs">
              <div class="container">
                  <div class="row">
                    <h2 class="section-title">Sinu sõidukid ({{ cars.length }})</h2>
                  <span class="" style=""><router-link to="/car/new" class="btn__text" style="margin-left: 10px; font-weight: bold; text-decoration: none;">Lisa uus</router-link></span>
</div>
                    <div class="masonry">
                        <div class="masonry__container row masonry--active">
                            <div v-for="car in cars" v-bind:key="car.id" class="col-md-4 masonry__item">
                                <div class="card card-2 text-center">
                                    <div class="card__top">
                                        <a href="#"> <img alt="Image" src="http://www.evanpaulmotorcars.com/front_path/images/cars/placeholder-car.png"> </a>
                                    </div>
                                    <div class="card__body">
                                        <h4>{{ car.name }}</h4>
                                        <span class="type--fade">{{ car.make + ' ' + car.model }}</span>
                                    </div>
                                    <div class="card__bottom text-center">
                                        <div class="card__action"> <span class="h6 type--uppercase">Muuda</span>
                                          <router-link class="product-image" :to="{ name: 'Car', params: { id: car.id }}"><i class="icon icon--lg iconsmind icon-Gear"></i></router-link>
                                        </div>
                                        <div class="card__action"> <span class="h6 type--uppercase">Vaata</span>
                                          <router-link class="product-image" :to="'/car/overview/' + car.id"><i class="icon icon--lg iconsmind icon-Car-3"></i></router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
            </section>
  <section v-if="!cars.length" class="text-center">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-lg-6">
          <div class="cta">
            <h2>Dashboard</h2>
            <p class="lead">Te pole veel ühtegi sõidukit paneeli lisanud.</p>
            <router-link to="/car/new" class="btn btn--primary type--uppercase">
            <font color="#ffffff"><span><b>Lisa uus sõiduk</b></span></font><br> </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {

  name: 'dashboards',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  mounted () {
    this.getUserVehicles()
  },
  props: [],
  data () {
    return {
      cars: []
    }
  },
  methods: {
    getUserVehicles () {
      this.$http.get('/api/customers/' + this.currentUser.UserId, {})
        .then(res => this.resSuccessful(res))
        .catch(res => this.resFailed(res))
    },
    resSuccessful (res) {
      console.log('Response status is ' + res.status)
      // vm = this
      if (res.status !== 200) {
        this.resFailed(res)
      }
      var vm = this
      res.data.carAccess.forEach(function (vehicle) {
        vm.$http.get('/api/car/' + vehicle.car.id, {})
          .then(res => vm.fetchCar(res))
          .catch(res => vm.fetchFailed(res))
        // console.log(vehicle)
        // vm.$toasted.show(vehicle.car.name).goAway(3000)
      })
      // this.$toasted.show('Vehicles retrieved')
    },
    resFailed (res) {
      this.$toasted.show('Cant retrieve vehicles').goAway(3000)
      console.log(res)
    },
    fetchCar (res) {
      console.log(res.status)
      console.log(res.data)
      console.log('Nimi: ' + res.data.name + ' Mark: ' + res.data.make.name + ' Mudel: ' + res.data.model.name)
      this.cars.push({
        'id': res.data.id,
        'name': res.data.name,
        'make': res.data.make.name,
        'model': res.data.model.name
      })
    },
    fetchFailed (res) {
      console.log('Fetching error.' + res)
      this.$toasted.show('Can not fetch car')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
