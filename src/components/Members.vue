<template>
  <div ref="container" class="w-full p-10 montserrat text-3xl">
    <h3 class="mb-6">Our {{ members.length }} Members</h3>
    <carousel :items-to-show="5" class="cursor-pointer mt-12">
      <div
        v-for="member in members"
        :key="member.name"
        class="flex justify-center items-center flex-col min-w-40"
      >
        <img class="rounded-full w-1/2" :src="member.icon" />
        <p class="text-xs">{{ member.name }}</p>
      </div>
    </carousel>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

  data() {
    return {
      members: [],
      membersLoaded: false,
    };
  },

  mounted() {
    this.getHiscoresJson();
  },

  methods: {
    getHiscoresJson() {
      this.$http.get("highscores.json").then((res) => {
        this.members = res.data.UUID.map((x) => ({
          icon: `https://crafatar.com/renders/head/${x.UUID}?overlay=true?size=160`,
          name: x.lastKnownName,
        }));
      });
    },
  },

  computed: {
    memberWidth() {
      return this.$refs.container.clientWidth / 16 + "px";
    },
  },
};
</script>

<style scoped>
.min-w-40 {
  min-width: 5rem;
}
</style>
