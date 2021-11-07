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
      <div class="searchBlock">
        <Input
          search
          @on-search="searchHandler()"
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
        <!-- shoes data preview -->
        <Row
          class="table-content-container"
          v-for="shoesData in shoesList"
          :key="shoesData.SN"
        >
          <Col span="2">
            <img
              :src="`https://ipfs.io/ipfs/${shoesData.CID}`"
              class="table-img"
              alt=""
            />
          </Col>
          <Col span="4" class="table-content">{{ shoesData.SN }}</Col>
          <Col span="7" class="table-content">{{ shoesData.name }}</Col>
          <Col span="3" class="table-content">{{
            stateDescription[shoesData.state]
          }}</Col>
          <Col span="4" class="table-content">{{ shoesData.bornFrom }}</Col>
          <Col span="4" class="table-content mg-t-n5">
            <Button
              @click="showReportReasonModal(shoesData)"
              class="margin-normal"
              >檢視原因</Button
            >
          </Col>
        </Row>
      </div>
    </Card>
    <Modal
      v-model="isShowReportReason"
      @on-ok="addToBlackList"
      @on-cancel="cancel"
    >
      <div class="modal-container" v-if="isShowReportReason">
        <div class="img-block">
          <img
            :src="`https://ipfs.io/ipfs/${shoesData.imagePath}`"
            width="200px"
            height="200px"
            alt=""
          />
        </div>
        <div class="info-block">
          <p class="info-block-text">Report reason：{{ shoesData.reason }}</p>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import SmallCard from "@/ui-components/SmallCard.vue";
import ImageUpload from "@/global-components/ImageUpload.vue";
import { stateDescription } from "@/constant.json";
import { mapState } from "vuex";
import { getShoesIdByAttribute } from "@/utils";

export default {
  components: { SmallCard, ImageUpload },
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
      searchId: "",
      shoesData: {},
      shoesList: [],
      stateDescription,
      isShowReportReason: false,
      isShowData: false,
      imageIpfsPath: ""
    };
  },
  computed: {
    ...mapState(["contract"])
  },
  methods: {
    async searchHandler() {
      this.shoesData = await this.contract.methods
        .shoesList(this.searchId)
        .call();
      this.isShowData = true;
    },
    cancel() {
      this.isShowReportReason = false;
    },
    showReportReasonModal(shoesData) {
      this.shoesData = shoesData;
      this.isShowReportReason = true;
    },
    setImageIpfsPath(path) {
      this.imageIpfsPath = path;
    },
    async addToBlackList() {
      await this.contract.methods
        .addToBlackList(this.shoesData.shoesId, this.shoesData.reason)
        .send({ type: "0x2" });
    },
    async getReportList() {
      // use this method getShoesIdByAttribute to instead
      const shoesIds = await this.contract.methods.getShoesReportList().call();

      let i;
      for (i = 0; i < shoesIds.length; i += 1) {
        const shoes = await this.contract.methods.shoesList(shoesIds[i]).call();

        shoes.shoesId = getShoesIdByAttribute(
          shoes.SN,
          shoes.name,
          shoes.company
        );

        const {
          imagePath,
          reason
        } = await this.contract.methods.getReportReason(shoesIds[i]).call();
        shoes.imagePath = imagePath;
        shoes.reason = reason;
        if (shoes.SN !== "") {
          this.shoesList.push(shoes);
        }
      }
    }
  },
  async created() {
    await this.getReportList();
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
.mg-t-n5 {
  margin-top: -5px;
}
.searchBlock {
  margin-top: 25px;
  padding: 0 20%;
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
.margin-normal {
  margin-left: 10px;
}
.upload-container {
  width: 150px;
  /* height: 150px; */
  box-shadow: 2px 3px 5px 0px #e2e2e2;
}
.reason-container {
  width: 100%;
  box-shadow: 2px 3px 5px 0px #e2e2e2;
}
.report-block {
  width: 100%;
  display: flex;
  padding: 20px;
}
.report-reason-block {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
.report-reason-title {
  width: 100%;
  height: 20px;
}
</style>
