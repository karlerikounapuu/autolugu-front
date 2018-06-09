<template>
<modal name="new-access">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h4 style="padding-top: 5px;"><i class="icon--sm icon-Gears"></i>Lisa uus volitus</h4>
                    <form @submit.prevent="newAccess">
                        <div class="row">
                            <div class="col-12"><input v-model="accessuser" type="number" class="validate" placeholder="Volitatava kasutaja ID" required autofocus></div>
                            <div class="col-12"><input v-model="validfrom" type="text" class="validate" disabled placeholder="Volituse alguskuupäev (disabled)" autofocus></div>
                            <div class="col-12"><input v-model="validthru" type="text" class="validate" disabled placeholder="Volituse lõppkuupäev (disabled)" autofocus></div>
                            <div class="col-12"><button class="btn btn--primary type--uppercase" type="submit">Lisa volitus</button></div>
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
  name: 'new-access',
  data () {
    return {
      accessuser: '',
      validfrom: '',
      validthru: ''
    }
  },
  mounted () {
    console.log('Car ID is ' + this.$route.params.id)
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {
    newAccess () {
      if (this.accessuser) {
        if (this.accessuser === this.currentUser.UserId) {
          this.$modal.hide('new-access')
          Vue.toasted.show('Sul juba on volitus, idu x)').goAway(3000)
          return
        }
        // console.log('Fields good')
        this.$http.post('/api/caraccess', {
          car: {id: this.$route.params.id},
          userId: this.accessuser})
          .then(res => this.accessSuccessful(res))
          .catch(res => this.accessFailed(res))
      } else {
        Vue.toasted.show('Palun täitke kõik väljad!').goAway(3000)
      }
    },
    accessSuccessful (res) {
      if (res.status !== 200) {
        console.log('Response status is ' + res.status)
        this.propertyFailed(res)
        return
      }
      this.$modal.hide('new-access')
      Vue.toasted.show('Volitatud kasutaja edukalt lisatud!').goAway(3000)
    },
    accessFailed (res) {
      this.$modal.hide('new-access')
      Vue.toasted.show('Volitatud kasutaja lisamine ebaõnnestus').goAway(3000)
    }
  }
}
</script>
