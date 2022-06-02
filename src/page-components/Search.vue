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
          @on-click="isShowQrcodeScannerHandler"
          icon="md-camera ivu-input-icon"
          enter-button="Search"
          placeholder="Please input shoesId here..."
          v-model="searchId"
        />
      </div>
      <div class="table-card">
        <!-- table header -->
        <Row>
          <Col span="2" class="table-hearder"></Col>
          <Col span="4" class="table-hearder">SN</Col>
          <Col span="7" class="table-hearder">Name</Col>
          <Col span="3" class="table-hearder">State</Col>
          <Col span="4" class="table-hearder">Made</Col>
          <Col span="4" class="table-hearder">Action</Col>
        </Row>
        <!-- shoes data preview -->
        <Row class="table-content-container" v-if="isShowSearchData">
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
            <Button @click="showShoesDetailModal" class="margin-normal"
              >檢視</Button
            >
            <Button type="error" @click="showReportModal" class="margin-normal"
              >檢舉</Button
            >
          </Col>
        </Row>
      </div>
    </Card>
    <!-- show product detail -->
    <Modal
      v-model="isShowDetail"
      @on-ok="closeShoesDetailPage"
      @on-cancel="closeShoesDetailPage"
    >
      <div class="modal-container" v-if="isShowDetail">
        <div class="img-block">
          <img
            :src="`https://ipfs.io/ipfs/${shoesData.CID}`"
            width="200px"
            height="200px"
            alt=""
          />
        </div>
        <div class="info-block">
          <p class="info-block-text">Product SN：{{ shoesData.SN }}</p>
          <p class="info-block-text">Product Name：{{ shoesData.name }}</p>
          <p class="info-block-text">
            Product Company：{{ shoesData.company }}
          </p>
          <p class="info-block-text">
            Product State：{{ stateDescription[shoesData.state] }}
          </p>
          <p class="info-block-text">Product Owner：{{ shoesData.owner }}</p>
          <p class="info-block-text">
            Product Last Location：{{ shoesData.lastBuyerLocation }}
          </p>
          <p class="info-block-text">Made In：{{ shoesData.bornFrom }}</p>
        </div>
      </div>
    </Modal>
    <!-- show report page -->
    <Modal
      v-model="isShowReportPage"
      @on-ok="report"
      @on-cancel="isShowReportPage = false"
    >
      <div class="report-block">
        <div class="upload-container">
          <ImageUpload @setImageIpfsPath="setImageIpfsPath"></ImageUpload>
        </div>

        <div class="report-reason-block">
          <p class="report-reason-title">檢舉原因</p>
          <Input
            v-model="reportReason"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="Enter your reson"
            style="width: 100%;"
          ></Input>
        </div>
      </div>
    </Modal>

    <QrcodeScanner
      :isShowQrcodeScanner="isQrcodeScannerEnable"
      @finished="decodeFinished"
    >
    </QrcodeScanner>
  </div>
</template>
<script>
import SmallCard from "@/ui-components/SmallCard.vue";
import ImageUpload from "@/global-components/ImageUpload.vue";
import { stateDescription } from "@/constant.json";
import { mapState } from "vuex";
import QrcodeScanner from "@/global-components/QrcodeScanner.vue";

export default {
  components: { SmallCard, ImageUpload, QrcodeScanner },
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
      stateDescription,
      isShowDetail: false,
      isShowSearchData: false,
      isShowReportPage: false,
      imageIpfsPath: "",
      reportReason: "",
      isQrcodeScannerEnable: false
    };
  },
  computed: {
    ...mapState(["contract", "ipfs"]),
    currentIcon() {
      return this.isQrcodeScannerEnable ? "md-camera" : "ios-eye-off";
    }
  },
  methods: {
    async searchHandler() {
      this.shoesData = await this.contract.methods
        .shoesList(this.searchId)
        .call();
      this.shoesData.shoesId = this.searchId;
      this.searchId = "";
      this.isShowSearchData = true;
    },
    closeShoesDetailPage() {
      this.isShowDetail = false;
    },
    showShoesDetailModal() {
      this.isShowDetail = true;
    },
    showReportModal() {
      this.isShowReportPage = true;
    },
    setImageIpfsPath(path) {
      this.imageIpfsPath = path;
    },
    async report() {
      await this.contract.methods
        .reportShoes(
          this.shoesData.shoesId,
          this.imageIpfsPath,
          this.reportReason
        )
        .send({ type: "0x2" });
    },
    async isShowQrcodeScannerHandler() {
      this.isQrcodeScannerEnable = !this.isQrcodeScannerEnable;
    },
    async decodeFinished(result) {
      this.searchId = result;
      this.isQrcodeScannerEnable = false;
      await this.searchHandler();
    }
  }
};
</script>

<style scoped>
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
.searchBlock >>> .ivu-input-icon {
  right: 80px !important;
}
.searchBlock >>> .ivu-input-icon:hover {
  cursor: pointer !important;
}
</style>
