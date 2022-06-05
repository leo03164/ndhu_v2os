<template>
  <div class="add-product-container">
    <Card class="main-container">
      <div class="card-group">
        <SmallCard :title="'目前總數'" :number="100"> </SmallCard>
        <SmallCard :title="'今日新增'" :number="blackListCounter"> </SmallCard>
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
        <Row
          class="table-content-container"
          v-for="(product, index) in shoesBlackList"
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
            <Button @click="showShoesDetailModal(product)">檢視</Button>
          </Col>
        </Row>
      </div>
      <Modal
        v-model="isShowShoesDetailPage"
        @on-ok="closeShoesDetailPage"
        @on-cancel="closeShoesDetailPage"
      >
        <div class="modal-container" v-if="isShowShoesDetailPage">
          <div class="img-block">
            <img
              :src="`https://ipfs.io/ipfs/${selectedShoesData.CID}`"
              width="200px"
              height="200px"
              alt=""
            />
          </div>
          <div class="info-block">
            <p class="info-block-text">
              Product SN：{{ selectedShoesData.SN }}
            </p>
            <p class="info-block-text">
              Product Name：{{ selectedShoesData.name }}
            </p>
            <p class="info-block-text">
              Product Company：{{ selectedShoesData.company }}
            </p>
            <p class="info-block-text">
              Product State：{{ stateDescription[selectedShoesData.state] }}
            </p>
            <p class="info-block-text">
              Product Owner：{{ selectedShoesData.owner }}
            </p>
            <p class="info-block-text">
              Product Last Location：{{ selectedShoesData.lastBuyerLocation }}
            </p>
            <p class="info-block-text">
              Made In：{{ selectedShoesData.bornFrom }}
            </p>
          </div>
        </div>
      </Modal>
    </Card>
  </div>
</template>
<script>
import SmallCard from "@/ui-components/SmallCard.vue";
import { mapState } from "vuex";
import { stateDescription } from "@/constant.json";

export default {
  data() {
    return {
      blackListCounter: 0,
      shoesBlackList: [],
      stateDescription,
      isShowShoesDetailPage: false,
      selectedShoesData: {}
    };
  },
  computed: {
    ...mapState(["contract"])
  },
  components: {
    SmallCard
  },
  methods: {
    async loadBlackList() {
      this.blackListCounter = await this.contract.methods
        .shoesBlockCounter()
        .call();

      let i;
      let blackListIds = [];
      let promiseArr = [];
      for (i = 0; i < this.blackListCounter; i += 1) {
        promiseArr.push(this.contract.methods.shoesBlackList(i).call());
      }

      blackListIds = await Promise.all(promiseArr);

      promiseArr = [];
      for (i = 0; i < blackListIds.length; i += 1) {
        promiseArr.push(
          this.contract.methods.shoesList(blackListIds[i]).call()
        );
      }

      this.shoesBlackList = await Promise.all(promiseArr);
    },
    showShoesDetailModal(product) {
      this.selectedShoesData = product;
      this.isShowShoesDetailPage = true;
    },
    closeShoesDetailPage() {
      this.isShowShoesDetailPage = false;
    }
  },
  async created() {
    await this.loadBlackList();
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
  justify-content: space-evenly;
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
  text-overflow: ellipsis;
  overflow: hidden;
}
.add-product-container >>> .ivu-card-bordered {
  border: none;
}
.mg-t-n5 {
  margin-top: -5px;
}
.modal-container {
  width: 100%;
  display: flex;
}
.info-block {
  padding: 0 20px;
}
.info-block-text {
  word-break: break-all;
  line-height: 2;
}
</style>
