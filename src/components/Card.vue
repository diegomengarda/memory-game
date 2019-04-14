<script>
export default {
  name: 'card',
  props: {
    icon: {
      required: true,
      type: String
    },
    opened: {
      default: false,
      type: Boolean
    },
    wrongChoose: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<template>
    <div class="cards_box--item" :class="{'-opened' : opened, '-wrong-choose' : wrongChoose}">
        <div class="cards_box--content">
            <div class="cards_box--front"></div>
            <div class="cards_box--back">
                <div class="cards_box--icon">
                    <i :class="icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .cards_box {
        .cards_box--wrapper {
            width: 19%;
            min-height: 130px;
            margin-bottom: 10px;

            .cards_box--item {
                perspective: 1000px;
                width: 100%;
                height: 100%;

                &.-opened {
                    > .cards_box--content {
                        transform: rotateY(180deg);
                    }
                }

                &.-wrong-choose {
                    animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
                    transform: translate3d(0, 0, 0);
                    backface-visibility: hidden;
                    perspective: 1000px;
                }

                > .cards_box--content {
                    transition: 0.8s;
                    transform-style: preserve-3d;
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background-color: #dacc94;
                    padding: 10px;
                    border-radius: 10px;
                    box-shadow: 2px 2px 2px rgba(0, 0, 0, .3);

                    .cards_box--front, .cards_box--back {
                        width: 100%;
                        height: 100%;
                        backface-visibility: hidden;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }

                    .cards_box--front {
                        z-index: 2;
                        transform: rotateY(0deg);
                    }

                    .cards_box--back {
                        transform: rotateY(180deg);
                    }

                    .cards_box--icon {
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        font-size: 80px;
                        line-height: 130px;
                    }
                }
            }
        }
    }

    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }

        20%, 80% {
            transform: translate3d(2px, 0, 0);
        }

        30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(4px, 0, 0);
        }
    }

    @media all and (max-width: 980px) {
        .cards_box {
            .cards_box--wrapper {
                width: 19%;

                .cards_box--item {
                    > .cards_box--content {
                        .cards_box--icon {
                            font-size: 50px;
                            line-height: 130px;
                        }
                    }
                }
            }
        }
    }

    @media all and (max-width: 768px) {
        .cards_box {
            .cards_box--wrapper {
                width: 32%;
                min-height: 80px;

                .cards_box--item {
                    > .cards_box--content {
                        .cards_box--icon {
                            line-height: 80px;
                        }
                    }
                }
            }
        }
    }
</style>
