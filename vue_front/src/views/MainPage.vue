<template>
  <gnbBar />
  <MainPage1 />
  <MainPage2 />
  <MainPage3 />
  <Footer />
  <Toup />
</template>

<script>
import gnbBar from '../components/gnbBar.vue'
import MainPage1 from '../components/MainPage1.vue'
import MainPage2 from '../components/MainPage2.vue'
import MainPage3 from '../components/MainPage3.vue'
import Footer from '../components/footer.vue'
import Toup from '../components/ToUp.vue'

export default {
  components: { gnbBar, MainPage1, MainPage2, MainPage3, Footer, Toup }
}
</script>

