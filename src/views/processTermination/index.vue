<template>
  <div class="processTermination">
    <img class="mainImage" src="../../assets/img/redCircle.png" alt="">
    <div class="mainText">
      <p>进程终止</p>
      <p>由于用户的专注⼒不够强⼤</p>
      <p>想象力可视化过程中有失控的⻛险</p>
      <p>Because human concentration is not strong enough,</p>
      <p>There is a risk of loss of control in biological evolution</p>
    </div>
    <ul class="mainBtn">
      <li @click="quit">
        <span>我要放弃</span>
      </li>
      <li @click="tryAgain">
        <span>再试一次</span>
      </li>
    </ul>
  </div>
</template>
<script setup>

//放弃
const router = useRouter();
const quit = () => {
  router.push({
    name: "home",
  })
}

//再试一次
const tryAgain = () => {
  router.push({
    name: "concentration",
  })
}

</script>
<style scoped lang="scss">
div.processTermination {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000000;
  .mainImage {
    width: 470px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
  .mainText {
    width: 745px;
    height: 760px;
    position: absolute;
    top: 200px; bottom: 0;
    left: 0; right: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    p:first-child {
      font-size: 107px;
      font-weight: 400;
      color: #FFFFFF;
      margin-bottom: 20px;
      font-family: "SourceHanSansCN";
    }
    p:nth-child(2) {
      font-size: 48px;
      font-weight: 400;
      color: #FFFFFF;
      font-family: "SourceHanSansCN";
    }
    p:nth-child(3) {
      font-size: 48px;
      font-weight: 400;
      color: #FFFFFF;
      font-family: "SourceHanSansCN";
      margin-bottom: 20px;
    }
    p:nth-child(4) {
      font-size: 30px;
      color: #FFFFFF;
      font-family: "Volte";
    }
    p:nth-child(5) {
      font-size: 30px;
      color: #FFFFFF;
      font-family: "Volte";
    }
  }
  .mainBtn {
    width: 650px;
    height: 120px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0; bottom: -600px;
    left: 0; right: 0;
    margin: auto;
    li {
      cursor: pointer;
      width: 276px;
      height: 105px;
      border-radius: 52px;
      line-height: 105px;
      text-align: center;
      &:first-child {
        background: #3F3F3F;
        transition: background-color .35s linear;
        &:hover {
          background: #0049B7;
        }
      }
      &:last-child {
        background: linear-gradient(195deg, #9C56F5 0%, #0057FF 100%);
        &:hover {
          background: linear-gradient(195deg, #D969DA 0%, #66B9D5 100%);
        }
      }
      span {
        color: #ffffff;
        font-size: 42px;
      }
    }
  }
}
</style>
