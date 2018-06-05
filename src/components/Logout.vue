<template><div class="noep"></div></template>

<script>
export default {
  name: 'Logout',
  created () {
    delete localStorage.token
    this.$store.dispatch('logout')
    this.$router.push('/')
    this.$toasted.show('Edukalt välja logitud!').goAway(3000)
  }
}
</script>
