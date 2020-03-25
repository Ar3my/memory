<template>
  <div class="container center">
    <section class="languages">
      <h1>MARCHE !</h1>
      <div class="content">
        <span
          v-for="(card, index) in cardsList"
          :key="index"
          class="card"
          :class="{ on: card.flip, block: card.pair}"
          @click.prevent="selectCard(card)"
        >
          <div class="front" />
          <card
            :card="card.name"
          />
        </span>
      </div>
    </section>
  </div>
</template>
<script>
import {
  concat, shuffle, each, find,
} from 'lodash';
import card from '../components/card';

export default {
  components: {
    card,
  },
  data: () => ({
    cardsType: [
      { name: 'happy' },
      { name: 'tongue' },
      { name: 'grin' },
      { name: 'cool' },
      { name: 'evil' },
      { name: 'shocked' },
      { name: 'confused' },
      { name: 'hipster' },
      { name: 'crying' },
    ],
    cardsList: [],
    count: 0,
    ref1: null,
    ref2: null,
  }),
  mounted() {
    this.cardsList = concat(this.cardsType, this.cardsType);

    each(this.cardsList, (c) => {
      c.flip = false;
      c.pair = false;
    });

    this.cardsList = shuffle(this.cardsList);
  },
  methods: {
    selectCard(c) {
      alert('ici');
      c.flip = !c.flip;
      // if (this.count < 2) {
      //   c.flip = true;
      //   this.count += 1;
      // }
      // this.checkCards();
    },
    checkCards() {
      const flipped = find(this.cardsList, { flip: true, pair: false });
      console.log(flipped);
    },
  },
};
</script>
