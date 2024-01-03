
<template>
  <div class="content">
    <div class="content-top">
      <el-input
        class="searchClass"
        v-model="keyword"
        @input="handleSearchKey"
        placeholder="搜索周边"
        :suffix-icon="Search"
      />
    </div>
    <div class="search-box">
      <var-tabs
        elevation
        color="#fff"
        active-color="#fff"
        inactive-color="black"
        v-model:active="active"
      >
        <var-tab :key="index" v-for="(item, index) in state.searchList">{{
          item.label
        }}</var-tab>
      </var-tabs>
      <div class="icon">
        <svg-icon
          name="jihe"
          color="grey"
          width="22px"
          height="22px"
        ></svg-icon>
      </div>

      <!-- <div
        class="search-item"
       
      >
        {{ item.label }}
      </div> -->
    </div>
    <div class="map-content">
      <Map />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Map from "@/components/map.vue";
import SvgIcon from "@/components/svg.vue";
import { Search } from "@element-plus/icons-vue";
const active = ref(0);
const keyword = ref("");
//搜索项
const state = reactive({
  searchList: [
    {
      label: "景点",
      id: 1,
    },
    {
      label: "停车场",
      id: 2,
    },
    {
      label: "卫生间",
      id: 3,
    },
    {
      label: "公园",
      id: 4,
    },
    {
      label: "商店",
      id: 5,
    },
    {
      label: "停车场",
      id: 6,
    },
    {
      label: "餐饮",
      id: 7,
    },
    {
      label: "母婴室",
      id: 8,
    },
    {
      label: "售票处",
      id: 9,
    },
    {
      label: "出入口",
      id: 10,
    },
  ],
});
/**
 * 搜索周边
 */
const handleSearchKey = (keyword) => {
  // 创建搜索请求对象
  var request = {
    keyWord: keyword,
    level: 12,
    mapBound: "116.02524,39.83833,116.65592,39.99185",
    queryType: 2,
    start: 0,
    count: 10,
  };

  // 将搜索请求对象转换为 Base64 编码的 JSON 字符串
  var postStr = JSON.stringify(request);

  // 发送搜索请求
  fetch(
    "http://api.tianditu.gov.cn/v2/search?postStr=" +
      postStr +
      "&type=query" +
      "&tk=f5c6e3cb59fa2c5c10a4279fa232d65c"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // 将搜索结果添加到地图上
      for (var i = 0; i < data.pois.length; i++) {
        var poi = data.pois[i];
        var marker = new T.Marker(new T.LngLat(poi.lonlat));
        var infoWindow = new T.InfoWindow();
        infoWindow.setLngLat(new T.LngLat(116.404, 39.915));
        // infoWindow.setLatLng(new T.LngLat(poi.lonlat))
        infoWindow.setContent(poi.name + "<br>" + poi.address);
        marker.addEventListener("click", function () {
          if (poi.lonlat) {
            window.map.openInfoWindow(infoWindow, marker);
          }
        });
        window.map.addOverLay(marker);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100vh;
  .content-top {
    height: 30px;
    margin-bottom: 20px;
    :deep(.searchClass) {
      border-radius: 20px;
      border: none !important;
      background: #f7f8fb;
      .el-input__wrapper {
        height: 36px;
        line-height: 36px;
        border: none;
        box-shadow: none;
        color: #6ca7f8;
        background-color: transparent;
      }
    }
  }
  .search-box {
    width: 100%;
    height: 35px;
    display: flex;
    overflow-x: auto;
    margin-bottom: 20px;
    :deep(.var-tabs) {
      width: calc(100% - 40px);
      flex: 1;
      height: 100%;
      padding: 2px 0;
      box-shadow: none;
      .var-tab--active {
        background: #008efa;
        height: 90%;
        border-radius: 20px;
      }
    }
    .icon {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .map-content {
    height: calc(100% - 150px);
  }
}
</style>