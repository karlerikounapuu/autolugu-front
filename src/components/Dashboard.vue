<template>
<div class="main-container">
  <section class="text-center">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-lg-6">
          <div class="cta">
            <h2>Dashboard</h2>
            <p class="lead">Te pole veel ühtegi sõidukit paneeli lisanud.</p>
            <a class="btn btn--primary type--uppercase" href="#purchase-template">
            <font color="#ffffff"><span><b>Lisa uus sõiduk</b></span></font><br> </a>
          </div>
        </div>
      </div>
      <br>
      <p class="lead">Test selection relational population</p>
      <div class="row">
        <div class="input-select">
          <select v-model="make_selected" @change="populateCarModels">
            <option v-for="option in options_carmake" v-bind:key="option.value" v-bind:value="option.text">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="input-select" v-if="options_carmodel.length">
          <select v-model="model_selected">
            <option v-for="option in options_carmodel" v-bind:key="option.value" v-bind:value="option.text">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </section>
</div>
</template>
<script>
export default {
  name: 'dashboards',
  mounted () {
    this.populateCarMake()
  },
  props: [],
  data () {
    return {
      make_selected: '',
      model_selected: '',
      options_carmake: [],
      options_carmodel: []
    }
  },
  methods: {
    populateCarMake () {
      this.$http.get('/api/carmake')
        .then((response) => {
          // console.log(response)
          response.data.forEach((obj) => {
            this.options_carmake.push({text: obj.name, value: obj.makeId})
          })
          this.$toasted.show('Populated car makes').goAway(3000)
        })
    },
    populateCarModels () {
      this.$toasted.show('Populating car models').goAway(3000)
      this.$http.get('/api/carmake/1')
        .then((response) => {
          // console.log(response)
          response.data.forEach((obj) => {
            this.options_carmodel.push({text: obj.name, value: obj.modelId})
          })
          this.$toasted.show('Car models populated!').goAway(3000)
        })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
font-weight: normal;
}
ul {
list-style-type: none;
padding: 0;
}
li {
display: inline-block;
margin: 0 10px;
}
a {
color: #42b983;
}
</style>
