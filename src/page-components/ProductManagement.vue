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
      <div class="searchBlock">
        <Input
          search
          @on-search="searchHandler()"
          @on-click="isShowQrcodeScannerHandler"
          icon="md-camera ivu-input-icon"
          enter-button="Search"
          placeholder="Please input shoesId here..."
          v-model="searchId"
        />
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
        <!-- register -->
        <ActionSheet
          v-if="isRegisterFormShow"
          @close="isRegisterFormShow = false"
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

        <!-- transfer -->
        <Transfer
          v-if="isTransferFormShow"
          :product="currentProduct"
          @close="isTransferFormShow = false"
        >
        </Transfer>
      </div>
      <QrcodeScanner
        :isShowQrcodeScanner="isQrcodeScannerEnable"
        @finished="decodeFinished"
      >
      </QrcodeScanner>
    </Card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SmallCard from "@/ui-components/SmallCard.vue";
import ActionSheet from "@/ui-components/ActionSheet.vue";
import Transfer from "@/global-components/Transfer.vue";
import { stateDescription } from "@/constant.json";
import QrcodeScanner from "@/global-components/QrcodeScanner.vue";

export default {
  components: { SmallCard, ActionSheet, Transfer, QrcodeScanner },
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
      isRegisterFormShow: false,
      isTransferFormShow: false,
      productList: [],
      currentProduct: {},
      registerKey: "",
      shoesId: "",
      shoesCount: 0,
      shoesIds: [],
      stateDescription,
      searchId: "",
      isQrcodeScannerEnable: false
    };
  },
  computed: {
    ...mapState(["contract", "ipfs", "currentAccount"]),
    getProductList() {
      return this.productList;
    }
  },
  methods: {
    async registerProduct() {
      try {
        if (this.shoesId !== "") {
          await this.contract.methods
            .registerShoes(this.shoesId, this.registerKey, "Taiwan")
            .send({ type: "0x2" });
          this.isRegisterFormShow = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async transferHandler(product) {
      this.currentProduct = product;
      this.isTransferFormShow = true;
    },
    async initProductList() {
      this.shoesCount = await this.contract.methods
        .customerShoesCount(this.currentAccount)
        .call();

      let i;
      for (i = 0; i < this.shoesCount; i++) {
        const customerShoesId = await this.contract.methods
          .customerShoesIds(this.currentAccount, i)
          .call();
        if (customerShoesId == 0x0) {
          continue;
        }
        this.shoesIds.push(customerShoesId);
      }

      let shoesListPromiseArr = [];
      for (i = 0; i < this.shoesIds.length; i++) {
        shoesListPromiseArr.push(
          this.contract.methods.shoesList(this.shoesIds[i]).call()
        );
      }
      this.productList = await Promise.all(shoesListPromiseArr);
    },
    async searchHandler() {
      this.isRegisterFormShow = true;
      this.shoesId = this.searchId;
      this.searchId = "";
    },
    async isShowQrcodeScannerHandler() {
      this.isQrcodeScannerEnable = !this.isQrcodeScannerEnable;
    },
    async decodeFinished(result) {
      this.shoesId = result;
      this.isQrcodeScannerEnable = false;
      this.isRegisterFormShow = true;
    }
  },
  async created() {
    await this.initProductList();
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
.searchBlock {
  margin-top: 25px;
  padding: 0 20%;
}
.searchBlock >>> .ivu-input-icon {
  right: 80px !important;
}
.searchBlock >>> .ivu-input-icon:hover {
  cursor: pointer !important;
}
</style>
