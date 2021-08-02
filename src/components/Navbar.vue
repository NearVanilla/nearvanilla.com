<template>
  <nav
    ref="nav"
    :class="{ shrunk: shrunk }"
    class="
      fixed
      top-0
      left-0
      right-0
      z-10
      h-auto
      bg-transparent
      py-10
      transition-padding
      flex flex-nowrap
      justify-start
      px-4
    "
    v-if="!isMobile"
  >
    <div
      class="
        flex
        items-center
        justify-between
        mx-auto
        px-4
        w-full w-540
        md:720
        lg:w-960
        xl:w-1140
      "
    >
      <a
        href="#page-top"
        class="
          transition-all
          duration-300
          brand
          inline-block
          mr-4
          py-1.5
          whitespace-nowrap
        "
        :class="shrunk ? 'text-xl' : 'text-5xl'"
        v-smooth-scroll
      >
        Near Vanilla
      </a>
      <div class="flex items-center text-center w-full">
        <div
          class="
            flex-row flex
            pl-0
            mb-0
            list-none
            ml-auto
            montserrat
            uppercase
            text-white text-sm
            w-full
            justify-end
          "
        >
          <a class="px-4 py-4" href="#About">About</a>
          <a class="px-4 py-4" href="#Specifications">Specifications</a>
          <a class="px-4 py-4" href="#Info">Information</a>
          <a class="px-4 py-4" href="#Plugins">Plugins</a>
          <a class="px-4 py-4" href="#Map">Map</a>
          <div class="flex items-center">
            <span class="px-4 py-4">Other</span>
            <font-awesome-icon :icon="['fas', 'caret-down']" />
          </div>
        </div>
      </div>
    </div>
  </nav>
  <nav
    class="fixed top-0 left-0 right-0 z-10 h-auto py-2 px-4 bg-gray-222"
    v-else
  >
    <div class="mx-24 flex items-center justify-between">
      <a
        href="#page-top"
        class="
          transition-all
          duration-300
          brand
          inline-block
          mr-4
          py-1.5
          whitespace-nowrap
          text-xl
        "
        v-smooth-scroll
      >
        Near Vanilla
      </a>
      <div class="custom-yellow p-3 rounded text-xs leading-none cursor-pointer">
        <font-awesome-icon class="text-gray-900" :icon="['fas', 'bars']" />
        </div>
    </div>
  </nav>
</template>

<script>
export default {
  inject: ["mq"],

  props: {
    shrunk: {
      required: true,
      default: () => false,
      value: Boolean,
    },
  },

  computed: {
    isMobile() {
      return (
        this.mq.current == "md" ||
        this.mq.current == "sm" ||
        this.mq.current == "xs"
      );
    },
  },
};
</script>

<style scoped>
.bg-gray-222 {
  background-color: #222;
}

.shrunk {
  @apply bg-gray-222 py-0;
}

.brand {
  color: #fed136;
  font-family: "Kaushan Script", "Helvetica Neue", Helvetica, Arial, cursive;
}

.transition-padding {
  -webkit-transition: padding-top 0.3s, padding-bottom 0.3s;
  -moz-transition: padding-top 0.3s, padding-bottom 0.3s;
  transition: padding-top 0.3s, padding-bottom 0.3s;
}

.flex-basis-100 {
  flex-basis: 100%;
}

.custom-yellow{
  background-color: #fed136;
}

@responsive {
  .w-1140 {
    max-width: 1140px;
  }

  .w-960 {
    max-width: 960px;
  }

  .w-720 {
    max-width: 720px;
  }

  .w-540 {
    max-width: 540px;
  }
}
</style>
