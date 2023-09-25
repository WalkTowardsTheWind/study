export const settlement_type = [
  {
    label: "周结",
    value: 1,
  },
  {
    label: "月结",
    value: 2,
  },
];

export const collection_type = [
  {
    label: "公对私",
    value: 1,
  },
  {
    label: "公对公",
    value: 2,
  },
  {
    label: "私对私",
    value: 3,
  },
];

export const pointValidationRule = [
  { required: true, message: "必填", trigger: "blur" },
  {
    validator: (rule, value, callback) => {
      const point = parseFloat(value);
      if (isNaN(point) || point < 1 || point > 100) {
        callback(new Error("点数必须在 1 到 100 之间"));
      } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        callback(new Error("最多只能有两位小数"));
      } else {
        callback();
      }
    },
    trigger: "blur",
  },
];
