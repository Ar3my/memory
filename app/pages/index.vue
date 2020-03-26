<template>
  <section class="container">
    <div class="content">
      <span
        v-for="card in cardsList"
        :key="card.id"
        class="card"
        :class="{ on: card.flip, block: card.pair}"
        @click="selectCard(card)"
      >
        <div class="front" />
        <card
          :card="card.name"
        />
      </span>
    </div>
    <div class="score">
      <div class="timer">
        <div class="display">
          <div class="text">
            <div class="time-display">
              <strong>TEMPS RESTANT</strong>
              <span>{{ time }}</span>
            </div>
            <div class="score-display">
              <strong>Paires réussies</strong>
              <span>{{ score }}</span>
            </div>
            <div class="fails-display">
              <strong>Erreurs commises</strong>
              <span>{{ fails }}</span>
            </div>
          </div>
        </div>

        <div
          class="box"
          :style="`bottom:${wavePosition}%;`"
        >
          <!--Waves Container-->
          <div>
            <svg
              class="waves"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shape-rendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g class="parallax">
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="0"
                  fill="rgba(242, 126, 99, 0.7)"
                />
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="3"
                  fill="rgba(242, 126, 99, 0.5)"
                />
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="5"
                  fill="rgba(242, 126, 99, 0.3)"
                />
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="7"
                  fill="#F27E63"
                />
              </g>
            </svg>
          </div>
          <!--Waves end-->
        </div>
      </div>
    </div>

    <!-- MODAL FOR START -->
    <sweet-modal
      ref="modalstart"
      icon="infos"
      overlay-theme="dark"
      modal-theme="dark"
      :hide-close-button="true"
      :blocking="true"
    >
      <h1>Bienvenue dans NUXT MEMORY</h1>
      <p>
        Il s'agit d'un simple jeux de memory dévellopé sur NuxtJS.<br>
        Les règles sont simples :<br><br>
        - Retourné une carte pour commencer la partie<br>
        - Vous avez 1 minutes pour finir le memory
      </p>
      <button
        class="btn"
        @click="closeStartModal"
      >
        <span>
          Commencer !
        </span>
      </button>
      <button
        class="btn"
        @click="$refs.modalscores.open();"
      >
        <span>
          Voir les scores !
        </span>
      </button>
    </sweet-modal>


    <!-- MODAL FOR WIN -->
    <sweet-modal
      ref="modalwin"
      icon="success"
      overlay-theme="dark"
      modal-theme="dark"
      :hide-close-button="true"
      :blocking="true"
    >
      <h1>Bravo !!</h1>
      <p>
        Tu est venu, tu as vu, tu as vaincu !!<br>
        Entre dans la légende en enregistrant ton score !!
      </p>
      <div class="form">
        <div class="field">
          <input
            id="pseudo"
            type="text"
            name="pseudo"
            placeholder="Nom de joueur ?"
            autofill="autofill"
          >
          <label for="fullname">Nom de joueur ?</label>
        </div>
      </div>

      <button
        class="btn"
        @click="save"
      >
        <span>Sauvegarder !</span>
      </button>
    </sweet-modal>

    <!-- MODAL FOR LOOSE -->
    <sweet-modal
      ref="modalloose"
      icon="warning"
      overlay-theme="dark"
      modal-theme="dark"
      :hide-close-button="true"
      :blocking="true"
    >
      <h1>Le temps est écoulé !</h1>
      <p>
        Retente ta chance et essaye de marquer le best score !
      </p>
      <button
        class="btn"
        @click="closeModal"
      >
        <span>rejouer !</span>
      </button>
    </sweet-modal>

    <!-- MODAL FOR SCORES ! -->
    <sweet-modal
      ref="modalscores"
      overlay-theme="dark"
      modal-theme="dark"
      :hide-close-button="true"
      :blocking="true"
    >
      <h1>Best Scores Memory !</h1>
      <p>
        Il s'agit d'un simple jeux de memory dévellopé sur NuxtJS.<br>
        Les règles sont simples :<br><br>
        - Retourné une carte pour commencer la partie<br>
        - Vous avez 1 minutes pour finir le memory
      </p>
      <button
        class="btn"
        @click="closeScores"
      >
        <span>
          retour
        </span>
      </button>
    </sweet-modal>
  </section>
</template>
<script>
import {
  concat, each, cloneDeep, shuffle, filter,
} from 'lodash';
import moment from 'moment';
import 'moment-duration-format';
import 'moment-timer';
import { SweetModal } from 'sweet-modal-vue';
import card from '../components/card';

export default {
  components: {
    card,
    SweetModal,
  },
  data: () => ({
    cardsType: [
      { name: 'happy', flip: false },
      { name: 'tongue' },
      { name: 'grin' },
      { name: 'cool' },
      { name: 'evil' },
      { name: 'shocked' },
      { name: 'confused' },
      { name: 'hipster' },
      { name: 'crying' },
    ],
    cardsList: null,
    count: 0,
    fails: 0,
    score: 0,
    startTime: null,
    started: false,
    timer: null,
    time: 0,
    display: null,
    wavePosition: 0,
  }),
  mounted() {
    this.$refs.modalstart.open();
  },
  methods: {
    resetGame() {
      this.count = 0;
      this.fails = 0;
      this.score = 0;
      this.startTime = null;
      this.started = false;
      this.timer = null;
      this.time = 0;
      this.display = null;
      this.wavePosition = 0;

      const cards = concat(cloneDeep(this.cardsType), cloneDeep(this.cardsType));
      const shuffleCards = each(cards, (c, i) => {
        c.id = i;
        c.flip = false;
        c.pair = false;
      });
      this.cardsList = shuffle(shuffleCards);
    },
    selectCard(c) {
      if (!this.started) {
        this.started = true;
        this.startGame();
      }
      if (this.count < 2) {
        c.flip = true;
        this.count += 1;
      }
      if (this.count === 2) {
        setTimeout(this.checkCards, 1000);
      }
    },
    checkCards() {
      const flipped = filter(this.cardsList, { flip: true, pair: false });
      if (flipped.length === 2) {
        if (flipped[0].name === flipped[1].name) {
          each(flipped, (f) => {
            f.flip = !f.flip;
            f.pair = !f.pair;
          });
          this.score += 1;
          this.count = 0;
          if (this.score === 9) {
            this.finishGame();
          }
        } else {
          each(flipped, (f) => {
            f.flip = !f.flip;
          });
          this.fails += 1;
          this.count = 0;
        }
      }
    },
    startGame() {
      console.log('kiki');
      const that = this;
      this.timer = moment.duration(1, 'minutes').timer(() => {
        that.finishGame();
      });
      this.display = setInterval(() => {
        const remain = that.timer.getRemainingDuration();
        const totaltimer = 60; // 2 minutes in second !
        const remainInSeconds = moment(remain).format('X');
        that.time = moment(remain).format('mm:ss');
        that.wavePosition = -(100 - ((remainInSeconds / totaltimer) * 100).toFixed(1));
      }, 500);
    },
    finishGame: function finishGame() {
      this.timer.stop();
      this.start = false;
      clearInterval(this.display);
      if (this.score === 9) {
        this.$refs.modalwin.open();
      } else {
        this.$refs.modalloose.open();
      }
    },
    closeModal() {
      this.$refs.modalloose.close();
      this.resetGame();
    },
    closeStartModal() {
      this.$refs.modalstart.close();
      this.resetGame();
    },
    closeScores() {
      this.$refs.modalscores.close();
    },
    openScores() {
      this.$refs.modalscores.open();
    },
    save() {
      this.$refs.modalstart.close();
      this.resetGame();
    },
  },
};
</script>
