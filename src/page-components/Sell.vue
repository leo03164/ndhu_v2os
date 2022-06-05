<template>
  <div class="add-product-container">
    <Card class="main-container">
      <div class="card-group">
        <SmallCard
          :title="card.title"
          :number="card.number"
          v-for="(card, index) in cardData"
          :key="index"
        ></SmallCard>
      </div>

      <div class="table-card">
        <Row>
          <Col span="2" class="table-hearder"></Col>
          <Col span="4" class="table-hearder">SN</Col>
          <Col span="7" class="table-hearder">Name</Col>
          <Col span="3" class="table-hearder">State</Col>
          <Col span="4" class="table-hearder">Made</Col>
          <Col span="4" class="table-hearder">Action</Col>
        </Row>
        <!-- set productList is computed -->
        <Row
          class="table-content-container"
          v-for="(product, index) in getProductList"
          :key="index"
        >
          <Col span="2">
            <img
              :src="`https://ipfs.io/ipfs/${product.CID}`"
              class="table-img"
              alt=""
            />
          </Col>
          <Col span="4" class="table-content">{{ product.SN }}</Col>
          <Col span="7" class="table-content">{{ product.name }}</Col>
          <Col span="3" class="table-content">{{
            stateDescription[product.state]
          }}</Col>
          <Col span="4" class="table-content">{{ product.bornFrom }}</Col>
          <Col span="4" class="table-content mg-t-n5">
            <Button @click="sellHandler(product)">販售</Button>
          </Col>
        </Row>
        <RandomValue
          v-if="isShowSellModal"
          :shoesId="currentProduct.shoesId"
          @close="isShowSellModal = false"
        ></RandomValue>
      </div>
    </Card>
  </div>
</template>
<script>
import SmallCard from "@/ui-components/SmallCard.vue";
import CreateNewProductCard from "@/global-components/CreateNewProductCard.vue";
import RandomValue from "@/global-components/RandomValue.vue";
import { stateDescription } from "@/constant.json";
import { mapState } from "vuex";

export default {
  components: { SmallCard, CreateNewProductCard, RandomValue },
  data() {
    return {
      cardData: [
        {
          title: "Total",
          number: 100
        },
        {
          title: "New",
          number: 10
        },
        {
          title: "Selled",
          number: 20
        }
      ],

      productList: [],
      stateDescription,
      currentProduct: {},
      isShowSellModal: false,
      productCount: 0
    };
  },
  computed: {
    ...mapState(["contract", "ipfs"]),
    getProductList() {
      return this.productList;
    }
  },
  methods: {
    sellHandler(product) {
      this.currentProduct = product;
      this.isShowSellModal = true;
    },
    async loadShoesList() {
      let i;
      for (i = 0; i < this.productCount; i += 1) {
        const shoesId = await this.contract.methods
          .shoesInfoBeforeRegister(i)
          .call();

        if (shoesId == 0x0) {
          continue;
        }

        const shoes = await this.contract.methods.shoesList(shoesId).call();
        shoes.shoesId = shoesId;

        if (shoes.owner === this.$store.state.currentAccount) {
          this.productList.push(shoes);
        }
      }
    }
  },
  async created() {
    this.productCount = await this.contract.methods
      .shoesBeforeRegisterCount()
      .call();
    await this.loadShoesList();
  }
};
</script>

<style scoped>
.main-container {
  min-height: "100vh";
  width: "100%";
  background: "#F8F9FA";
}
.card-group {
  display: flex;
  justify-content: space-between;
}
.table-card {
  min-width: 1050px;
  margin-top: 35px;
  border-radius: 20px;
  background-color: #fff;
}
.table-hearder {
  font-size: 18px;
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px solid #a9a9a9;
}
.table-img {
  border-radius: 20px;
  width: 64px;
  height: 64px;
}
.table-content-container {
  margin-top: 20px;
  text-align: center;
}
.table-content {
  padding: 20px 10px 0 10px;
}
.add-product-container >>> .ivu-card-bordered {
  border: none;
}
.mg-t-n5 {
  margin-top: -5px;
}
</style>
