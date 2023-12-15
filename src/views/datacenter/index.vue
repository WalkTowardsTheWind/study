<template>
  <div class="p-24px">
    <div class="sale">
      <SaleView />
    </div>
    <div class="data"></div>
    <div class="chart"></div>
    <div class="cardbox">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SaleView from "./components/sale.vue";
</script>

<style lang="scss">
.sale {
  box-sizing: border-box;
  width: 100%;
  height: 264px;
  background: #ffffff;
  border-radius: 16px 16px 16px 16px;
}
</style>
