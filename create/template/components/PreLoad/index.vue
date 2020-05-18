<template>
  <div id="pageLoading" class="pre-loading modal-shadow">
    <div id="pageLoading" class="loading-container center-box">
      <img class="loading-icon" src="../../assets/images/loading.gif" alt />
      <div class="loading-text">加载中...</div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Preload'
};
</script>

<style scoped lang="scss">
 @import './index.scss';
</style>