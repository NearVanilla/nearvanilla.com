<template>
  <div
    class="
      w-full
      md:w-4/5
      mx-auto
      min-h-84
      flex
      justify-center
      items-center
      flex-col
    "
  >
    <div class="text-center">
      <h2 class="text-4xl font-bold m-6">Our map</h2>
    </div>
    <div class="w-full">
      <iframe
        width="100%"
        height="600px;"
        src="https://map.nearvanilla.com/"
        frameborder="0"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>

    <div class="text-center mt-12">
      <a
        href="https://map.nearvanilla.com/"
        class="
          bg-yellow
          border-yellow
          text-white
          xs:text-sm
          sm:text-xl
          text-xs
          leading-normal
          rounded-md
          border
          font-bold
          montserrat
          uppercase
          py-4
          px-6
          whitespace-nowrap
        "
        >See the full map</a
      >
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.min-h-84 {
  min-height: 84.8vh;
}
</style>
