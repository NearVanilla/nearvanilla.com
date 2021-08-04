<template>
  <div ref="container" class="w-full p-10 montserrat text-3xl">
    <h3 class="mb-6">Our {{ members.length }} Members</h3>
    <div class="w-full flex glider">
      <div
        v-for="member in members"
        :key="member.name"
        class="mx-2"
        :style="{ minWidth: memberWidth, width: memberWidth }"
      >
        <img class="rounded-full" :src="member.icon" />
        <p class="text-xs">{{ member.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      members: [],
    };
  },

  mounted() {
    this.getHiscoresJson();

    var glider = new Glider(document.querySelector(".glider"), {
      draggable: true,
      dragVelocity: 1,
    });
  },

  methods: {
    getHiscoresJson() {
      this.$http.get("highscores.json").then((res) => {
        this.members = res.data.UUID.map((x) => ({
          icon: `https://crafatar.com/avatars/${x.UUID}?overlay=true`,
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

<style scoped></style>
