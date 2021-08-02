<template>
  <router-view />
</template>

<script>
import { useMq } from "vue3-mq";

export default {
  name: "App",

  setup() {
    const mq = useMq();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  
}

body{
  margin:0;
  padding:0;
  overflow-x: hidden;
  -webkit-tap-highlight-color: #fed136;
}

.montserrat{
  font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
</style>
