<template>
  <div class="header">

  </div>
</template>

<script>
export default {
  components: {
  },
  data: function () {
    return {
    };
  },
  methods: {
    toggleFullScreen() {
      if (document.requestFullscreen) {
        if (this.fullscreen) {
          document.exitFullscreen();
        } else {
          document.body.requestFullscreen();
        }
        this.fullscreen = !this.fullscreen;
      } else if (document.msRequestFullscreen) {
        if (document.msFullscreenElement) {
          document.msExitFullscreen();
        } else {
          document.msRequestFullscreen();
        }
        this.fullscreen = !this.fullscreen;
      }
      return false;
    },
    makeFullScreen() {
      const divObj = document.getElementById('vinciApp'); //  get the target element

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
