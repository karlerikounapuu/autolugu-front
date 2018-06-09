<template>
<modal name="edit-activity" @before-open="beforeOpen">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h4 style="padding-top: 5px;"><i class="icon--sm icon-Repair"></i>Muuda tegevust</h4>
                    <form @submit.prevent="editActivity">
                        <div class="row">
                            <div class="col-12">
                            <div class="input-select">
                                <select v-model="activitytype" required>
                                    <option v-for='activity in activities' v-bind:key='activity.name' required v-bind:value="activity.id">{{ activity.name }}</option>
                                </select>
                            </div>
                            </div>
                            <div class="col-12"><input v-model='description' type="text" class="validate" placeholder="Tegevuse sisu / kirjeldus" required autofocus></div>
                            <div class="col-12"><input v-model='date' type="text" class="validate" placeholder="Tegevuse aeg" autofocus></div>
                            <div class="col-12"><button class="btn btn--primary type--uppercase" type="submit">Muuda tegevus</button></div>
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
  name: 'edit-activity',
  data () {
    return {
      activitytype: '',
      description: '',
      date: '',
      activities: [],
      activity_id: ''
    }
  },
  mounted () {
    // console.log('Car ID is ' + this.$route.params.id)
    this.getActivityTypes()
    // console.log('scope is ' + this.$parent)
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {
    beforeOpen (event) {
      this.activitytype = event.params.typeid
      this.description = event.params.description
      this.date = event.params.date
      this.activity_id = event.params.id

      console.log('Activity with ID ' + this.activity_id)
      console.log('Car ID is ' + this.$route.params.id)
    },
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
      this.$modal.hide('edit-activity')
      Vue.toasted.show('Parameetri lisamine ebaõnnestus').goAway(3000)
    },
    editActivity () {
      console.log('Activity type is ' + this.activitytype + ' and description ' + this.description)
      if (this.activitytype && this.description) {
        console.log('Fields good')
        this.$http.put('/api/caractivity/' + this.activity_id, {
          ActivityId: this.activity_id,
          Content: this.description,
          From: this.date,
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
      console.log(res.status)
      this.$modal.hide('edit-activity')
      Vue.toasted.show('Tegevus edukalt muudetud!').goAway(3000)
    },
    activityFailed (res) {
      this.$modal.hide('edit-activity')
      Vue.toasted.show('Tegevuse muutmine ebaõnnestus').goAway(3000)
    }
  }
}
</script>
