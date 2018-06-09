<template>
<modal name="edit-password" @before-open="beforeOpen">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h4 style="padding-top: 5px;"><i class="icon--sm icon-Key"></i>Muuda kasutaja parool</h4>
                    <form @submit.prevent="editPassword">
                        <div class="row">
                            <div class="col-12">
                            <div class="input-select">
                                <select v-model="uuid" required>
                                    <option v-for='acc in accounts' v-bind:key="acc.firstname + ' ' + acc.lastname" required v-bind:value="{uuid: acc.identityId, id: acc.id, email: acc.email}">{{ acc.firstname + ' ' + acc.lastname + ' (uid: ' + acc.id + ')'}}</option>
                                </select>
                            </div>
                            </div>
                            <div class="col-12"><input v-model='password' type="password" class="validate" placeholder="Uus parool" required autofocus></div>
                            <div class="col-12"><button class="btn btn--primary type--uppercase" type="submit">Muuda parool</button></div>
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
  name: 'edit-password',
  data () {
    return {
      uuid: {},
      accounts: [],
      password: ''
    }
  },
  mounted () {
    // console.log('Car ID is ' + this.$route.params.id)
    // this.getActivityTypes()
    // console.log('scope is ' + this.$parent)
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {
    beforeOpen (event) {
      this.accounts = event.params
    },
    editPassword () {
      if (this.uuid && this.password) {
      // Vue.toasted.show(this.uuid.uuid + ' ' + this.uuid.id)
        this.$http.put('/api/customers/' + this.uuid.id, {
          identityId: this.uuid.uuid,
          email: this.uuid.email,
          password: this.password
        }).then(res => this.editSuccessful(res))
          .catch(res => this.editFailed(res))
      } else {
        Vue.toasted.show('Palun täitke kõik väljad!').goAway(3000)
      }
    },
    editSuccessful (res) {
      if (res.status !== 200) {
        console.log('Response status is ' + res.status)
        this.editFailed(res)
        return
      }
      console.log(res)
      this.$modal.hide('edit-password')
      Vue.toasted.show('Parool edukalt muudetud!').goAway(3000)
    },
    editFailed (res) {
      this.$modal.hide('edit-password')
      Vue.toasted.show('Parooli muutmine ebaõnnestus').goAway(3000)
    }
  }
}
</script>
