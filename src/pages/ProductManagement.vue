<template>
  <div class="layout">
    <Card
      class="main-container"
      :style="{
        minHeight: '1024px',
        minWidth: '1100px',
        background: '#F8F9FA'
      }"
    >
      <div class="card-group">
        <div class="small-card">
          <div class="small-card-title">
            Total
          </div>
          <div class="small-card-content">
            100
          </div>
        </div>
        <div class="small-card">
          <div class="small-card-title">
            New
          </div>
          <div class="small-card-content">
            {{ count }}
          </div>
        </div>
        <div class="small-card">
          <div class="small-card-title">
            Selled
          </div>
          <div class="small-card-content">
            20
          </div>
        </div>
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
          v-for="index in count"
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
      count: 5
    };
  },
  methods: {
    addCount() {
      this.count++;
    }
  },
  component: {}
};
</script>

<style lang="postcss" scoped>
.layout {
  max-width: 1440px;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.small-card {
  min-width: 330px;
  min-height: 184px;
  border-radius: 30px;
  background-color: #fff;
}
.card-group {
  display: flex;
  justify-content: space-between;
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
.main-container >>> .ivu-card-body {
  padding: 25px;
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
</style>
