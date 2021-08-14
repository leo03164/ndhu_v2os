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
        <Row
          class="table-content-container"
          v-for="index in cardData[1].number"
          :key="index"
        >
          <Col span="2">
            <img src="../assets/003.png" class="table-img" alt="" />
          </Col>
          <Col span="4" class="table-content">{{ shoes.sn }}</Col>
          <Col span="7" class="table-content">{{ shoes.name }}</Col>
          <Col span="3" class="table-content">{{ shoes.state }}</Col>
          <Col span="4" class="table-content">{{ shoes.made }}</Col>
          <Col span="4" class="table-content">{{ shoes.date }}</Col>
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
          number: 5
        },
        {
          title: "Selled",
          number: 20
        }
      ]
    };
  },
  methods: {
    addCount() {
      this.cardData[1].number++;
    }
  },
  components: { SmallCard }
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
</style>
