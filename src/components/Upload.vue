<template>
  <div id="upload">
    <input
      type="file"
      @change="fileSelected"
      v-if="isUploadShow"
      class="input-bg"
    />
    <img :src="getImg" class="upload-image-container" v-if="getImg" />
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      image: "",
      isUploadShow: true
    };
  },
  computed: {
    ...mapState(["ipfs", "contract"]),
    getImg() {
      return this.image;
    }
  },
  methods: {
    async fileSelected(e) {
      const file = e.target.files.item(0);
      const reader = new FileReader();

      reader.addEventListener("load", this.imageLoaded, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    async imageLoaded(reader) {
      // convert image file to base64 string
      this.isUploadShow = !this.isUploadShow;
      this.image = reader.explicitOriginalTarget.result;
      const result = await this.ipfs.add(reader.explicitOriginalTarget.result);
      this.$emit("imgPath", result.path);

      // @todo can't return too large file need to fix
      // this.image = `https://ipfs.io/ipfs/${result.path}`;
      // console.log(result.path);
    }
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
