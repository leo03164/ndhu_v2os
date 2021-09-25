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
        <SmallCard :title="'經銷商上限'" :number="100"> </SmallCard>
        <SmallCard :title="'今日新增'" :number="distributorCount"> </SmallCard>
      </div>

      <div class="table-card">
        <Row>
          <Col span="2" class="table-hearder"></Col>
          <Col span="4" class="table-hearder">UID</Col>
          <Col span="7" class="table-hearder">Eth Address</Col>
          <Col span="4" class="table-hearder">Country</Col>
          <Col span="4" class="table-hearder">Date</Col>
        </Row>
        <Row
          class="table-content-container"
          v-for="(distributor, index) in distributorList"
          :key="'distributor' + index"
        >
          <Col span="2">
            <img src="../assets/003.png" class="table-img" alt="" />
          </Col>
          <Col span="4" class="table-content">{{ distributor.UID }}</Col>
          <Col span="7" class="table-content">{{ distributor.ethAddress }}</Col>
          <Col span="4" class="table-content">{{ distributor.country }}</Col>
          <Col span="4" class="table-content">{{ distributor.bornDate }}</Col>
        </Row>
        <Row class="table-content-container">
          <Col span="2">
            <Icon type="md-add-circle" size="64" @click="isFormShow = true" />
          </Col>
        </Row>
      </div>
    </Card>

    <AddAccountCard
      v-if="isFormShow"
      @close="isFormShow = false"
      :title="'distributor'"
      @submit="addShoesDistributor"
    ></AddAccountCard>
  </div>
</template>
<script>
import SmallCard from "@/ui-components/SmallCard.vue";
import AddAccountCard from "@/global-components/AddAccountCard.vue";
import { mapState } from "vuex";

export default {
  name: "addDistributor",
  data() {
    return {
      isFormShow: false,
      distributorCount: 0,
      distributorList: [],
      // need to change here
      eventParserMethodSignature: [
        {
          type: "string",
          name: "UID"
        },
        {
          type: "address",
          name: "distributor"
        },
        {
          type: "string",
          name: "country"
        },
        {
          type: "uint256",
          name: "bornDate"
        }
      ],
      decodeTopics:
        "0xfc6e7d040a8092cf9d77373a8532258ad9b19d874605c3ee5d8b2a9330559b1e"
    };
  },
  computed: {
    ...mapState(["contract"])
  },
  components: {
    SmallCard,
    AddAccountCard
  },
  methods: {
    async addShoesDistributor(formItem) {
      try {
        // set type 0x2 because of EIP1599
        await this.contract.methods
          .addShoesDistributor(formItem.UID, formItem.address, formItem.country)
          .send({ type: "0x2" });
      } catch (error) {
        console.log(error);
      }
    },
    // 可以再精簡
    async parserLog() {
      let i;
      const maxLogs = localStorage.getItem("logsNum");

      // decode data from localstorage
      for (i = 0; i < maxLogs; i += 1) {
        const logData = JSON.parse(localStorage.getItem(i));

        // check the event that is we want
        if (!logData.topics.includes(this.decodeTopics)) {
          continue;
        }

        // decode event and get product id
        const {
          UID,
          distributor,
          country,
          bornDate
        } = await web3.eth.abi.decodeLog(
          this.eventParserMethodSignature,
          logData.data,
          logData.topics
        );

        const newDistributor = {};
        newDistributor.UID = UID;
        newDistributor.ethAddress = distributor;
        newDistributor.country = country;
        newDistributor.bornDate = bornDate;

        this.distributorList.push(newDistributor);
        this.distributorCount++;
      }
    }
  },
  async created() {
    await this.parserLog();
  }
};
</script>

<style lang="postcss" scoped>
.small-card {
  min-width: 330px;
  min-height: 184px;
  border-radius: 30px;
  background-color: #fff;
}
.card-group {
  display: flex;
  justify-content: space-evenly;
}
.small-card-title {
  font-size: 24px;
  color: #a9a9a9;
  margin: 0.75rem 0 0 2rem;
}
.small-card-content {
  font-size: 64px;
  color: #000000;
  text-align: center;
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
  text-overflow: ellipsis;
  overflow: hidden;
}
.add-product-container >>> .ivu-card-bordered {
  border: none;
}
</style>
