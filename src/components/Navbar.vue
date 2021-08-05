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
      py-6
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
        md:w-720
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
          leading-normal
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
            tracking-1
            font-normal
          "
        >
          <a class="link px-4 py-4" href="#About" v-smooth-scroll>About</a>
          <a class="link px-4 py-4" href="#Specifications" v-smooth-scroll
            >Specifications</a
          >
          <a class="link px-4 py-4" href="#Info">Information</a>
          <a class="link px-4 py-4" href="#Plugins">Plugins</a>
          <a class="link px-4 py-4" href="#Map">Map</a>
          <div
            class="flex items-center relative cursor-pointer"
            @click.stop="showOther = !showOther"
          >
            <div class="link">
              <span class="px-4 py-4">Other</span>
              <font-awesome-icon :icon="['fas', 'caret-down']" />
            </div>
            <div
              v-if="showOther"
              style="background-color: #343434"
              class="
                absolute
                top-14
                left-0
                flex flex-col
                text-left
                rounded
                leading-none
              "
            >
              <span class="link pt-6 pb-4 pl-4 pr-10">APPLY</span>
              <span class="link pt-4 pb-6 pl-4 pr-10">HIGHSCORES</span>
            </div>
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
      <div
        class="custom-yellow p-3 rounded text-xs leading-none cursor-pointer"
      >
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

  data() {
    return {
      showOther: false,
    };
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

  methods: {
    log(str) {
      console.log(str);
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

.custom-yellow {
  background-color: #fed136;
}

.link:hover {
  color: #fed136;
}

.tracking-1 {
  letter-spacing: 1px;
}
</style>
