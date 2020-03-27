<template>
  <div
    v-if="loading"
    class="loader-wrapper"
  >
    <div class="loader">
      <div class="roller" />
      <div class="roller" />
    </div>

    <div
      id="loader2"
      class="loader"
    >
      <div class="roller" />
      <div class="roller" />
    </div>

    <div
      id="loader3"
      class="loader"
    >
      <div class="roller" />
      <div class="roller" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>
