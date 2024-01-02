<template>
	<div class="content">
		<div class="content-top">
			<el-input v-model="keyword" @input="handleSearchKey" placeholder="搜索周边" clearable />
		</div>
		<div class="map-content">
			<Map/>
		</div>
	</div>
</template>

<script setup>
	import Map from '@/components/map.vue'
	import {ref} from 'vue'
	const keyword = ref('')
	/**
	 * 搜索周边
	 */
	const handleSearchKey = (keyword)=>{
		  // 创建搜索请求对象
		      var request = {
		    "keyWord":keyword,
			"level":12,
			"mapBound":"116.02524,39.83833,116.65592,39.99185",
			"queryType":2,
			"start":0,
			"count":10
		      };
		
		      // 将搜索请求对象转换为 Base64 编码的 JSON 字符串
		      var postStr =JSON.stringify(request);
		
		      // 发送搜索请求
		      fetch('http://api.tianditu.gov.cn/v2/search?postStr=' + postStr+'&type=query'+'&tk=f5c6e3cb59fa2c5c10a4279fa232d65c')
		        .then(function(response) {
		          return response.json();
		        })
		        .then(function(data) {
		          // 将搜索结果添加到地图上
		          for (var i = 0; i < data.pois.length; i++) {
		            var poi = data.pois[i];
		            var marker = new T.Marker(new T.LngLat(poi.lonlat));
		            var infoWindow = new T.InfoWindow();
					infoWindow.setLngLat(new T.LngLat(116.404, 39.915));
					// infoWindow.setLatLng(new T.LngLat(poi.lonlat))
					infoWindow.setContent(poi.name + '<br>' + poi.address)
		            marker.addEventListener('click', function() {
						if(poi.lonlat){
							window.map.openInfoWindow(infoWindow,marker);
						}
		      
					  
		            });
		            window.map.addOverLay(marker);
				
		          }
		        })
		        .catch(function(error) {
		          console.error(error);
		        });
	}
</script>

<style lang="less" scoped>
	.content{
		width: 100%;
		height: 100vh;
		.content-top{
			height: 30px;
			margin-bottom: 20px;
		}
		.map-content{
			height: calc(100% - 50px);
		}
	}
</style>