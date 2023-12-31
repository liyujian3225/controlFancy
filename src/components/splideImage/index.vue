<template>
  <div class="splideImage">
    <Splide :options="options">
      <SplideSlide v-for="(item, index) in mixSplideImageList">
        <img
          :src="item"
          :key="index"
          @click="handleSelectImage(item)"
        >
      </SplideSlide>
    </Splide>
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :http-request="handleFileUpload"
    >
      <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </div>
</template>
<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { uploadStudioImage } from "@/api/project";
import { Plus } from '@element-plus/icons-vue'
import { ref, defineEmits, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  splideImageList: Array,
  type: String,
});
const emit = defineEmits(['handleSelectImage'])
const mixSplideImageList = ref(props.splideImageList)
const options = {
  perPage: 5,
  perMove: 1,
  padding: 40,
  focus  : 'center',
  type: 'slide',
  rewind: true,
  height: "96px",
  gap: "10px",
}

const route = useRoute();
const { id } = route.query;
const handleFileUpload = ({file}) => {
  const params = {
    mainId: id,
    type: props.type,
    category: "SELECTED",
    file: file,
  }
  uploadStudioImage(params).then(res => {
    const imgUrl = res.content.url;
    mixSplideImageList.value.push(imgUrl);
  })
}

const handleSelectImage = (url) => {
  emit("handleSelectImage", url);
}

</script>
<style lang="scss" scoped>
.splideImage {
  height: 100%;
  display: flex;
  justify-content: space-between;
  ::v-deep {
    .splide__slide {
      display: flex;
      align-items: center;
    }
    .splide__arrows {
      position: absolute;
      top: 0; bottom: 0;
      left: 0;right: 0;
      margin: auto;
    }
  }
  img {
    width: 100%;
    cursor: pointer;
  }
  .avatar-uploader {
    width: 96px;
    height: 96px;
    display: block;
    ::v-deep {
      .el-upload {
        width: 100%;
        height: 100%;
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
        &:hover {
          border-color: var(--el-color-primary);
        }
        .el-icon.avatar-uploader-icon {
          font-size: 28px;
          color: #ffffff;
          width: 100%;
          height: 100%;
          text-align: center;
        }
      }
    }
  }
}
</style>
