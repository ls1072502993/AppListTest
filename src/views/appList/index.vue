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
          <Rate v-model="value" :size="15" color="#ffd21e" void-icon="star" void-color="#eee" />
          <span>(1111)</span>
        </div>
      </div>
    </div>
  </div>
  <!-- End -->
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { Rate } from 'vant';
import * as fetch from '@/api/appList/index'
import { _debounce } from '@/utils/utils'

// 顶部搜索结果
const keyWord = ref('')
const getKeyWordList = _debounce(() => {
  console.log(keyWord.value)
}, 500)

// 获取推荐App列表
const recommendList = reactive({})
const getRecommendList = () => {
  fetch.getTopgrossingapplicationsList(10).then(res => {
    Object.assign(recommendList, res.data.feed.entry)
  })
}
onMounted(() => {
  getRecommendList()
})

// 获取热度最高免费App列表
const hotList = reactive({})
const value = ref(3)
const isLoading = ref(false)
const pageSize = ref(10)
const getHotList = () => {
  isLoading.value = true
  fetch.getTopfreeapplicationsList(pageSize.value).then(res => {
    isLoading.value = false
    Object.assign(hotList, res.data.feed.entry)
  })
}
const loadList = () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  if ((scrollTop + windowHeight) == scrollHeight) {
    if (isLoading.value || pageSize.value >= 100) return
    pageSize.value += 10
    console.log(pageSize.value)
  }
}
onMounted(() => {
  getHotList()
  window.addEventListener('scroll', loadList)
})

onUnmounted(() => {
  window.removeEventListener('scroll', loadList)
}) 
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
