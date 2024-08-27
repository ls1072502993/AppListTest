<template>
  <!-- 顶部搜索框 -->
  <div class="search-box">
    <input type="text" v-model="keyWord" placeholder="Search..." @input="getKeyWordList" />
  </div>
  <!-- 推荐App列表 -->
  <div class="recommend-box">
    <div class="title">recommend</div>
    <div class="list">
      <div class="item-box">
        <div class="item" v-for="(v, i) in recommendList" :key="v.id.label">
          <img class="logo" :src="v['im:image'][2].label" />
          <div class="name text-ellipsis">{{ v['im:name'].label }}</div>
          <div class="type">{{ v.category.attributes.label }}</div>
        </div>
      </div>
    </div>
  </div>
  <!-- 热度最高免费App -->
  <div class="hot-box">
    <div class="item" v-for="(v, i) in hotList" :key="v.id.label">
      <div class="sort">{{ Number(i) + 1 }}</div>
      <img class="logo" :class="{ type_1: i % 2 != 0, type_2: i % 2 == 0 }" :src="v['im:image'][2].label" />
      <div class="detail">
        <div class="name text-ellipsis">{{ v['im:name'].label }}</div>
        <div class="type">{{ v.category.attributes.label }}</div>
        <div class="star">
          <Rate v-model="starValue" :size="15" color="#ffd21e" void-icon="star" void-color="#eee" allow-half />
          <span>(1111)</span>
        </div>
      </div>
    </div>
    <Empty description="No data" v-if="hotList.length == 0" />
    <Loading style="margin-top: 250px;" v-if="!loadingAll" size="24px" vertical>Loading...</Loading>
  </div>
  <!-- 回到顶部 -->
  <BackTop/>
  <!-- End -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Rate, Loading, Empty, BackTop } from 'vant';
import * as fetch from '@/api/appList/index'
import { _debounce } from '@/utils/utils'

// 顶部搜索结果
const keyWord = ref('')
const getKeyWordList = _debounce(() => {
  hotList.value = allHotList.value.filter(v => v['im:name'].label.toLowerCase().indexOf(keyWord.value.toLowerCase()) >= 0)
}, 500)

// 获取推荐App列表
const recommendList = ref([])
onMounted(() => {
  fetch.getTopgrossingapplicationsList(10).then(res => {
    recommendList.value = res.data.feed.entry
  })
})

// 获取热度最高免费App列表
const hotList = ref([])
const allHotList = ref([])
const loadingAll = ref(false)
const starValue = ref(3.5)

onMounted(() => {
  fetch.getTopfreeapplicationsList(100).then(res => {
    loadingAll.value = true
    hotList.value = res.data.feed.entry
    allHotList.value = res.data.feed.entry
  })
})
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
