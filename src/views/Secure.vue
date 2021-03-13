<template>
  <div>
    <Header />
    <h1>This page is protected by auth</h1>
  </div>
</template>

<script>
import Header from "../components/Header"

export default {
  name: 'Secure',
  components: {
    Header
  }
}
</script>
