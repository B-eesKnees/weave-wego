<!-- '--fix에러 발생시 #npm run lint -- --fix 실행' -->

<template>
  <nav class="main">
    <router-view />
  </nav>
</template>

<script>
  import css from '../src/assets/css/reset.css'

export default{ 
  components: { css }
}
</script>
<style>
button {
  cursor: pointer;
}
input {
  cursor: pointer;
}
</style>
