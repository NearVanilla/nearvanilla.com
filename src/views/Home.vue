<template>
  <div
    class="
      w-screen
      h-screen
      bg-blue-100
      sm:bg-blue-200
      md:bg-blue-300
      lg:bg-blue-400
      xl:bg-blue-500
      flex
      justify-center
      items-center
      flex-col
    "
  >
    <p class="text-5xl font-bold">{{ mq.current }}</p>
    <p><font-awesome-icon :icon="['fas', 'bars']" /></p>
  </div>
</template>

<script>
export default {
  name: "Home",

  inject: ["mq"],
};
</script>

<style scoped></style>