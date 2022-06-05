<template>
  <div class="add-product-container">
    <Card class="main-container">
      <div class="card-group">
        <SmallCard :title="'管理員上限'" :number="100"> </SmallCard>
        <SmallCard :title="'今日新增'" :number="managerCount"> </SmallCard>
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
          v-for="(manager, index) in managerList"
          :key="'manager' + index"
        >
          <Col span="2">
            <img
              :src="`https://ipfs.io/ipfs/${manager.avatar}`"
              class="table-img"
              alt=""
            />
          </Col>
          <Col span="4" class="table-content">{{ manager.UID }}</Col>
          <Col span="7" class="table-content">{{ manager.chainAddress }}</Col>
          <Col span="4" class="table-content">{{ manager.country }}</Col>
          <Col span="4" class="table-content">{{ manager.bornDate }}</Col>
          <Col span="3" class="table-content mg-t-n5">
            <Button @click="blockShoesManager(manager)">封鎖</Button>
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
      @submit="addShoesManager"
      :title="'manager'"
    ></AddAccountCard>
  </div>
</template>
<script>
import SmallCard from "@/ui-components/SmallCard.vue";
import AddAccountCard from "@/global-components/AddAccountCard.vue";
import { mapState } from "vuex";
import { timestampToDate } from "@/utils";

export default {
  name: "AddManager",
  data() {
    return {
      isFormShow: false,
      managerCount: 0,
      managerList: []
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
    async addShoesManager(formItem) {
      try {
        // set type 0x2 because of EIP1599
        await this.contract.methods
          .addShoesManager(
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
    async loadManagerData() {
      if (this.managerCount === 0) {
        return;
      }

      let i;
      let managerIds = [];
      let managerIdsPromiseArr = [];

      for (i = 0; i < this.managerCount; i += 1) {
        managerIdsPromiseArr.push(this.contract.methods.managerArray(i).call());
      }
      managerIds = await Promise.all(managerIdsPromiseArr);

      for (i = 0; i < managerIds.length; i += 1) {
        const managerInfo = await this.contract.methods
          .managerList(managerIds[i])
          .call();

        if (managerInfo.isBan === false) {
          managerInfo.bornDate = timestampToDate(managerInfo.bornDate);
          this.managerList.push(managerInfo);
        }
      }
    },
    async blockShoesManager(manager) {
      await this.contract.methods
        .delShoesManager(manager.chainAddress)
        .send({ type: "0x2" });
    }
  },
  async created() {
    this.managerCount = Number(
      await this.contract.methods.managerCount().call()
    );
    await this.loadManagerData();
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
.mg-t-n5 {
  margin-top: -5px;
}
</style>
