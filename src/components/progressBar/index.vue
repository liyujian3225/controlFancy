<template>
  <div class="progressBar">
    <el-progress
      color="#7b0daf"
      :indeterminate="true"
      :duration="3"
      :stroke-width="10"
      :percentage="percentage"
    >
      <span class="percent">{{ percentage }}%</span>
    </el-progress>
  </div>
</template>
<script setup>
defineProps({ percentage: Number})
</script>
<style lang="scss" scoped>
.el-progress--line {
  width: calc(100% - 10px);
  margin-left: 10px;
  margin-bottom: 10px;
  span.percent {
    color: #ffffff;
  }
}
</style>
