<template>
<div class="main-container">
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
                            <a href="#" class="block">
                                <div class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Credit-Card2"></i> <span class="h5 color--primary"><p>Lisa uus parameeter</p> </span> </div>
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="#" class="block">
                                <div class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Cloud"></i> <span class="h5 color--primary"><p>Lisa uus uuendus&nbsp;</p></span> </div>
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="#" class="block">
                                <div class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Checked-User"></i> <span class="h5 color--primary"><p>Anna kasutajale ligipääs<br></p></span> </div>
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="#" class="block">
                                <div class="feature boxed boxed--border border--round"> <i class="icon--lg icon-Handshake"></i> <span class="h5 color--primary"><p>Vaata kogu informatsiooni</p></span> </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <!--
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
                            <div class="text-block"> <i class="icon icon--lg icon-Mail-3 color--dark"></i>
                                <h4>{{car.make}}</h4>
                                <p> Mark </p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <div class="text-block"> <i class="icon icon--lg icon-Air-Balloon color--dark"></i>
                                <h4>{{car.model}}</h4>
                                <p> Mudel </p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <div class="text-block"> <i class="icon icon--lg icon-Bacteria color--dark"></i>
                                <h4>{{car.variant}}</h4>
                                <p> Variant </p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <div class="text-block"> <i class="icon icon--lg icon-Fingerprint-2 color--dark"></i>
                                <h4>{{car.year}}</h4>
                                <p> Tootmisaasta </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> -->
            <section class="space--xxs" style="padding-top: 0;">
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
                <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</div>
            </section>
            <section class="space--xxs" style="">
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
                <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</div>
            </section>
            <div v-if="car.description">
            <section class="space--xxs" style="padding-top: 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Kirjeldus sõiduki kohta<br></h3>
                        </div>
                    </div>
                </div>
            </section>
            <section class="space--xxs">
              <p>{{car.description}}</p>
            </section>
          </div>
        </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {

  name: 'car',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  mounted () {
    this.getVehicle()
  },
  props: [],
  data () {
    return {
      car: {}
    }
  },
  methods: {
    getVehicle () {
      this.$http.get('/api/car/' + this.$route.params.id, {})
        .then(res => this.fetchCar(res))
        .catch(res => this.fetchFailed(res))
    },
    fetchCar (res) {
      if (res.status !== 200) {
        this.resFailed(res)
      }
      var vm = this
      //console.log(res.status)
      //console.log(res.data)
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
    fetchFailed (res) {
      //this.$router.push('/404')
      console.log('Fetching error.' + res)
      this.$toasted.show('Can not fetch car')

    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
