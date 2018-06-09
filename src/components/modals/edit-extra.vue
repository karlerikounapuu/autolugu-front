<template>
<modal name="edit-extra" @before-open="beforeOpen">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h4 style="padding-top: 5px;"><i class="icon--sm icon-Gears"></i>Muuda varustust</h4>
                    <form @submit.prevent="editExtra">
                        <div class="row">
                            <div class="col-12">
                            <div class="input-select">
                                <select v-model="extra_category" required>
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
                            <div class="col-12"><input v-model="extra_name" type="text" class="validate" placeholder="Parameeter / Ese" required autofocus></div>
                            <div class="col-12"><input v-model="extra_description" type="text" class="validate" placeholder="Vabatahtlik lühikirjeldus" required autofocus></div>
                            <div class="col-12"><button class="btn btn--primary type--uppercase" type="submit">Lisa varustus</button></div>
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
  name: 'edit-extra',
  data () {
    return {
      extra_category: '',
      extra_name: '',
      extra_description: '',
      extra_id: ''
    }
  },
  mounted () {
    console.log('Car ID is ' + this.$route.params.id)
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {
    beforeOpen (event) {
      this.extra_category = event.params.category
      this.extra_name = event.params.name
      this.extra_description = event.params.description
      this.extra_id = event.params.id

      console.log('Extra with ID ' + this.extra_id)
      console.log('Car ID is ' + this.$route.params.id)
    },
    editExtra () {
      if (this.extra_category && this.extra_name) {
        console.log('Fields good')
        this.$http.put('/api/carextras/' + this.extra_id, {
          carId: this.$route.params.id,
          category: this.extra_category,
          name: this.extra_name,
          description: this.extra_description
        })
          .then(res => this.extraSuccessful(res))
          .catch(res => this.extraFailed(res))
      } else {
        Vue.toasted.show('Palun täitke kõik väljad!').goAway(3000)
      }
    },
    extraSuccessful (res) {
      if (res.status !== 200) {
        console.log('Response status is ' + res.status)
        this.extraFailed(res)
        return
      }
      this.$modal.hide('edit-extra')
      Vue.toasted.show('Varustus edukalt muudetud!').goAway(3000)
    },
    extraFailed (res) {
      this.$modal.hide('edit-extra')
      Vue.toasted.show('Varustuse muutmine ebaõnnestus').goAway(3000)
    }
  }
}
</script>
