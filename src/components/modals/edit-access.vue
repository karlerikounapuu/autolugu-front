<template>
<modal name="edit-access" @before-open="beforeOpen">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h4 style="padding-top: 5px;"><i class="icon--sm icon-Gears"></i>Muuda volitust</h4>
                    <form @submit.prevent="editAccess">
                        <div class="row">
                            <div class="col-12"><input v-model="accessuser" disabled type="number" class="validate" placeholder="Volitatava kasutaja ID"  autofocus></div>
                            <div class="col-12"><input v-model="validfrom" type="text" class="validate" placeholder="Volituse alguskuupäev (disabled)" autofocus></div>
                            <div class="col-12"><input v-model="validthru" type="text" class="validate" placeholder="Volituse lõppkuupäev (disabled)" autofocus></div>
                            <div class="col-12"><button class="btn btn--primary type--uppercase" type="submit">Muuda volitust</button></div>
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
  name: 'edit-access',
  data () {
    return {
      accessuser: '',
      validfrom: '',
      validthru: '',
      accessid: ''
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
      this.accessuser = event.params.userid
      this.validfrom = event.params.from
      this.validthru = event.params.to
      this.accessid = event.params.id

      console.log(event.params)
      // console.log('Activity with ID ' + this.activity_id)
      // console.log('Car ID is ' + this.$route.params.id)
    },
    editAccess () {
      if (this.validfrom && this.validthru) {
        if (this.accessuser === this.currentUser.UserId) {
          this.$modal.hide('edit-access')
          Vue.toasted.show('Sul juba on volitus, idu x)').goAway(3000)
          return
        }
        // console.log('Fields good')
        this.$http.put('/api/caraccess/' + this.accessid, {
          from: this.validfrom,
          to: this.validthru
        })
          .then(res => this.accessSuccessful(res))
          .catch(res => this.accessFailed(res))
      } else {
        Vue.toasted.show('Palun täitke kõik väljad!').goAway(3000)
      }
    },
    accessSuccessful (res) {
      if (res.status !== 200) {
        console.log('Response status is ' + res.status)
        this.accessFailed(res)
        return
      }
      this.$modal.hide('edit-access')
      Vue.toasted.show('Volitatud kasutaja edukalt muudetud!').goAway(3000)
    },
    accessFailed (res) {
      this.$modal.hide('edit-access')
      Vue.toasted.show('Volitatud kasutaja muutmine ebaõnnestus').goAway(3000)
    }
  }
}
</script>
