<template>
    <div>
        <div class="input-select">
            <select v-model="selected" class="validate-required" style="width: 30%" name="depart" id="depart">
                <option selected disabled>Choose</option>
                <option v-for="option in options" v-bind:value="option.value">
                    {{ option.text }}
                </option>
            </select>
            <span>Selected: {{ selected }}</span>

        </div>

    </div>
</template>
<script>
export default {
  name: "CarMakeList"
  mounted() {
    this.populate()
  },
  props: [],
  data(){
    return {
      selected: 'Choose',
      options: [
      { text: 'a', value: 'b' }
      ]
    }
  },
  methods: {
    populate(){
      this.$http.get('/api/carmake')
      .then((response)=> {
        response.body.result.stations.forEach((obj)=>{
          this.options.text.push(obj.makeid)
          this.options.value.push(obj.name)
        })
      })
    }
  }
}
</script>