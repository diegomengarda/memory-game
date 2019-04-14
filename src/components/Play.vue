<script>
import Card from './Card.vue'

import { cards } from '../utils/cards'
import { setPlayerResults } from '../utils/storage'

import { shuffle, cloneDeep } from 'lodash'

import Swal from 'sweetalert2'

export default {
  name: 'play',
  components: { Card },
  data () {
    return {
      nickname: '',
      showCards: false,
      cards: [],
      rounds: 0,
      selection: {
        first: null,
        second: null
      }
    }
  },
  computed: {
    isValidSelection () {
      return this.selection.first !== null && this.selection.second !== null
    },
    isLastRound () {
      return this.cards.filter(item => item.discovered).length === (this.cards.length - 2)
    },
    gameCompleted () {
      return this.cards.every(item => item.discovered)
    }
  },
  mounted () {
    this.setNicknameFocus()
  },
  methods: {
    /**
     * Give focus in nickname input
     */
    setNicknameFocus () {
      this.$refs.inputNickname.focus()
    },
    /**
     * Start a new game
     */
    startNewGame () {
      if (this.nickname) {
        this.resetGame()
      }
    },
    /**
     * Reset the game configs
     */
    resetGame () {
      this.rounds = 0
      this.loadCards()
      this.clearSelection()
    },
    /**
     * Load the available cards and shuffle it
     */
    loadCards () {
      this.cards.splice(0)
      // Create the array of cards and randomize the list
      setTimeout(() => {
        this.cards = shuffle([...cloneDeep(cards), ...cloneDeep(cards)])
        this.showCards = true
      }, 100)
    },
    /**
     * Action on select a card
     * @param card
     * @param index
     */
    async selectCard (card, index) {
      if (!card.opened && !card.discovered) {
        card.opened = true
        /**
         * Validation the selection to clear or set discovered in he cards
         */
        if (this.isValidSelection) {
          this.checkSelection()
          this.clearSelection()
        }
        /**
         * Set the selection in the empty spot
         */
        if (this.selection.first === null) {
          this.selection.first = index
        } else if (this.selection.first !== null && this.selection.second === null) {
          this.selection.second = index
        }

        /**
         * Validation the selection
         */
        if (this.isValidSelection || this.isLastRound) {
          this.rounds++
          if (this.isLastRound && this.isValidSelection) {
            this.setSelectionDiscovered()
          }
        }

        /**
         * If the match is completed show de success message
         */
        if (this.gameCompleted) {
          const vm = this
          const rounds = this.rounds
          setTimeout(async () => {
            /**
             * Show de success message when the game is completed
             */
            Swal.fire({
              title: 'Congratulations!',
              text: `You completed the game in ${rounds} rounds`,
              type: 'success',
              showCancelButton: true,
              confirmButtonText: 'Nice, show me the ranking!',
              cancelButtonText: 'Play again'
            }).then(async (result) => {
              // Store the results in storage
              await setPlayerResults(vm.nickname, rounds)
              if (result.value) {
                vm.$router.push({ name: 'ranking' })
              } else {
                vm.resetGame()
              }
            })
          }, 600)
        }
      }
    },
    /**
     * Check if the selection match's
     * @returns {boolean}
     */
    checkSelection () {
      const first = this.cards[this.selection.first]
      const second = this.cards[this.selection.second]
      console.log(first.label, second.label)
      if (first.label === second.label) {
        this.setSelectionDiscovered()
      } else {
        first.opened = false
        second.opened = false
      }
    },
    /**
     * Set that the selection match's
     */
    setSelectionDiscovered () {
      const first = this.cards[this.selection.first]
      const second = this.cards[this.selection.second]
      first.discovered = true
      second.discovered = true
    },
    /**
     * Clear the selection
     */
    clearSelection () {
      this.selection.first = null
      this.selection.second = null
    }
  }
}
</script>

<template>
    <div>
        <div class="flex-box">
            <h2>New Game</h2>
            <div v-if="showCards">
                Round's <strong>{{rounds}}</strong>
            </div>
        </div>
        <div class="user_box">
            <template v-if="!showCards">
                <strong>Choose your nickname to start:</strong>
                <input type="text"
                       class="user_box--input"
                       ref="inputNickname"
                       placeholder="Type your nickname"
                       v-model="nickname">
                <button class="user_box--button"
                        @click="startNewGame"
                        :disabled="!nickname">Start
                </button>
            </template>
            <template v-else>
                <button class="user_box--button"
                        @click="resetGame">Reset Game
                </button>
            </template>
        </div>
        <div class="cards_box">
            <template v-if="cards.length > 0 && showCards">
                <div class="cards_box--wrapper"
                     v-for="(item, index) in cards"
                     :key="index"
                     @click="selectCard(item, index)">
                    <card :key="index"
                          :icon="item.icon"
                          :opened="item.opened || item.discovered"
                          :wrong-choose="item.wrongChoose"/>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss">
    .cards_box {
        width: 60vw;
        min-height: 40vh;
        margin: 15px auto 0;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .user_box {
        > .user_box--input {
            margin: 0 10px;
            padding: 4px 10px;
            line-height: 1;
            border-radius: 4px;
            border: 1px solid #b5b5b5;
        }

        > .user_box--button {
            padding: 4px 10px;
            border-radius: 4px;
            border: 1px solid #b5b5b5;
            cursor: pointer;
            background-color: #DDD;

            &:hover {
                background-color: #cbcbcb;
            }

            &[disabled] {
                cursor: not-allowed;
                pointer-events: none;
            }
        }
    }

    @media all and (max-width: 1200px) {
        .cards_box {
            width: 80vw;
        }
    }

    @media all and (max-width: 980px) {
        .user_box {
            text-align: center;
            strong,
            > .user_box--input,
            > .user_box--button {
                margin: 2px 5px;
                display: inline-block;
                width: 90%;
            }
        }
        .cards_box {
            width: 90vw;
        }
    }

    @media all and (max-width: 768px) {
        .cards_box {
            width: 99vw;
        }
    }
</style>
