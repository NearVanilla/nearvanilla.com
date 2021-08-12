<template>
  <div class="w-screen scroll-container" id="page-top">
    <navbar :shrunk="shrunkNav" />
    <div>
      <div
        class="w-full h-screen bg-cover bg-no-repeat bg-center bg-fixed"
        :style="{ backgroundImage: 'url(' + bg + ')' }"
      >
        <div class="flex flex-wrap justify-center items-center w-full h-full">
          <island style="width: 900px; margin-top: -100px" v-if="!isMobile" />
          <div v-else class="flex items-center justify-center mt-20 h-4/5">
            <img src="/img/logo.png" alt="logo" class="h-full" />
          </div>
          <a href="#About" class="scroll-down block" v-smooth-scroll></a>
        </div>
      </div>
      <section
        id="About"
        class="min-h-93 w-screen p-12 open-sans"
        style="background-color: #f0f0f0"
      >
        <h2 class="text-center text-46 font-bold mt-8" style="color: #312f2b">
          Who we are
        </h2>
        <div
          class="
            flex flex-col
            md:flex-row
            items-center
            justify-center
            mx-4
            xs:mx-10
            sm:mx-20
          "
        >
          <div
            class="
              flex flex-col
              w-full
              text-center
              md:text-left md:w-1/2
              lg:w-1/3
              text-left
            "
          >
            <h3 class="montserrat text-3xl leading-tight mb-6">
              We live with the <span class="font-bold">community</span>
            </h3>
            <p class="leading-relaxed">
              We promote a low stress community atmosphere, where we can take
              our time, think before we act, and have fun together! We respect
              each other and our differences. We act and communicate responsibly
              and take responsibility for our actions in game. It is a server
              free from griefing, thieving and moderators.

              <br /><br />

              We aim for a simple yet enjoyable server. If there are suggestions
              made by any player we will take a look at them and maybe they
              might be implemented!
            </p>
          </div>
          <div
            class="
              w-full
              md:w-1/2
              flex
              items-center
              justify-center
              md:justify-end
            "
          >
            <img src="/img/creativity.png" class="rounded-full w-4/5" />
          </div>
        </div>
        <members />
        <Map />
      </section>
      <section id="Specifications" class="w-screen min-h-screen bg-grad p-12">
        <h3 class="text-center text-gray-900 text-46 font-bold mt-8">
          Server Info
        </h3>
        <div
          class="
            grid grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-12
            mt-12
            montserrat
            line-height-1
          "
        >
          <div class="bg-gray-100 mx-1 rounded-md p-4">
            <font-awesome-icon class="text-7xl" :icon="['fas', 'microchip']" />
            <p class="text-3xl font-bold my-4">Processor</p>
            <p>
              An octa-core processor reaching up to 5Ghz gives us seamless
              gameplay. Having a processor that can keep up with the server
              reduces the amount of lag spikes and rubber banding our players
              encounter.
            </p>
          </div>
          <div class="bg-gray-100 mx-1 rounded-md p-4">
            <font-awesome-icon class="text-7xl" :icon="['fas', 'hdd']" />
            <p class="text-3xl font-bold my-4">Storage</p>
            <p>
              Despite our quality specifications, the world of technology can be
              unpredictable. Although these unexpected occurrences are rare, we
              are still prepared with 1TB of SSD storage that allows bi-hourly
              back-ups of our world. Should any corruption occur, we can restore
              lost or corrupted data quickly and minimize the effect it could
              have on our players.
            </p>
          </div>
          <div class="bg-gray-100 mx-1 rounded-md p-4">
            <font-awesome-icon class="text-7xl" :icon="['fas', 'memory']" />
            <p class="text-3xl font-bold my-4">RAM</p>
            <p>
              With 8GB of dedicated RAM for the server, our players don't have
              to worry about random server crashes that could result in loss of
              data and can enjoy a hassle-free environment.
            </p>
          </div>
          <div class="bg-gray-100 mx-1 rounded-md p-4">
            <font-awesome-icon
              class="text-7xl"
              :icon="['fas', 'network-wired']"
            />
            <p class="text-3xl font-bold my-4">Network</p>
            <p>
              When running a multiplayer server like ours, speed and resources
              are everthing. The Near Vanilla server and website run on a
              dedicated, Linux based server that is equipped and designed to
              give players the best play experience possible on a butter-smooth
              server.
            </p>
            <div class="flex flex-nowrap flex-col justify-between m-6">
              <p><span class="font-bold text-xs">DOWN:</span> 988 Mbit/s</p>
              <p><span class="font-bold text-xs">UP:</span> 924 Mbit/s</p>
              <p><span class="font-bold text-xs">PING:</span> 1 ms</p>
            </div>
          </div>
        </div>
        <h3 class="text-center text-gray-900 text-46 font-bold my-10">
          Our Plugins
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
          <div v-for="plugin in plugins" :key="plugin.name" class="card">
            <div class="card-inner montserrat">
              <div
                class="
                  front
                  flex flex-col
                  justify-between
                  items-center
                  p-6
                  bg-gray-100
                  rounded-md
                "
              >
                <img :src="getIconUrl(plugin.name)" class="w-1/3" />
                <h3 class="font-bold text-3xl">{{ plugin.name }}</h3>
                <p v-html="plugin.excerpt"></p>
              </div>
              <div
                class="
                  back
                  bg-gray-100
                  rounded-md
                  flex flex-col
                  justify-center
                  p-8
                  items-center
                "
              >
                <h3 class="font-bold text-green-900 mb-12 text-2xl">
                  {{ plugin.name }}
                </h3>
                <p class="mb-12" v-html="plugin.info"></p>
                <img
                  class="w-1/6"
                  v-if="plugin.on"
                  :src="getIconUrl(plugin.on)"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { Map, Island, Navbar, Members } from "../components";
