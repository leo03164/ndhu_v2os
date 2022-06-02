<template>
  <div class="createFormContainer">
    <div class="formTitle">Add new {{ title }}</div>
    <Form :model="formItem" :label-width="80">
      <div class="upload-container">
        <ImageUpload @setImageIpfsPath="setImageIpfsPath"></ImageUpload>
      </div>
      <div class="input-form">
        <FormItem label="UID">
          <Input
            v-model="formItem.UID"
            :placeholder="`Enter ${title} UID`"
          ></Input>
        </FormItem>
        <FormItem label="Address">
          <Input
            v-model="formItem.address"
            :placeholder="`Enter ${title} address`"
          ></Input>
        </FormItem>
        <FormItem label="Country">
          <Select
            v-model="formItem.country"
            filterable
            :placeholder="`Select ${title} country`"
            not-found-text="Country not found"
          >
            <Option v-for="data in countryList" :key="data" :value="data">{{
              data
            }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <div class="button-group">
            <Button type="primary" @click="submit">Submit</Button>
            <Button @click="cancel">Cancel</Button>
          </div>
        </FormItem>
      </div>
    </Form>
  </div>
</template>
<script>
import country from "@/assets/shoes/country.json";
import ImageUpload from "@/global-components/ImageUpload.vue";

export default {
  name: "AddAccountCard",
  data() {
    return {
      countryList: country,
      formItem: {
        avatarPath: "",
        UID: "",
        address: "",
        country: ""
      },
      imgPath: ""
    };
  },
  components: {
    ImageUpload
  },
  props: {
    title: String
  },
  methods: {
    async submit() {
      this.$emit("submit", this.formItem);
      this.$emit("close");
    },
    cancel() {
      this.$emit("close");
    },
    setImageIpfsPath(path) {
      this.formItem.avatarPath = path;
    }
  }
};
</script>
<style scoped>
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
.formTitle {
  text-align: center;
  font-size: 24px;
}
.input-form {
  margin-top: 20px;
}
.upload-container {
  width: 100%;
  height: 150px;
  margin-top: 15px;
  box-shadow: 2px 3px 5px 0px #e2e2e2;
}
.button-group {
  display: flex;
  justify-content: flex-end;
}

Button + Button {
  margin-left: 8px;
}
</style>
