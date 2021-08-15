<template>
  <div id="upload">
    <input
      type="file"
      @change="fileSelected"
      v-if="isUploadShow"
      class="input-bg"
    />
    <img v-if="image" :src="image" class="upload-image-container" alt="not" />
    <!-- <button @click="upload">
      Upload
    </button> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      image: "",
      isUploadShow: true
    };
  },
  methods: {
    fileSelected(e) {
      const file = e.target.files.item(0);
      const reader = new FileReader();
      reader.addEventListener("load", this.imageLoaded);
      reader.readAsDataURL(file);
      this.isUploadShow = !this.isUploadShow;
    },
    imageLoaded(e) {
      console.log(e.target.result);
      this.image = e.target.result;
    }
    // upload() {
    //   // 用base64字串的方式上傳
    //   axios.post("/upload", { image: this.image });
    // }
  }
};
</script>

<style scoped>
#upload {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload-image-container {
  width: 100%;
  height: 100%;
  padding: 0 30px;
}
.input-bg {
  max-width: 150px;
}
</style>
