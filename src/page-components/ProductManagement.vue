<template>
  <div class="add-product-container">
    <Card
      class="main-container"
      :style="{
        minHeight: '100vh',
        width: '100%',
        background: '#F8F9FA'
      }"
    >
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
            <Button @click="transferHandler(product)">轉移</Button>
          </Col>
        </Row>
        <ActionSheet
          v-if="isFormShow"
          @close="isFormShow = false"
          @submit="registerProduct"
          :title="'Prodcut Register'"
        >
          <FormItem label="Shoes Id">
            <Input v-model="shoesId" :placeholder="`Enter shoes id`"></Input>
          </FormItem>
          <FormItem label="Key">
            <Input
              v-model="registerKey"
              :placeholder="`Enter item register key`"
            ></Input>
          </FormItem>
        </ActionSheet>
        <Icon
          type="md-add-circle"
          class="add-icon"
          size="64"
          @click="toggoleFormShow"
        />
      </div>
    </Card>
  </div>
</template>
<script>
import SmallCard from "@/ui-components/SmallCard.vue";
import ActionSheet from "@/ui-components/ActionSheet.vue";
import { mapState } from "vuex";
import { stateDescription } from "@/constant.json";

export default {
  components: { SmallCard, ActionSheet },
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
      isFormShow: false,
      productList: [],
      currentProduct: {},
      registerKey: "",
      shoesId: "",
      shoesCount: 0,
      shoesIds: []
    };
  },
  computed: {
    ...mapState(["contract", "ipfs", "currentAccount"]),
    getProductList() {
      return this.productList;
    }
  },
  methods: {
    async toggoleFormShow() {
      this.isFormShow = !this.isFormShow;
    },
    async registerProduct() {
      try {
        if (this.shoesId !== "") {
          await this.contract.methods
            .registerShoes(this.shoesId, this.registerKey, "Taiwan")
            .send({ type: "0x2" });
          this.isFormShow = false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  async transferHandler() {},
  async created() {
    this.shoesCount = await this.contract.methods
      .customerShoesCount(this.currentAccount)
      .call();

    let i;
    let shoesIdsPromiseArr = [];
    for (i = 0; i < this.shoesCount; i++) {
      shoesIdsPromiseArr.push(
        this.contract.methods.customerShoesIds(this.currentAccount, i).call()
      );
    }
    this.shoesIds = await Promise.all(shoesIdsPromiseArr);

    let shoesListPromiseArr = [];
    for (i = 0; i < this.shoesCount; i++) {
      shoesListPromiseArr.push(
        this.contract.methods.shoesList(this.shoesIds[i]).call()
      );
    }
    this.productList = await Promise.all(shoesListPromiseArr);
  }
};
</script>

<style lang="postcss" scoped>
.card-group {
  display: flex;
  justify-content: space-between;
}
.table-card {
  min-width: 1050px;
  /* min-height: 740px; */
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
.add-icon {
  position: fixed;
  bottom: 10px;
  right: 30px;
  opacity: 0.5;
}
.add-icon:hover {
  transition: all 0.2s ease-in-out;
  opacity: 1;
}
.mg-t-n5 {
  margin-top: -5px;
}
</style>
