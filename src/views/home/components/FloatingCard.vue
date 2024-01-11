<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  ifFlipped: {
    type: Boolean,
    default: false
  },
  localPicture: String,
  cardDetails: {
    type: Object,
    default: () => {
      return {
        front_img: '',
        back_img_1: '',
        back_img_2: ''
      }
    }
  },
  cardType: {
    type: String,
    default: 'Picture'
  },
  centerX: Number,
  centerY: Number,
  cardWidth: Number,
  cardHeight: Number
})

// 生成随机移动Delay
const animDelay = ref(getRandomDelay())
function getRandomDelay() {
  return `${Math.floor(Math.random() * 5)}s`
}

const timer = ref(0)
onMounted(() => {
  animDelay.value = getRandomDelay()
  getImageUrl()
  timer.value = setInterval(() => {
    updateDistanceToCenter()
  }, 500)
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})

// 自动调节卡片尺寸、模糊、z-index
const rootel = ref(null)
const ratio = 5000
const blur_ratio = 1000
const blur_effect = 1.5
const backURL = ref('')

const updateDistanceToCenter = () => {
  // Calculate the distance to the center of the webpage
  const cardRect = rootel.value.getBoundingClientRect()
  const distance = Math.sqrt(
    Math.pow(props.centerX - cardRect.left - cardRect.width / 2, 2) +
      Math.pow(props.centerY - cardRect.top - cardRect.height / 2, 2)
  )
  // dynamicCardStyle.value['z-index'] = `${Math.floor(10000 / distance)}`
  dynamicCardStyle.value.width = `${getDynamicLevel(props.cardWidth, distance, ratio)}px`
  dynamicCardStyle.value.height = `${getDynamicLevel(props.cardHeight, distance, ratio)}px`
  dynamicCardStyle.value.filter = `blur(${getBlurDynamicLevel(
    blur_effect,
    distance,
    blur_ratio
  )}px)`
}

const getDynamicLevel = (fullRange, distance, ratio) => {
  const level = 10
  const level_range = fullRange / level
  const rawResult = ((ratio - distance) / ratio) * fullRange
  for (var i = 8; i < level; ++i) {
    if (rawResult < i * level_range) return i * level_range
  }
  return fullRange
}

const getBlurDynamicLevel = (fullRange, distance, blur_ratio) => {
  const level = 5
  const level_range = fullRange / level
  const rawResult = (distance / blur_ratio) * fullRange
  for (var i = 1; i <= 3; ++i) {
    if (rawResult < i * level_range) return (i - 1) * level_range
  }
  return fullRange
}

const dynamicCardStyle = ref({
  // transform: `translateZ(${cardDepth.value})`,
  animationDelay: `${animDelay.value}`,
  transition: 'width 2.5s linear, height 2.5s linear, filter 2.5s linear' // Add a smooth transition effect
})

// 用Props传参图像url（后续用API取代）
const getImageUrl = () => {
  // 文字卡片
  if (props.cardType == 'Text') {
    backURL.value = getLocalImg(props.localPicture)
  }
  // 图片卡片
  else {
    if (Math.random() < 0.5) backURL.value = getImgUrl(props.cardDetails.back_img_1)
    else backURL.value = getImgUrl(props.cardDetails.back_img_2)
  }
}

function getCardBackClass() {
  return props.cardType == 'Picture' ? 'back-picture' : 'card-image'
}

function getGifUrl() {
  return new URL(
    props.cardType == 'Picture' ? '../assets/gif/扩大带框.gif' : '../assets/gif/不扩大带框.gif',
    import.meta.url
  )
}

const getLocalImg = (img_name) => {
  return new URL(`../assets/cards/front/${img_name}.png`, import.meta.url)
}

const getImgUrl = (path) => {
  return `data:image/png;base64,${path}`
}
</script>

