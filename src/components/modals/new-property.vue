<template>
<modal name="new-property">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h4 style="padding-top: 5px;"><i class="icon--sm icon-Gears"></i>Lisa uus omadus</h4>
                    <form @submit.prevent="newProperty">
                        <div class="row">
                            <div class="col-12">
                            <div class="input-select">
                                <select v-model="prop_category" required>
                                    <option>Helisüsteem</option>
                                    <option>Interjöör</option>
                                    <option>Mugavusvarustus</option>
                                    <option>Veermik</option>
                                    <option>Mootor</option>
                                    <option>Kere</option>
                                    <option>Muu huinjaa</option>
                                </select>
                            </div>
                            </div>
                            <div class="col-12"><input v-model="prop_name" type="text" class="validate" placeholder="Parameeter / Ese" required autofocus></div>
                            <div class="col-12"><input v-model="prop_description" type="text" class="validate" placeholder="Vabatahtlik lühikirjeldus" required autofocus></div>
                            <div class="col-12"><button class="btn btn--primary type--uppercase" type="submit">Lisa omadus</button></div>
                            <hr>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</modal>
</template>
<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
export default {
  name: 'new-property',
  data () {
    return {
      prop_category: '',
      prop_name: '',
      prop_description: ''
    }
  },
  mounted () {
    console.log('Car ID is ' + this.$route.params.id)
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {
    newProperty () {
      if (this.prop_category && this.prop_name) {
        console.log('Fields good')
        this.$http.post('/api/carproperty', {
          carId: this.$route.params.id,
          value: this.prop_category,
          propertytype: {
            name: this.prop_name,
            description: this.prop_description
          }
        }).then(res => this.propertySuccessful(res))
          .catch(res => this.propertyFailed(res))
      } else {
        Vue.toasted.show('Palun täitke kõik väljad!').goAway(3000)
      }
    },
    propertySuccessful (res) {
      if (res.status !== 200) {
        console.log('Response status is ' + res.status)
        this.propertyFailed(res)
        return
      }
      this.$modal.hide('new-property')
      Vue.toasted.show('Objekt edukalt lisatud!').goAway(3000)
    },
    propertyFailed (res) {
      this.$modal.hide('new-property')
      Vue.toasted.show('Parameetri lisamine ebaõnnestus').goAway(3000)
    }
  }
}
</script>
