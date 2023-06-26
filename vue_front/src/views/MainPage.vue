<template>
<<<<<<< Updated upstream
    <div>
        <gnbBar />
    </div>
=======
  <gnbBar />
  <MainPage1 />
  <MainPage2 />
 
>>>>>>> Stashed changes
</template>

<script>
import gnbBar from '../components/gnbBar.vue'
<<<<<<< Updated upstream
export default {
  components: { gnbBar }
=======
import MainPage1 from '../components/MainPage1.vue'
import MainPage2 from '../components/MainPage2.vue'



export default {
  components: { gnbBar, MainPage1, MainPage2 }
>>>>>>> Stashed changes
}
</script>
