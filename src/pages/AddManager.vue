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

        <SmallCard :title="'今日新增'" :number="count"> </SmallCard>
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
          v-for="index in count"
          :key="index"
        >
          <Col span="2">
            <img src="../assets/003.png" class="table-img" alt="" />
          </Col>
          <Col span="4" class="table-content">{{ distributor.id }}</Col>
          <Col span="7" class="table-content">{{
            distributor.eth_address
          }}</Col>
          <Col span="4" class="table-content">{{ distributor.country }}</Col>
          <Col span="4" class="table-content">{{ distributor.date }}</Col>
        </Row>
        <Row class="table-content-container">
          <Col span="2">
            <Icon type="md-add-circle" size="64" @click="addCount" />
          </Col>
        </Row>
      </div>
    </Card>
  </div>
</template>
<script>
import SmallCard from "@/components/SmallCard.vue";

export default {
  name: "AddManager",
  data() {
    return {
      distributor: {
        id: "610921203",
        eth_address: "0x4a9A76338844B9124e2aE4237ee40Db95452fe22",
        state: "checking",
        country: "Taiwan",
        date: "2020-03-16"
      },
      shoes: {
        sn: "410421283",
        name: "Nike Air Force 1 GORE-TEX",
        state: "Comming",
        made: "Taiwan",
        date: "2020-03-16"
      },
      count: 5
    };
  },
  components: {
    SmallCard
  },
  methods: {
    addCount() {
      this.count++;
    }
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
