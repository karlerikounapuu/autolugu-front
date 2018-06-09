<template>
<div class="main-container">
  <section class="space--xxs">
    <div class="container center">
      <div class="row justify-content-md-center">
        <div class="col-lg-6 col-md-6">
          <form @submit.prevent="registercar">
          <!---->
          <center><h2>Uue sõiduki lisamine</h2></center>
          <label for="carname">Sõiduki alias</label>
          <input placeholder="Minu hea auto" autofocus="autofocus" class="validate" required autocomplete="off" type="text" v-model="carname">

          <label for="make_selected">Sõiduki tootja</label>
          <div class="input-select">
            <select required v-model="make_selected" @change="populateCarModels">
              <option v-for="option in options_carmake" v-bind:key="option.text" required v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>

          <label for="model_selected">Sõiduki mudel</label>
          <div class="input-select" v-if="options_carmodel.length">
            <select required v-model="model_selected">
              <option v-for="option in options_carmodel" v-bind:key="option.text" required v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>

          <label for="caryear">Väljalaske aasta</label>
          <input placeholder="1420" autofocus="autofocus" class="validate" required autocomplete="off" type="number" v-model="caryear">
          <label for="carvarant">Variant</label>
          <input placeholder="2.0 penta turbo" autofocus="autofocus" required class="validate" autocomplete="off" type="text" v-model="carvariant">
          <label for="cardescription">Lühitutvustus</label>
          <input placeholder="Mittekohustuslik tutvustus oma sõiduki kohta" autofocus="autofocus" class="validate" autocomplete="off" type="text" v-model="cardescription">
          <button class="btn btn--primary type--uppercase" type="submit">Lisa sõiduk</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CreateCar',
  mounted () {
    this.populateCarMake()
    // this.$toasted.show('Token' + localStorage.token).goAway(3000)
  },
  data () {
    return {
      make_selected: '',
      model_selected: '',
      options_carmake: [],
      options_carmodel: [],
      carname: '',
      caryear: '',
      carvariant: '',
      cardescription: '',
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
    populateCarMake () {
      this.$http.get('/api/carmake')
        .then((response) => {
          // console.log(response)
          response.data.forEach((obj) => {
            this.options_carmake.push({text: obj.name, value: obj.makeId})
          })
          // this.$toasted.show('Populated car makes').goAway(3000)
        })
    },
    populateCarModels () {
      // Empty carmodel list unless you want BMW Multipla's
      if (this.options_carmodel.length) {
        this.options_carmodel = []
      }
      // this.$toasted.show('Populating car models').goAway(3000)
      this.$http.get('/api/carmake/' + this.make_selected)
        .then((response) => {
          // console.log(response)
          response.data.forEach((obj) => {
            // this.$toasted.show('Found something!').goAway(3000)
            this.options_carmodel.push({text: obj.name, value: obj.modelId})
          })
          // this.$toasted.show('Car models populated!').goAway(3000)
        })
    },
    checkCurrentLogin () {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/car/new')
      }
    },
    registercar () {
      this.$http.post('/api/car', {
        name: this.carname,
        year: this.caryear,
        variant: this.carvariant,
        description: this.cardescription,
        makeId: this.make_selected,
        modelId: this.model_selected
      }).then(request => this.registerSuccessful(request))
        .catch(request => this.registerFailed(request))
    },
    registerSuccessful (req) {
      if (req.status !== 200) {
        this.registerFailed(req)
        return
      }
      //  this.error = 'Konto edukalt loodud!'
      console.log(req.data)
      //  localStorage.token = req.data
      //  this.$store.dispatch('login')
      this.$toasted.show(this.carname + ' edukalt lisatud!').goAway(3000)
      // this.$toasted.show(this.carname)
      this.$router.push({ path: '/' })
    },
    registerFailed (req) {
      this.error = 'Registreerimine luhtus: ' + req.data
      this.$toasted.show('Viga uue auto lisamisel' + req).goAway(3000)
      console.log(req)
      // this.$store.dispatch('logout')
      // delete localStorage.token
    }
  }
}
</script>
