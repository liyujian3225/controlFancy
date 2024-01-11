<script setup>
import axios from 'axios'
import FloatingCard from './components/FloatingCard.vue'
import DisplayCard from './components/DisplayCard.vue'
import { ref, onMounted, onBeforeUnmount, onBeforeMount } from 'vue'

const floating_container = ref(null)
const closestCard = ref(null)
const distances = ref(null)
const currentCard = ref(null)

const centerX = ref(window.innerWidth / 2)
const centerY = ref(window.innerHeight / 2)

const cardWidth = ref(189 * 1.7)
const cardHeight = ref(252.5 * 1.7)
const showAmount = '25'

const diffX = ref(0)
const diffY = ref(0)

const images = ref([])

const setCardSize = () => {
  var factor = 1.7
  switch (window.screen.width) {
    case 2560:
      break
    case 3840:
      factor = 2.55
      break
  }
  cardWidth.value = 189 * factor
  cardHeight.value = 252.5 * factor
}

const fetchImages = async () => {
  try {
    const response = await axios.get(
      'http://127.0.0.1:8000/resources/api/random_images?count=' + showAmount
    )
    images.value = response.data
    console.log(images.value[0])
  } catch (error) {
    console.error('Error fetching images:', error)
  }
}

const getCardCenterX = (card) => {
  return card.getBoundingClientRect().left + cardWidth.value / 2
}

const getCardCenterY = (card) => {
  return card.getBoundingClientRect().top + cardHeight.value / 2
}

const updateCenter = () => {
  centerX.value =
    currentCard.value == null ? window.innerWidth / 2 : getCardCenterX(currentCard.value)
  centerY.value =
    currentCard.value == null ? window.innerHeight / 2 : getCardCenterY(currentCard.value)
}

// 从几张备选的翻面图像中随机选择一张进行展示
const setRandomCardBackImage = (img_elem) => {
  if (Math.random() < 0.5) {
    img_elem.src = img_elem.getAttribute('back_img_1')
  } else {
    img_elem.src = img_elem.getAttribute('back_img_2')
  }
}

const updateDistanceToCenter = () => {
  // 遍历所有卡片，寻找最接近屏幕中心的卡片
  const floating_cards = document.getElementsByClassName('floating-card')
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

  setTimeout(() => {
    anim_effect[0].classList.remove('gif-anim')
    inner_card[0].classList.remove('flipped')
    halo_effect[0].classList.remove('play-halo')
  }, 5000)
  dynamicFloatingContainer.value.scale = 1
}

onBeforeMount(() => {
  fetchImages()
  setCardSize()
})

const timer = ref(0)
onMounted(() => {
  updateDistanceToCenter()
  timer.value = setInterval(() => {
    updateDistanceToCenter()
  }, 11000)
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})

const dynamicFloatingContainer = ref({
  transform: ``
})

const picture_card_positions = [
  {
    top: '15',
    left: '5'
  },
  {
    top: '50',
    left: '27'
  },
  {
    top: '94',
    left: '20'
  },
  {
    top: '40',
    left: '73'
  },
  {
    top: '33',
    left: '-43'
  },
  {
    top: '25',
    left: '95'
  },
  {
    top: '68',
    left: '110'
  },
  {
    top: '108',
    left: '50'
  },
  {
    top: '-28',
    left: '82'
  },
  {
    top: '58',
    left: '50'
  },
  {
    top: '-40',
    left: '-2'
  },
  {
    top: '53',
    left: '137'
  },
  {
    top: '-55',
    left: '60'
  },
  {
    top: '162',
    left: '8'
  },
  {
    top: '88',
    left: '-33'
  },
  {
    top: '142',
    left: '-28'
  },
  {
    top: '120',
    left: '97'
  },
  {
    top: '130',
    left: '118'
  },
  {
    top: '38',
    left: '157'
  },
  {
    top: '28',
    left: '-20'
  },
  {
    top: '-25',
    left: '-30'
  },
  {
    top: '-5',
    left: '28'
  },
  {
    top: '202',
    left: '28'
  },
  {
    top: '163',
    left: '50'
  },
  {
    top: '112',
    left: '-5'
  }
]

