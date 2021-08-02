<template>
  <div class="relative block">
    <img
      src="../assets/img/island/leftIsland.png"
      alt="logoLeftIsland"
      class="relative left-island leftislandfloat"
    />
    <img
      src="../assets/img/island/rightIsland.png"
      alt="logoRightIsland"
      class="absolute right-island rightislandfloat"
    />
    <img
      src="../assets/img/island/middleIslandsWithClouds.png"
      alt="logoMiddleIsland"
      class="absolute center-island centerislandfloat"
    />
    <img
      src="../assets/img/island/NVText2.png"
      alt="logoText"
      class="absolute logo logofontglow"
    />
  </div>
</template>

<style scoped>
.left-island {
  z-index: 2;
  top: 0;
  left: 50px;
}

.right-island {
  z-index: 3;
  top: -40px;
  right: 60px;
}

.center-island {
  z-index: 1;
  left: 290px;
  top: 80px;
}

.logo {
  z-index: 4;
  left: 150px;
  top: 220px;
}

.rightislandfloat {
  animation: float 6s ease-in-out infinite;
}

.centerislandfloat {
  animation: float 8s ease-in-out infinite;
}

.leftislandfloat {
  animation: float 7s ease-in-out infinite;
}

.logofontglow {
  animation: glower 8s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-15px);
  }
  100% {
    transform: translatey(0px);
  }
}

@keyframes glower {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}
</style>
