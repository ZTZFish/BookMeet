<script setup lang="ts">
const props = defineProps({
  market: {
    type: Object,
    default: () => ({}),
  }
})

</script>


<template>
  <div class="market-info">
    <div class="content">
      <div class="market-pic">
        <img :src="props.market.image" alt="">
      </div>
      <div class="right">
        <div class="market-name">
          <span>{{ props.market.name }}</span>
        </div>
        <div class="company">
          <span>{{ props.market.company }}</span>
        </div>
        <div class="go-to-market">
          <svg t="1748357264209" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="3997" width="30" height="30">
            <path
              d="M245.333333 533.333333v288h512V533.333333h64v352h-640V533.333333h64zM834.624 139.050667l45.077333 150.869333a149.333333 149.333333 0 0 1-255.722666 139.52l-3.669334-4.330667L618.666667 423.04l-1.642667 2.090667a149.248 149.248 0 0 1-104.533333 54.485333l-6.016 0.32-5.141334 0.085333a149.12 149.12 0 0 1-112.021333-50.56l-3.669333-4.330666L384 423.04l-1.642667 2.090667a149.248 149.248 0 0 1-104.533333 54.485333l-6.016 0.32-5.141333 0.085333a149.333333 149.333333 0 0 1-145.301334-183.808l1.792-6.890666 45.909334-150.250667h665.557333z m-47.68 63.978666H216.426667L184.533333 307.370667a84.693333 84.693333 0 0 0-2.389333 11.456l-0.597333 5.888-0.213334 5.952a85.333333 85.333333 0 0 0 169.813334 12.16l0.512-4.352 2.624-29.12h59.434666l2.624 29.12a85.333333 85.333333 0 0 0 169.472 4.330666l0.512-4.330666 2.624-29.12h59.434667l2.624 29.12a85.333333 85.333333 0 1 0 168.32-26.346667l-1.066667-4.330667-31.317333-104.768z"
              fill="#1677FF" p-id="3998"></path>
          </svg>
          <span>进店逛逛</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.market-info {
  padding: 15px;
  background-color: #fff;
  margin-bottom: 10px;

  .content {
    display: flex;
    align-items: center;

    .market-pic {
      width: 100px;
      height: 100px;
      border-radius: 5px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      height: 100px;
      margin-left: 10px;
      justify-content: space-between;
      padding-bottom: 5px;

      .market-name {
        margin-left: 10px;
        font-size: 20px;
        font-weight: 600;
      }

      .company {
        display: flex;
        align-items: center;
        margin-left: 10px;

        span {
          font-size: 14px;
          color: #666;

        }
      }

      .go-to-market {
        display: flex;
        align-items: center;
        margin-left: 5px;

        span {
          margin-left: 2px;
          font-size: 16px;
          color: #1677FF;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
  }
}
</style>