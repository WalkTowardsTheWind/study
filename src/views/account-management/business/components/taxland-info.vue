<template>
	<div class="content p-[30px]">
		<el-form :form="formItem" label-width="120">
			<el-row class="w-full" :gutter="50">
				<el-col :span="8">
					<el-form-item label="税地名称">
						<el-select class="w-full" placeholder="请选择" v-model="formItem.tax_land_id">
							<el-option v-for="(item, index) in taxLandOption" :key="index" :value="item.id"
								:label="item.tax_land_name"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="认证规则">
						<el-select class="w-full" v-model="formItem.auth_type" :disabled="!isEdit">
							<el-option v-for="(item, index) in authType" :key="index" :label="item.label"
								:value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="客户税地子账户">
						<el-input v-model="formItem.tax_bank_name" readonly />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="客户点位">
						<el-input v-model="formItem.tax_point" :readonly="!isEdit">
							<template #append>%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="签约规则">
						<el-select class="w-full" placeholder="请选择（单选）" v-model="formItem.sign_type" :disabled="!isEdit">
							<el-option :value="1" label="静默签"></el-option>
							<el-option :value="2" label="二维码签约"></el-option>
							<el-option :value="3" label="短信签约"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="银行账户">
						<el-input v-model="formItem.sub_account_no" readonly />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="签约合同">
						<MultiUpload v-model="formItem.contract_img" v-if="isEdit">
							<i-ep-Plus />
						</MultiUpload>
						<PicturePreview v-else :image-list="formItem.contract_img" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import { getLandList } from "@/api/common";


const taxLandOption = ref([] as any);
function getTaxLandOption() {
	console.log(123);

	taxLandOption.value.length = 0;
	getLandList().then((res) => {
		taxLandOption.value.push(...res.data);
	});
}

const authType = [
	{ label: "二要素（姓名、身份证）", value: 1 },
	{ label: "三要素（姓名、手机号、身份证）", value: 2 },
	{ label: "三要素（姓名、身份证、银行卡）", value: 3 },
	{ label: "四要素（姓名、手机号、身份证、银行卡）", value: 4 },
];

const props = defineProps({
	isEdit: {
		type: Boolean,
		default: () => false,
	},
	id: {
		default: () => 0,
	},
	childData: {
		type: Object,
	},
});
const emit = defineEmits(["update:modelValue"]);

const formItem = ref(props.childData as any);

watch(
	() => props.childData,
	(newValue) => {
		formItem.value = props.childData;
		formItem.value.tax_land_id = formItem.value.tax_land_id * 1;
	}
);

watch(
	() => formItem.value,
	(newValue) => {
		emit("update:modelValue", formItem.value);
	}
);


getTaxLandOption();
</script>

<style scoped lang="scss">
.content {
	position: relative;
	height: calc(100vh - 200px);
}

.bottom-btn {
	position: absolute;
	bottom: 20px;
	left: 45%;
	transform: translateX(-50%);
}
</style>