import { ref } from "vue";
import bgImg from "../assets/img/bg-1.jpg";
import { pluginsList } from "../plugins.js";

export default {
  name: "Home",

  inject: ["mq"],

  components: {
    Navbar,
    Island,
    Members,
    Map,
  },

  inject: ["mq"],

  setup(props, context) {
    const shrunkNav = ref(false);
    const bg = bgImg;

    const handleScroll = (e) => {
      if (window.scrollY > 100) {
        shrunkNav.value = true;
      } else shrunkNav.value = false;
    };

    const plugins = pluginsList;

    return { shrunkNav, bg, handleScroll, plugins };
  },

  created() {
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", () => {});
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
    getIconUrl(str) {
      str = str.replace(/\s/g, "");
      str = str.toLowerCase();

      return `/img/pluginIcons/${str}.png`;
    },
  },
};
</script>

<style scoped>
.scroll-down {
  opacity: 1;
  -webkit-transition: all 0.5s ease-in 3s;
  transition: all 0.5s ease-in 3s;
}

.scroll-down {
  position: absolute;
  bottom: 30px;
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  background-size: 14px auto;
  border-radius: 50%;
  z-index: 2;
  -webkit-animation: bounce 2s infinite 2s;
  animation: bounce 2s infinite 2s;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  transform: scale(1);
  z-index: 9;
}

.scroll-down:before {
  position: absolute;
  top: calc(50% - 8px);
  left: calc(50% - 6px);
  transform: rotate(-45deg);
  display: block;
  width: 12px;
  height: 12px;
  content: "";
  border: 2px solid white;
  border-width: 0px 0 2px 2px;
}

@keyframes bounce {
  0%,
  100%,
  20%,
  50%,
  80% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  60% {
    -webkit-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    transform: translateY(-5px);
  }
}

.min-h-93 {
  min-height: 93.5vh;
}

.text-46 {
  font-size: 46px;
}

.bg-grad {
  background: rgb(116, 235, 213);
  background: linear-gradient(
    90deg,
    rgba(116, 235, 213, 1) 0%,
    rgba(172, 182, 229, 1) 100%
  );
}

.line-height-1 {
  line-height: 1.2;
}

/* START FLIP */
.card {
  background-color: transparent;
  min-height: 312px;
  perspective: 1000px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}
/* END FLIP */
</style>
