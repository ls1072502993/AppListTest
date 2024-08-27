<template>
  <!-- 顶部搜索框 -->
  <div class="search-box">
    <input type="text" placeholder="Search..." />
  </div>
  <!-- 推荐App列表 -->
  <div class="recommend-box">
    <div class="title">recommend</div>
    <div class="list">
      <div class="item-box">
        <div class="item" v-for="(v, i) in 10" :key="i">
          <img class="logo" src="" alt="" />
          <div class="name">圣斗士星矢</div>
          <div class="type">游戏</div>
        </div>
      </div>
    </div>
  </div>
  <!-- 热度最高免费App -->
  <div class="hot-box">
    <div class="item" v-for="(v, i) in 20" :key="i">
      <div class="sort">{{ i + 1 }}</div>
      <img class="logo" src="" alt="" />
      <div class="detail">
        <div class="name">namenamenamenamename</div>
        <div class="type">youxi</div>
        <div class="star"></div>
      </div>
    </div>
  </div>
  <!-- End -->
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
