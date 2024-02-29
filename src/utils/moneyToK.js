/**
 * 薪资显示转化k
 */
export const conversionSalary = (salary_min, salary_max) => {
  if (
    [salary_min, salary_max].includes("") ||
    [salary_min, salary_max].includes(null) ||
    [salary_min, salary_max].includes("0.00") ||
    [salary_min, salary_max].includes(undefined)
  ) {
    return "";
  } else {
    return (
      Math.floor(parseFloat(salary_min)).toString() +
      "k" +
      "-" +
      Math.floor(parseFloat(salary_max)).toString() +
      "k"
    );
  }
};
