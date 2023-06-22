<!-- '--fix에러 발생시 #npm run lint -- --fix 실행' -->

<template>
  <nav class="main">
    <router-link to="/"></router-link>
    <router-link to="/login"></router-link>
    <router-link to="/join"></router-link>
  </nav>
  <router-view />
</template>

<style>
button {
  cursor: pointer;
}
input {
  cursor: pointer;
}
</style>
