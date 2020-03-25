<template>
  <div class="back">
    <div>
      <span>
        <happy
          v-if="card==='happy'"
          class="icon"
        />
        <tongue
          v-if="card==='tongue'"
          class="icon"
        />
        <grin
          v-if="card==='grin'"
          class="icon"
        />
        <cool
          v-if="card==='cool'"
          class="icon"
        />
        <evil
          v-if="card==='evil'"
          class="icon"
        />
        <shocked
          v-if="card==='shocked'"
          class="icon"
        />
        <confused
          v-if="card==='confused'"
          class="icon"
        />
        <hipster
          v-if="card==='hipster'"
          class="icon"
        />
        <crying
          v-if="card==='crying'"
          class="icon"
        />
      </span>
    </div>
  </div>
</template>

<script>
// IMPORT SOME SMILEY SVG FOR CARDS ICONS
import happy from '../assets/svg/happy2.svg?inline';
import tongue from '../assets/svg/tongue2.svg?inline';
import grin from '../assets/svg/grin2.svg?inline';
import cool from '../assets/svg/cool2.svg?inline';
import evil from '../assets/svg/evil2.svg?inline';
import shocked from '../assets/svg/shocked2.svg?inline';
import confused from '../assets/svg/confused2.svg?inline';
import hipster from '../assets/svg/hipster2.svg?inline';
import crying from '../assets/svg/crying2.svg?inline';

export default {
  components: {
    happy,
    tongue,
    grin,
    cool,
    evil,
    shocked,
    confused,
    hipster,
    crying,
  },
  props: {
    card: {
      type: String,
      required: true,
    },
  },
  data: () => ({
  }),
  methods: {
  },
};
</script>

<style lang="scss">

</style>
