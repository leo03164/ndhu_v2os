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
          <Col span="4" class="table-hearder">Date</Col>
        </Row>
        <!-- set productList is computed -->
        <Row
          class="table-content-container"
          v-for="(product, index) in getProductList"
          :key="index"
        >
          <Col span="2">
            <img src="../assets/003.png" class="table-img" alt="" />
          </Col>
          <Col span="4" class="table-content">{{ product.SN }}</Col>
          <Col span="7" class="table-content">{{ product.name }}</Col>
          <Col span="3" class="table-content">{{ product.state }}</Col>
          <Col span="4" class="table-content">{{ product.bornFrom }}</Col>
          <Col span="4" class="table-content">{{ product.bornDate }}</Col>
        </Row>
        <CreateNewProductCard
          v-if="isFormShow"
          @close="isFormShow = false"
        ></CreateNewProductCard>

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
import SmallCard from "@/components/SmallCard.vue";
import CreateNewProductCard from "@/components/CreateNewProductCard.vue";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      shoes: {
        sn: "410421283",
        name: "Nike Air Force 1 GORE-TEX",
        state: "Comming",
        made: "Taiwan",
        date: "2020-03-16"
      },
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
      decodeInputArr: [
        {
          type: "bytes32",
          name: "id"
        },
        {
          type: "address",
          name: "who"
        }
      ],
      decodeTopics: [
        "0x6086c739621021f2c86f8ecdbb2ac8d30a0d87ba5574d12b5c5cadee0cd085de"
      ],
      eventLogDataArray: [],
      productList: [],
      maxLogs: 0
    };
  },
  computed: {
    ...mapState(["contract"]),
    getProductList() {
      return this.productList;
    },
    getLocalStorageData() {
      return localStorage.getItem("logsNum");
    }
  },
  methods: {
    ...mapActions(["initIPFS", "initContract", "initContractLogs"]),
    async toggoleFormShow() {
      this.isFormShow = !this.isFormShow;
    },
    //bytes32 id, address who
    async parserLog() {
      let i;
      const maxLogs = localStorage.getItem("logsNum");
      for (i = 0; i < maxLogs; i += 1) {
        const { id } = await web3.eth.abi.decodeLog(
          this.decodeInputArr,
          localStorage.getItem(i),
          this.decodeTopics
        );
        const {
          SN,
          name,
          state,
          bornFrom,
          bornDate
        } = await this.contract.methods.shoesList(id).call();
        this.productList.push({ SN, name, state, bornFrom, bornDate });
      }
    }
  },
  components: { SmallCard, CreateNewProductCard },
  async created() {
    await this.initIPFS();
    await this.initContract();
    await this.initContractLogs();
    await this.parserLog();
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
</style>
