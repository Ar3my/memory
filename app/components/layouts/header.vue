<template>
  <div class="header">
    <h1>NUXT MEMORY</h1>
    <span
      class="btn-icon"
      @click="makeFullScreen"
    >
      <span v-if="!fullscreen"><enlarge class="icon" /></span>
      <span v-else><shrink class="icon" /></span>
    </span>
  </div>
</template>

<script>
import enlarge from '../../assets/svg/enlarge.svg?inline';
import shrink from '../../assets/svg/shrink.svg?inline';

export default {
  components: {
    enlarge,
    shrink,
  },
  data: () => ({
    fullscreen: false,
  }
  ),
  methods: {
    makeFullScreen() {
      const divObj = document.getElementById('memoryDocker'); //  get the target element

      if (divObj.requestFullscreen) {
        if (this.fullscreen) {
          document.exitFullscreen();
        } else {
          divObj.requestFullscreen();
        }
        this.fullscreen = !this.fullscreen;
      } else if (divObj.msRequestFullscreen) {
        if (this.fullscreen) {
          document.msExitFullscreen();
        } else {
          divObj.msRequestFullscreen();
        }
        this.fullscreen = !this.fullscreen;
      } else if (divObj.mozRequestFullScreen) {
        if (this.fullscreen) {
          document.exitFullscreen();
        } else {
          divObj.mozRequestFullScreen();
        }
        this.fullscreen = !this.fullscreen;
      } else if (divObj.webkitRequestFullscreen) {
        if (this.fullscreen) {
          document.exitFullscreen();
        } else {
          divObj.webkitRequestFullscreen();
        }
        this.fullscreen = !this.fullscreen;
      }
    },
  },
};
</script>
