<template>
<modal name="new-activity">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h4 style="padding-top: 5px;"><i class="icon--sm icon-Repair"></i>Lisa uus tegevus</h4>
                    <form @submit.prevent="newActivity">
                        <div class="row">
                            <div class="col-12">
                            <div class="input-select">
                                <select v-model="activitytype" required>
                                    <option v-for='activity in activities' v-bind:key='activity.name' required v-bind:value="activity.id">{{ activity.name }}</option>
                                </select>
                            </div>
                            </div>
                            <div class="col-12"><input v-model="description" type="text" class="validate" placeholder="Tegevuse sisu / kirjeldus" required autofocus></div>
                            <div class="col-12"><input v-model="date" type="text" class="validate" placeholder="Tegevuse aeg" autofocus></div>
                            <div class="col-12"><button class="btn btn--primary type--uppercase" type="submit">Lisa tegevus</button></div>
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
  name: 'new-activity',
  data () {
    return {
      activitytype: '',
      description: '',
      date: '',
      activities: []
    }
  },
  mounted () {
    console.log('Car ID is ' + this.$route.params.id)
    this.getActivityTypes()
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {
    getActivityTypes () {
      console.log('Attempting to fetch activity types')
      this.$http.get('/api/activitytypes', {})
        .then(res => this.fetchActivityTypes(res))
        .catch(res => this.fetchActivityFailed(res))
    },
    fetchActivityTypes (res) {
      console.log('Status of fetch: ' + res.status)
      if (res.status !== 200) {
        this.fetchActivityFailed(res)
        return
      }

      var vm = this
      res.data.forEach(function (type) {
        vm.activities.push({
          id: type.activityTypeId,
          name: type.name,
          description: type.description
        })
      })
    },
    fetchActivityFailed (res) {
      console.log('Fetch failed: ' + res)
      this.$modal.hide('new-activity')
      Vue.toasted.show('Parameetri lisamine ebaõnnestus').goAway(3000)
    },
    newActivity () {
      console.log('Activity type is ' + this.activitytype)
      if (this.activitytype && this.description) {
        console.log('Fields good')
        this.$http.post('/api/caractivity', {
          carId: this.$route.params.id,
          content: this.description,
          typeId: this.activitytype
        }).then(res => this.activitySuccessful(res))
          .catch(res => this.activityFailed(res))
      } else {
        Vue.toasted.show('Palun täitke kõik väljad!').goAway(3000)
      }
    },
    activitySuccessful (res) {
      if (res.status !== 200) {
        console.log('Response status is ' + res.status)
        this.propertyFailed(res)
        return
      }
      this.$modal.hide('new-activity')
      Vue.toasted.show('Tegevus edukalt lisatud!').goAway(3000)
    },
    activityFailed (res) {
      this.$modal.hide('new-activity')
      Vue.toasted.show('Tegevuse lisamine ebaõnnestus').goAway(3000)
    }
  }
}
</script>
