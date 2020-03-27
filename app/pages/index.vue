<template>
  <section class="container">
    <!-- CARDS CONTAINER -->
    <div class="content">
      <!--
      CARD
      Do a for loop on cards collection with :
      - :Key => needed for vue loop directive
      - :Class => Dynamic class to flip card ( on = flip / block = forever flip when you solve a pair )
      - @click => click event to fire 'selectCard' method
      -->
      <span
        v-for="card in cardsList"
        :key="card.id"
        class="card"
        :class="{ on: card.flip, block: card.pair}"
        @click="selectCard(card)"
      >
        <div class="front" />
        <!-- CARD BACKFACE COMPONENT -->
        <card
          :card="card.name"
        />
        <!-- END BACKFACE COMPONENT -->
      </span>
      <!-- CARD -->
    </div>
    <!-- END CARDS CONTAINER -->

    <!-- SCORE CONTAINER -->
    <div class="score">
      <div class="timer">
        <!--
        DISPLAY CONTAINER
        display score real time informations
        - {{ time }} => display time countdown from 1minutes
        - {{ score }} => number of pair resolve
        - {{ fails }} => number of fail when you try to solve a pair
        /!\ We have to use {{ }} to display some vars in template. like a mustache type template syntax.
        -->
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
        <!-- END DISPLAY CONTAINER -->

        <!--
        WAVE ANIMATION CONTAINER
        use `${}` to concat inline text with dynamic value into this inline css style without a js function
        -->
        <div
          class="box"
          :style="`bottom:${wavePosition}%;`"
        >
          <div>
            <!-- SVG FOR WAVE -->
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
            <!-- END SVG FOR WAVE -->
          </div>
        </div>
        <!-- END WAVE CONTAINER -->
      </div>
    </div>
    <!-- END SCORE CONTAINER -->

    <!--
    MODAL FOR START
    SweetModal is a plugin we add on plugins nuxt directory
    Documentation: https://sweet-modal-vue.adepto.as/
    /!\ ref attribute is require to call this modal !
    -->
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
      <!--
      BUTTON TO ONPEN NESTED MODAL SCORES
      You can use $refs.nameofrefattribute.function() to fire a function based on a ref components attribute
      -->
      <button
        class="btn"
        @click="$refs.modalscores.open();"
      >
        <span>
          Voir les scores !
        </span>
      </button>
    </sweet-modal>
    <!-- END MODAL FOR START -->

    <!-- MODAL FOR WIN -->
    <sweet-modal
      ref="modalwin"
      icon="success"
      overlay-theme="dark"
      modal-theme="dark"
      :hide-close-button="true"
      :blocking="true"
    >
      <!--
      INSIDE MODAL WIN CONTAINER BEFORE SAVE
      use v-if when you need to hide something in template based on some value
      Here we test if user is currently saving
      -->
      <div
        v-if="!saving"
        class="message"
      >
        <h1>Bravo !!</h1>
        <p>
          Tu est venu, tu as vu, tu as vaincu !!<br>
          Entre dans la légende en enregistrant ton score !!
        </p>
        <div class="form">
          <div class="field">
            <!--
            INPUT
            Use "v-model" to link input to data
            In this example, playerName's data change when i type something in this input
            -->
            <input
              id="pseudo"
              v-model="playerName"
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
      </div>
      <!--
      INSIDE MODAL WIN CONTAINER ON SAVE
      use v-else just after v-if when you need to show another block based on previous v-if
      -->
      <div
        v-else
        class="saving"
      >
        <div
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
      </div>
    </sweet-modal>
    <!-- END MODAL FOR WIN -->

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
        <span v-if="!saving">rejouer !</span>
        <span v-else>Sauvegarde en cour !</span>
      </button>
    </sweet-modal>
    <!-- END MODAL FOR LOOSE -->

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
        Nos meilleurs joueurs sur le devant de la scene.<br>
      </p>
      <ul class="scorelist">
        <li>
          <span class="name title">Nom</span>
          <span class="time title">Temps réalisé</span>
          <span class="fails title">Erreurs</span>
        </li>
        <li
          v-for=" score in scoresByFails"
          :key="score.id"
        >
          <span class="name">{{ score.name }}</span>
          <span class="time">{{ score.time }}</span>
          <span class="fails">{{ score.fails }}</span>
        </li>
      </ul>
      <button
        class="btn"
        @click="$refs.modalscores.close()"
      >
        <span>
          retour
        </span>
      </button>
    </sweet-modal>
    <!-- END MODAL FOR LOOSE -->
  </section>