<template>
  <div ref="rootel" class="floating-card" :style="dynamicCardStyle">
    <div class="card-inner">
      <div class="card-face front-face">
        <img
          v-if="props.cardType == 'Text'"
          class="card-image"
          :src="getLocalImg(props.localPicture)"
          alt="文字卡片"
        />
        <img
          v-else
          class="picture-card-image"
          :src="getImgUrl(props.cardDetails.front_img)"
          alt="输入图像"
        />
      </div>
      <div class="card-face back-face">
        <img class="halo-effect" src="../assets/others/首页选中光晕.png" />
        <img
          :class="getCardBackClass()"
          :src="backURL"
          alt="后置图像"
          :back_img_1="getImgUrl(props.cardDetails.back_img_1)"
          :back_img_2="getImgUrl(props.cardDetails.back_img_2)"
        />
      </div>
    </div>
    <img class="anim-effect" :src="getGifUrl()" />
  </div>
</template>

<style scoped>
.floating-card {
  position: absolute;
  width: 321.3px;
  height: 429.25px;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in-out;
  animation: float-clockwise 5s infinite;
  -webkit-animation: float-clockwise 5s infinite linear alternate-reverse;
  mix-blend-mode: screen;
}

.card-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.flipped {
  animation: flip-anim 6s ease-in-out 0s 1 normal forwards;
}

@keyframes flip-anim {
  0% {
    transform: rotateY(0deg);
  }
  24% {
    transform: rotateY(0deg);
  }
  28% {
    transform: rotateY(90deg);
  }
  30% {
    transform: rotateY(180deg);
  }
  84% {
    transform: rotateY(180deg);
  }
  88% {
    transform: rotateY(90deg);
  }
  90% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 17px;
  box-shadow: 20px 20px 10px 10px rgba(0, 0, 0, 0.466);
  position: absolute;
  left: 10px;
  top: -25px;
}

.picture-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 17px;
  box-shadow: 20px 20px 10px 10px rgba(0, 0, 0, 0.466);
  position: absolute;
  left: 0px;
  top: 0px;
}

.back-face {
  transform: rotateY(180deg);
  position: relative;
  overflow: visible;

  .halo-effect {
    position: absolute;
    top: -190px;
    left: -190px;
    z-index: -2;
    mix-blend-mode: screen;
    width: 800px;
    height: 800px;
    object-fit: cover;
  }
  .controls {
    width: 100%;
    height: 100%;
  }
}

.anim-effect {
  position: absolute;
  overflow: visible;
  top: -255px;
  left: -580px;
  z-index: 10;
  mix-blend-mode: screen;
  width: 1536px;
  height: 864px;
  object-fit: cover;
  opacity: 0;
}

.gif-anim {
  animation: gif-animation 5s linear 0s 1 normal forwards;
}

@keyframes gif-animation {
  0% {
    opacity: 1;
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.back-picture {
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 17px;
  box-shadow: 20px 20px 10px 10px rgba(0, 0, 0, 0.466);
  position: absolute;
  left: -22px;
  top: -5px;
}

.play-halo {
  animation: halo 5s ease-in-out 0s 1 normal forwards;
  -webkit-animation: halo 5s ease-in-out 0s 1 normal forwards;
}

@keyframes halo {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
  }
}

@keyframes float-clockwise {
  0% {
    transform: translateX(0) translateY(0) rotate(0);
  }
  25% {
    transform: translateX(-8px) translateY(5px);
  }
  50% {
    transform: translateX(-12px) translateY(-7px);
  }
  100% {
    transform: translateX(0) translateY(0);
  }
}

@media only screen and (min-width: 2561px) {
  .floating-card {
    width: 481.95px;
    height: 643.875px;
  }
  .back-picture {
    width: 600px;
    height: 600px;
    border-radius: 25.5px;
    box-shadow: 30px 30px 15px 15px rgba(0, 0, 0, 0.466);
    left: -33px;
    top: -7.5px;
  }
  .anim-effect {
    top: -382.5px;
    left: -870px;
    width: 2304px;
    height: 1296px;
  }
  .back-face {
    .halo-effect {
      top: -285px;
      left: -285px;
      width: 1200px;
      height: 1200px;
    }
  }
  .picture-card-image {
    border-radius: 25.5px;
    box-shadow: 30px 30px 15px 15px rgba(0, 0, 0, 0.466);
  }
  .card-image {
    border-radius: 25.5px;
    box-shadow: 30px 30px 15px 15px rgba(0, 0, 0, 0.466);
    left: 15px;
    top: -37.5px;
  }
}
</style>
