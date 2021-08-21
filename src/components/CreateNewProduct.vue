<template>
  <div class="createFormContainer">
    <Form :model="formItem" :label-width="80">
      <div class="upload-container">
        <Upload></Upload>
      </div>
      <div class="input-form">
        <FormItem label="SN">
          <Input v-model="formItem.sn" placeholder="Enter product sn"></Input>
        </FormItem>
        <FormItem label="Name">
          <Input
            v-model="formItem.name"
            placeholder="Enter product name"
          ></Input>
        </FormItem>
        <FormItem label="Company">
          <Select
            v-model="formItem.company"
            filterable
            placeholder="Select product company"
            not-found-text="Company not found"
          >
            <Option v-for="data in companyList" :key="data" :value="data">{{
              data
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="Country">
          <Select
            v-model="formItem.country"
            filterable
            placeholder="Select product country"
            not-found-text="Country not found"
          >
            <Option v-for="data in countryList" :key="data" :value="data">{{
              data
            }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <div class="button-group">
            <Button type="primary" @click="createProduct">Submit</Button>
            <Button style="margin-left: 8px" @click="cancel">Cancel</Button>
          </div>
        </FormItem>
      </div>
    </Form>
  </div>
</template>
<script>
import company from "../shoes/company.json";
import contry from "../shoes/country.json";
import Upload from "./Upload.vue";

export default {
  data() {
    return {
      companyList: company,
      countryList: contry,
      formItem: {
        sn: "",
        name: "",
        company: "",
        country: "",
        date: 0
      },
      contract: {}
    };
  },
  components: {
    Upload
  },
  methods: {
    async createProduct() {
      this.formItem.date = Number(Date.now() % 1000000000);
      await this.contract.methods
        .addShoes(
          this.formItem.sn,
          this.formItem.name,
          this.formItem.company,
          this.formItem.country,
          this.formItem.date
        )
        .send({ from: "0x4a9A76338844B9124e2aE4237ee40Db95452fe22" });
    },
    async cancel() {
      this.$emit("close");
    }
  },
  async created() {
    // wait metamask update call->ok send->can't
    this.contract = await this.$contract.init();
    const accounts = await web3.eth.getAccounts();
    this.contract.options.gas = "30000";
    web3.eth.Contract.defaultAccount = accounts[0];
  }
};
</script>
<style lang="postcss" scoped>
.createFormContainer {
  width: 450px;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 50px;

  position: fixed;
  left: calc(100vh - 450px / 2);
  top: 15vh;
  float: left;

  z-index: 999px;
  background-color: #fff;

  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.3);
}
.input-form {
  margin-top: 20px;
}
.upload-container {
  width: 100%;
  height: 150px;
  /* border-bottom: 1px solid #707070; */
  box-shadow: 2px 3px 5px 0px #e2e2e2;
}
.button-group {
  display: flex;
  justify-content: flex-end;
}
</style>
