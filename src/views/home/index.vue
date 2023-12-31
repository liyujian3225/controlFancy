<script setup>
import FloatingCard from './components/FloatingCard.vue'
import { ref, onMounted } from 'vue'

const floating_container = ref(null)
const closestCard = ref(null)
const distances = ref(null)
const currentCard = ref(null)

const centerX = ref(window.innerWidth / 2)
const centerY = ref(window.innerHeight / 2)

const cardWidth = 189 * 1.7
const cardHeight = 252.5 * 1.7

const diffX = ref(0)
const diffY = ref(0)
const floating_cards = document.getElementsByClassName('floating-card')

const getCardCenterX = (card) => {
  return card.getBoundingClientRect().left + cardWidth / 2
}

const getCardCenterY = (card) => {
  return card.getBoundingClientRect().top + cardHeight / 2
}

const updateCenter = () => {
  centerX.value =
    currentCard.value == null ? window.innerWidth / 2 : getCardCenterX(currentCard.value)
  centerY.value =
    currentCard.value == null ? window.innerHeight / 2 : getCardCenterY(currentCard.value)
}

// 从几张备选的翻面图像中随机选择一张进行展示
const setRandomCardBackImage = (img_elem) => {
  const cardName = img_elem.getAttribute('pic_name')
  if (Math.random() < 0.5) {
    img_elem.src = new URL(`./assets/cards/back/${cardName}.png`, import.meta.url)
  } else {
    img_elem.src = new URL(`./assets/cards/back/${cardName}2.png`, import.meta.url)
  }
}

const updateDistanceToCenter = () => {
  // 遍历所有卡片，寻找最接近屏幕中心的卡片
  closestCard.value = null
  distances.value = new Map()
  updateCenter()
  for (var i = 0; i < floating_cards.length; i++) {
    if (currentCard.value == floating_cards[i]) continue
    const distance = Math.sqrt(
      Math.pow(centerX.value - getCardCenterX(floating_cards[i]), 2) +
      Math.pow(centerY.value - getCardCenterY(floating_cards[i]), 2)
    )
    distances.value.set(distance, floating_cards[i])
  }
  const sortedDistance = new Map([...distances.value.entries()].sort((a, b) => a[0] - b[0]))
  const key = Array.from(sortedDistance.keys())[Math.floor(Math.random() * 3)]
  closestCard.value = sortedDistance.get(key)

  // 计算移动偏移量
  diffX.value += centerX.value - getCardCenterX(closestCard.value)
  diffY.value += centerY.value - getCardCenterY(closestCard.value)

  currentCard.value = closestCard.value

  // Start Moving 6s
  dynamicFloatingContainer.value.translate = `${diffX.value}px ${diffY.value}px`

  const inner_card = currentCard.value.getElementsByClassName('card-inner')
  const halo_effect = currentCard.value.getElementsByClassName('halo-effect')
  const anim_effect = currentCard.value.getElementsByClassName('anim-effect')
  const back_pic = currentCard.value.getElementsByClassName('back-picture')

  if (back_pic.length != 0) {
    setRandomCardBackImage(back_pic[0])
  }

  setTimeout(() => {
    anim_effect[0].classList.add('gif-anim')
    inner_card[0].classList.add('flipped')
    halo_effect[0].classList.add('play-halo')
  }, 6000)
  console.log(anim_effect)

  setTimeout(() => {
    anim_effect[0].classList.remove('gif-anim')
    inner_card[0].classList.remove('flipped')
    halo_effect[0].classList.remove('play-halo')
  }, 5000)
  dynamicFloatingContainer.value.scale = 1
}

const timer = ref(0)
onMounted(() => {
  updateDistanceToCenter()
  timer.value = setInterval(() => {
    updateDistanceToCenter()
  }, 11000)
})

const dynamicFloatingContainer = ref({
  transform: ``
})

const router = useRouter();
const dump = () => {
  router.push({ name: 'prepare1' })
}
</script>

<template>

  <div class="home">
    <div class="btn" @click="dump">
      <span>GO</span>
    </div>
    <div class="background-container zoom-floating-card">

      <div ref="floating_container" class="floating-container" :style="dynamicFloatingContainer">
        <FloatingCard
          cardImage="卡片1-控制想象"
          style="top: -5vh; left: 60vw"
          cardType="text"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="卡片2-脑机接口"
          style="top: 58vh; left: 50vw"
          cardType="text"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="卡片3-人工智能"
          style="top: 5vh; left: 28vw"
          cardType="text"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="乌龟"
          style="top: 15vh; left: 5vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="企鹅"
          style="top: 50vh; left: 27vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="变色龙"
          style="top: 94vh; left: 20vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="孔雀"
          style="top: 40vh; left: 73vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="小丑鱼"
          style="top: 62vh; left: 0vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="河马"
          style="top: 25vh; left: 95vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="海豚"
          style="top: 88vh; left: 77vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="狗熊"
          style="top: 108vh; left: 50vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="熊猫"
          style="top: 120vh; left: 97vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="狗"
          style="top: 58vh; left: 137vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="狮子"
          style="top: 68vh; left: 110vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="猫"
          style="top: -28vh; left: 82vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="瞪羚"
          style="top: -48vh; left: 37vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="老虎"
          style="top: -30vh; left: 7vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="蜜蜂"
          style="top: 28vh; left: -20vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="蝴蝶"
          style="top: 108vh; left: -5vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="螃蟹"
          style="top: 5vh; left: 123vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="象"
          style="top: -55vh; left: 60vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="青牛"
          style="top: 138vh; left: 73vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="青蛙"
          style="top: 143vh; left: 30vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="马"
          style="top: 162vh; left: 8vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="骆驼"
          style="top: -25vh; left: -30vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="鸽子"
          style="top: 88vh; left: -33vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="鹦鹉"
          style="top: 33vh; left: -48vw"
          :centerX="centerX"
          :centerY="centerY"
        />
        <FloatingCard
          cardImage="鹰"
          style="top: 142vh; left: -28vw"
          :centerX="centerX"
          :centerY="centerY"
        />
      </div>
    </div>
  </div>


</template>

<style scoped lang="scss">
.background-container {
  width: 100%;
  height: 100vh;
  background-color: #000;
  overflow: hidden;

}

div.home {
  position: relative;
}
div.btn {
  width: 197px;
  height: 197px;
  border-radius: 50%;
  background: linear-gradient(195deg, #9C56F5 0%, #0057FF 100%);
  position: absolute;
  right: 95px;
  bottom: 400px;
  z-index: 100;
  transition: background-color .35s linear;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: linear-gradient(195deg, #D969DA 0%, #66B9D5 100%);
  }
  span {
    font-size: 80px;
    font-family: "Volte";
    font-weight: bold;
    color: #FFFFFF;
  }
}

.floating-container {
  transition:
    translate 6s ease-in-out,
    scale 5s ease-in-out;
  width: 100%;
  height: 100%;
}

.zoom-floating-card {
  animation: zoom-in-out 11s linear 0s infinite normal forwards;
}

@keyframes zoom-in-out {
  0% {
    scale: 1;
  }
  50% {
    scale: 1;
  }
  70% {
    scale: 1.1;
  }
  80% {
    scale: 1.1;
  }
  100% {
    scale: 1;
  }
}
</style>
