<template>
  <div id="upload">
    <input
      type="file"
      @change="fileSelected"
      v-if="isUploadShow"
      class="input-bg"
    />
    <img :src="getImg" class="upload-image-container" v-show="getImg" />
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
    ...mapState(["ipfs"]),
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
        reader.readAsArrayBuffer(file);
      }
    },
    async imageLoaded(reader) {
      const arrayBuffer = reader.target.result;
      const fileBuffer = new Uint8Array(arrayBuffer);
      const { path } = await this.ipfs.add(fileBuffer);
      this.ipfs.pin.add(path);
      this.image = `https://ipfs.io/ipfs/${path}`;
      this.$emit("setImageIpfsPath", path);
      this.isUploadShow = false;
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
