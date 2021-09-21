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
        <SmallCard :title="'管理員總數'" :number="100"> </SmallCard>
        <SmallCard :title="'今日新增'" :number="managerCount"> </SmallCard>
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
          v-for="(manager, index) in managerList"
          :key="'manager' + index"
        >
          <Col span="2">
            <img src="../assets/003.png" class="table-img" alt="" />
          </Col>
          <Col span="4" class="table-content">{{ manager.UID }}</Col>
          <Col span="7" class="table-content">{{ manager.ethAddress }}</Col>
          <Col span="4" class="table-content">{{ manager.country }}</Col>
          <Col span="4" class="table-content">{{ manager.bornDate }}</Col>
        </Row>
        <Row class="table-content-container">
          <Col span="2">
            <Icon type="md-add-circle" size="64" @click="isFormShow = true" />
          </Col>
        </Row>
      </div>
    </Card>

    <ItemCard v-if="isFormShow" @close="isFormShow = false"></ItemCard>
  </div>
</template>
<script>
import SmallCard from "@/components/SmallCard.vue";
import ItemCard from "@/components/ItemCard.vue";
import { mapActions } from "vuex";

export default {
  name: "AddManager",
  data() {
    return {
      isFormShow: false,
      managerCount: 0,
      managerList: [],
      eventParserMethodSignature: [
        {
          type: "string",
          name: "UID"
        },
        {
          type: "address",
          name: "manager"
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
        "0x78aa96c6058bebd04e5a6e04045c27bb203e090e27a0d222dfcec95ac3f4438f"
    };
  },
  components: {
    SmallCard,
    ItemCard
  },
  methods: {
    ...mapActions(["initIPFS", "initContract", "initContractLogs"]),
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
          manager,
          country,
          bornDate
        } = await web3.eth.abi.decodeLog(
          this.eventParserMethodSignature,
          logData.data,
          logData.topics
        );

        const newManager = {};
        newManager.UID = UID;
        newManager.ethAddress = manager;
        newManager.country = country;
        newManager.bornDate = bornDate;

        this.managerList.push(newManager);
        this.managerCount++;
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
