<template>
  <div class="create-form-container">
    <Form :model="formItem" :label-width="80">
      <div class="upload-container">
        <ImageUpload @setImageIpfsPath="setImageIpfsPath"></ImageUpload>
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
            <Option
              v-for="company in companyList"
              :key="company"
              :value="company"
              >{{ company }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="Country">
          <Select
            v-model="formItem.country"
            filterable
            placeholder="Select product country"
            not-found-text="Country not found"
          >
            <Option
              v-for="country in countryList"
              :key="country"
              :value="country"
              >{{ country }}</Option
            >
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
import company from "@/assets/shoes/company.json";
import country from "@/assets/shoes/country.json";
import ImageUpload from "@/global-components/ImageUpload.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      companyList: company,
      countryList: country,
      formItem: {
        sn: "",
        name: "",
        company: "",
        country: ""
      },
      imgPath: ""
    };
  },
  computed: {
    ...mapState(["contract"])
  },
  components: {
    ImageUpload
  },
  methods: {
    async createProduct() {
      try {
        // set type 0x2 because of EIP1599
        const shoesId = await this.contract.methods
          .addShoes(
            this.imgPath,
            this.formItem.sn,
            this.formItem.name,
            this.formItem.company,
            this.formItem.country
          )
          .send({ type: "0x2" });
        console.log("ShoesId: ", shoesId);
        this.$emit("close");
      } catch (error) {
        console.log(error);
      }
    },
    cancel() {
      this.$emit("close");
    },
    setImageIpfsPath(path) {
      this.imgPath = path;
    }
  }
};
</script>
<style scoped>
.create-form-container {
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
  box-shadow: 2px 3px 5px 0px #e2e2e2;
}
.button-group {
  display: flex;
  justify-content: flex-end;
}
</style>