</template>
<script>
// IMPORT only function we need on lodash lib
// Lodash is a very usefull lib to manipulate collections and arrays
import {
  concat, each, cloneDeep, shuffle, filter, orderBy,
} from 'lodash';
// Import moment and his plugins
// Moment is a powerfull lib to manipulate Date and Time
import moment from 'moment';
import 'moment-duration-format';
import 'moment-timer';
// Import SweetModal only as a components
import { SweetModal } from 'sweet-modal-vue';
// Import my own card components
import card from '../components/card';

// Here we go !!
export default {
  // register my components i had import before
  components: {
    card,
    SweetModal,
  },
  // Call API to retrieve data before mount my page
  // 'async' let me await my request with axios in a asynchronous process
  // { data } is a shortcut to call response.data directly in my const
  // /!\ use 'const' when you dont manipulate values
  // /!\ use 'let' when you need to manipulate them
  async asyncData(context) {
    const { data } = await context.$axios.get('scores');
    const scores = data;
    return {
      scores,
    };
  },
  // register your page data
  // we use a function to retrieve them when we call them
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
    timeElapsed: 0,
    display: null,
    wavePosition: 0,
    saving: false,
    playerName: '',
  }),
  // COMPUTED
  // computed are datas with a bunch of manipulation before you retrieve them
  // ex: you can use it to combine 'firstname' data and 'lastname' data to display a fullname
  computed: {
    scoresByFails() { return orderBy(this.scores, ['fails'], ['asc']); },
  },
  // VueJS is based on a "cycle", so you can do somethings on different time in this cycle
  // Best explanation here => https://vuejs.org/v2/guide/instance.html
  mounted() {
    this.$refs.modalstart.open();
  },
  // Methods or the place where you place functions you need
  methods: {
    // Reset datas for a new game
    resetGame() {
      this.count = 0;
      this.fails = 0;
      this.score = 0;
      this.startTime = null;
      this.started = false;
      this.timer = null;
      this.time = 0;
      this.timeElapsed = 0;
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
    // Start timer and interval needed for display scores in real time
    startGame() {
      const that = this;
      this.timer = moment.duration(1, 'minutes').timer(() => {
        that.finishGame();
      });
      this.display = setInterval(() => {
        const remain = that.timer.getRemainingDuration();
        const totaltimer = 60; // 1 minutes in second !
        const remainInSeconds = moment(remain).format('X');
        that.time = moment(remain).format('mm:ss');
        that.wavePosition = -(100 - ((remainInSeconds / totaltimer) * 100).toFixed(1));
        that.timeElapsed = moment.utc(moment('01:00', 'mm:ss').diff(moment(that.time, 'mm:ss'))).format('mm [Minutes et] ss [Secondes]');
      }, 500);
    },
    // Flip a card when you select it
    selectCard(c) {
      if (!this.started) {
        this.started = true;
        this.startGame();
      }
      if (this.count < 2 && !c.flip) {
        c.flip = true;
        this.count += 1;
      }
      if (this.count === 2) {
        setTimeout(this.checkCards, 1000);
      }
    },
    // Check if the 2 card you fliped is the same
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
    // Clear interval and stop the timer if player finish early than countdown
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
    // Reset the game if player click on restart ( only on loose modal)
    closeModal() {
      this.$refs.modalloose.close();
      this.resetGame();
    },
    // reset the game before start a new game ( only on start modal )
    closeStartModal() {
      this.$refs.modalstart.close();
      this.resetGame();
    },
    // Save the score if player win and want to save
    // we use a try / catch to log errors on this part
    save() {
      const that = this;
      this.saving = true;
      this.$axios.post('/score', {
        name: this.playerName,
        time: this.timeElapsed,
        fails: this.fails,
      })
        .then(() => {
          that.redrawScores();
        })
        .catch((error) => {
          console.log(error);
          that.saving = false;
        });
    },
    // Get fresh data before show scores
    // require to display the current player save score
    redrawScores() {
      const that = this;
      this.$axios.get('scores')
        .then((response) => {
          that.scores = response.data;
          that.saving = false;
          that.$refs.modalwin.close();
          that.$refs.modalstart.open();
          that.$refs.modalscores.open();
        })
        .catch((error) => {
          console.log(error);
          that.saving = false;
        });
    },
  },
};
</script>
