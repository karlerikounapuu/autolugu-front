<template>
<div class="main-container">
  <section class="text-center">
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
export default {
  name: 'dashboards',
    mounted () {
    this.populateCarMake()
  },
  props: [],
  data () {
    return {}
  },
  methods: {

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