const text_card_positions = [
  {
    localPicture: '卡片1-控制想象',
    top: '15',
    left: '52'
  },
  {
    localPicture: '卡片2-脑机接口',
    top: '-80',
    left: '-20'
  },
  {
    localPicture: '卡片3-人工智能',
    top: '-48',
    left: '32'
  },
  {
    localPicture: '卡片2-脑机接口',
    top: '88',
    left: '77'
  },
  {
    localPicture: '卡片1-控制想象',
    top: '103',
    left: '145'
  },
  {
    localPicture: '卡片3-人工智能',
    top: '5',
    left: '123'
  },
  {
    localPicture: '卡片2-脑机接口',
    top: '62',
    left: '0'
  },
  {
    localPicture: '卡片3-人工智能',
    top: '-33',
    left: '-52'
  },
  {
    localPicture: '卡片1-控制想象',
    top: '42',
    left: '-65'
  },
  {
    localPicture: '卡片3-人工智能',
    top: '138',
    left: '73'
  },
  {
    localPicture: '卡片2-脑机接口',
    top: '195',
    left: '-15'
  },
  {
    localPicture: '卡片1-控制想象',
    top: '143',
    left: '30'
  }
]

const display_cards = [
  {
    top: '-110',
    left: '15'
  },
  {
    top: '-90',
    left: '-50'
  },
  {
    top: '-128',
    left: '-23'
  },
  {
    top: '-70',
    left: '-90'
  },
  {
    top: '-10',
    left: '-75'
  },
  {
    top: '0',
    left: '-100'
  },
  {
    top: '50',
    left: '-96'
  },
  {
    top: '100',
    left: '-80'
  },
  {
    top: '120',
    left: '-55'
  },
  {
    top: '175',
    left: '-68'
  },
  {
    top: '195',
    left: '-40'
  },
  {
    top: '250',
    left: '-20'
  },
  {
    top: '238',
    left: '-53'
  },
  {
    top: '238',
    left: '8'
  },
  {
    top: '242',
    left: '48'
  },
  {
    top: '203',
    left: '70'
  },
  {
    top: '180',
    left: '100'
  },
  {
    top: '195',
    left: '132'
  },
  {
    top: '160',
    left: '155'
  },
  {
    top: '110',
    left: '174'
  },
  {
    top: '50',
    left: '185'
  },
  {
    top: '-20',
    left: '158'
  },
  {
    top: '-45',
    left: '128'
  },
  {
    top: '-80',
    left: '98'
  },
  {
    top: '-100',
    left: '50'
  }
]

const calculateCardStyle = (text_card) => {
  return {
    // top: `${Number(text_card.top) + 150}vh`,
    // left: `${Number(text_card.left) + 150}vw`
    top: `${Number(text_card.top)}vh`,
    left: `${Number(text_card.left)}vw`
  }
}

const router = useRouter();
const dump = () => {
  router.push({ name: 'prepare1' })
}

</script>

<template>
  <div class="home">
    <div class="btnContain">
      <div class="btn" @click="dump">
        <span>GO</span>
      </div>
    </div>
    <div class="background-container zoom-floating-card">
      <div ref="floating_container" class="floating-container" :style="dynamicFloatingContainer">
        <div v-for="(text_card, index) in images" :key="index" id="PictureCards">
          <FloatingCard
            :key="index"
            :cardDetails="text_card"
            :style="calculateCardStyle(picture_card_positions[index])"
            :centerX="centerX"
            :centerY="centerY"
            :cardWidth="cardWidth"
            :cardHeight="cardHeight"
          />
        </div>
        <div v-for="(text_card, index) in text_card_positions" :key="index" id="TextCards">
          <FloatingCard
            :key="index"
            cardType="Text"
            :localPicture="text_card.localPicture"
            :style="calculateCardStyle(text_card)"
            :centerX="centerX"
            :centerY="centerY"
            :cardWidth="cardWidth"
            :cardHeight="cardHeight"
          />
        </div>
        <div v-for="(image, index) in images" :key="index" id="DiaplayCards">
          <DisplayCard
            :key="index"
            :base_front_img="image.front_img"
            :style="calculateCardStyle(display_cards[index])"
            :centerX="centerX"
            :centerY="centerY"
            :cardWidth="cardWidth"
            :cardHeight="cardHeight"
          />
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.background-container {
  width: 100%;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
}

div.home {
  position: relative;
}
div.btnContain {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  position: absolute;
  right: 0;
  bottom: 50%;
  z-index: 100;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    filter: blur(15px);
    position: absolute;
    z-index: -1;
  }
  div.btn {
    width: 197px;
    height: 197px;
    border-radius: 50%;
    background: linear-gradient(195deg, #9C56F5 0%, #0057FF 100%);
    transition: background-color .35s linear;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
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
