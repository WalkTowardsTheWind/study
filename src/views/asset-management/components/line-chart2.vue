<template>
	<div class="top">
		<el-card class="top-item">
			<div class="top-item-title">发佣合计</div>
			<div class="top-item-money">{{ commission_total }}</div>
		</el-card>
		<el-card class="top-item">
			<div class="top-item-title">利润</div>
			<div class="top-item-money">{{ profit }}</div>
			<div class="top-item-bi">
				<span>利率<span class="m-l-[20px]">{{ profit_rate }}</span></span>
				<img :src="profit > 0 ? jpgTop : jpgBottom" alt="" />
			</div>
		</el-card>
	</div>
	<div class="time">
		<div class="title">
			<div class="line"></div>
			<div>发佣统计</div>
		</div>
		<div class="select">
			<el-button @click="changeType(2)">上周</el-button>
			<el-button @click="changeType(1)">本周</el-button>
			<el-button @click="changeType(4)">上月</el-button>
			<el-button @click="changeType(3)">本月</el-button>
		</div>
	</div>
	<div id="main2"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import jpgTop from "@/assets/icons-jpg/top.png";
import jpgBottom from "@/assets/icons-jpg/bottom.png";
import { getChannelList } from "@/api/money";

// 1 2 3 4
const time_type = ref(1);

const commission_total = ref();
const profit = ref();
const profit_rate = ref();

function get3And1List() {
	// 时间类型 1本周 2上周 3本月 4上月
	let params = {
		time_type: time_type.value,
	};
	getChannelList(params).then((res) => {
		commission_total.value = res.data.commission_total;
		profit.value = res.data.profit;
		profit_rate.value = res.data.profit_rate;

		// console.log(res.data.commission_list);

		options.value.xAxis.data = res.data?.commission_list.map(
			(item) => item.date_time
		);
		options.value.series[0].data = res.data?.commission_list.map(
			(item) => item.commission
		);
		chart.value?.clear();
		chart.value?.setOption(options.value);
	});
}

function changeType(type: number) {
	time_type.value = type;
	get3And1List();
}

const chart = ref({} as any);

const options = ref({
	title: {
		// text: "Stacked Line",
	},
	tooltip: {
		trigger: "axis",
	},
	legend: {
		orient: "horizontal", // 垂直方向显示
		left: "left", // 距离左侧距离
		data: [
			{
				name: "支出",
			},
		],
		selectedMode: false,
	},
	grid: {
		left: "0%",
		right: "10%",
		bottom: "3%",
		containLabel: true,
	},
	toolbox: {
		feature: {
			saveAsImage: {},
		},
	},
	xAxis: {
		type: "category",
		boundaryGap: false,
		data: [], // x轴
		axisTick: {
			show: false, // 不显示刻度
		},
	},
	yAxis: {
		type: "value",
	},
	series: [
		{
			name: "支出",
			type: "line",
			stack: "total",
			data: [], // 数据
			showSymbol: false,
			smooth: true,
			itemStyle: {
				color: "#366ff4", // 折线颜色
				symbol: "circle", // 圆点标记
				symbolSize: 10, // 圆点大小
				lineStyle: {
					width: 1, // 折线宽度
				},
			},
		},
	],
});

onMounted(() => {
	// 图表初始化
	chart.value = echarts.init(
		document.getElementById("main2") as HTMLDivElement
	);

	// 大小自适应
	window.addEventListener("resize", () => {
		chart.resize();
	});
});

get3And1List();
</script>

<style scoped lang="scss">
#main2 {
	width: 90vw;
	height: 500px;
}

.top {
	display: flex;
	gap: 0 20px;
	margin: 20px 0 30px;

	&-item {
		width: 272px;
		height: 160px;
		background: #f5f5f5;
		border: none;
		border-radius: 4px;

		&-title {
			font-size: 14px;
			font-weight: 500;
			color: #333;
		}

		&-money {
			margin: 10px 0 20px;
			font-size: 32px;
			font-weight: bold;
			color: #356ff3;
		}

		&-bi {
			display: flex;
			align-items: center;
			font-size: 13px;
			color: #656565;
		}
	}
}

.title {
	display: flex;
	flex-direction: row;
	align-items: center;
	font-family: sans-serif;
	font-size: 14px;
	color: #356ff3;
}

.time {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 85%;
}

.line {
	display: flex;
	width: 4px;
	height: 14px;
	margin-right: 10px;
	background: #356ff3;
	border-radius: 4px;
}
</style>
