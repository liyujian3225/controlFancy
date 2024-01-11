<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'

const props = defineProps({
  base_front_img: String,
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

// const getLocalImg = (img_name) => {
//   return new URL(`../assets/cards/front/${img_name}.png`, import.meta.url)
// }

const getImgUrl = (path) => {
  return `data:image/png;base64,${path}`
}
</script>

<template>
  <div ref="rootel" class="display-card" :style="dynamicCardStyle">
    <div class="card-inner">
      <div class="card-face front-face">
        <img class="card-image" :src="getImgUrl(props.base_front_img)" alt="非反转卡片" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.display-card {
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
  .display-card {
    width: 481.95px;
    height: 643.875px;
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
