<template>
  <div>
    <div id="myChart"></div>
  </div>
</template>

<script>
import { httpgetcate } from "../../util/request";
import echarts from 'echarts'
export default {
  name:'',
  data() {
    return {
   charts: '',
				opinionData: ['300','340','100','480','400','700','810']
    };
  },
  methods: {
			drawLine(id) {
				this.charts = echarts.init(document.getElementById(id))
				this.charts.setOption({
          title:{
            text:'近一周订单数量'
          },
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['近一周订单数量']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
            containLabel: true,
            
					},

					xAxis: {
						type: 'category',
            // boundaryGap: false,
					data: ["周一","周二","周三","周四","周五","周六","周日"]
					
					},
					yAxis: {
            type: 'value',
						boundaryGap: false,
					data: ["0","200","400","600","800","1000"]

					},

					series: [{
						name: '近一周订单数量',
						type: 'line',
						stack: '总量',
						data: this.opinionData
					}]
				})
			}
		},
  mounted() {
    this.$nextTick(function() {
				this.drawLine('myChart')
			})
  },
};
</script>

<style scoped>
#myChart {
  width: 1100px;
  height: 400px;
}
</style>