<template>
  <div class="add-product-container">
    <Card class="main-container">
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
          <Col span="3" class="table-hearder">Action</Col>
        </Row>
        <Row
          class="table-content-container"
          v-for="(distributor, index) in distributorList"
          :key="'distributor' + index"
        >
          <Col span="2">
            <img
              :src="`https://ipfs.io/ipfs/${distributor.avatar}`"
              class="table-img"
              alt=""
            />
          </Col>
          <Col span="4" class="table-content">{{ distributor.UID }}</Col>
          <Col span="7" class="table-content">{{
            distributor.chainAddress
          }}</Col>
          <Col span="4" class="table-content">{{ distributor.country }}</Col>
          <Col span="4" class="table-content">{{ distributor.bornDate }}</Col>
          <Col span="3" class="table-content mg-t-n5">
            <Button @click="blockShoesDistributor(distributor)">封鎖</Button>
          </Col>
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
import { mapState, mapActions } from "vuex";
import { timestampToDate } from "@/utils";

export default {
  name: "addDistributor",
  data() {
    return {
      isFormShow: false,
      distributorCount: 0,
      distributorList: []
    };
  },
  watch: {
    distributorList: {
      handler: function (newValue) {
        this.updateDistributorList(this.distributorList);
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapState(["contract"])
  },
  components: {
    SmallCard,
    AddAccountCard
  },
  methods: {
    ...mapActions(["updateDistributorList"]),
    async addShoesDistributor(formItem) {
      try {
        // set type 0x2 because of EIP1599
        await this.contract.methods
          .addShoesDistributor(
            formItem.avatarPath,
            formItem.UID,
            formItem.address,
            formItem.country
          )
          .send({ type: "0x2" });
      } catch (error) {
        console.log(error);
      }
    },
    async loadDistributorData() {
      if (this.distributorCount === 0) {
        return;
      }

      let i;
      let distributorIds = [];
      let distributorIdsPromiseArr = [];

      for (i = 0; i < this.distributorCount; i += 1) {
        distributorIdsPromiseArr.push(
          this.contract.methods.distributorArray(i).call()
        );
      }
      distributorIds = await Promise.all(distributorIdsPromiseArr);

      for (i = 0; i < distributorIds.length; i += 1) {
        const distributorInfo = await this.contract.methods
          .distributorList(distributorIds[i])
          .call();

        if (distributorInfo.isBan === false) {
          distributorInfo.bornDate = timestampToDate(distributorInfo.bornDate);
          this.distributorList.push(distributorInfo);
        }
      }
    },
    async blockShoesDistributor(distributor) {
      await this.contract.methods
        .delShoesDistributor(distributor.chainAddress)
        .send({ type: "0x2" });
    }
  },
  async created() {
    this.distributorCount = Number(
      await this.contract.methods.distributorCount().call()
    );
    await this.loadDistributorData();
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
</style>
