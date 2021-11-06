<template>
  <ActionSheet v-if="isShowQrcodeScanner" @close="isShowQrcodeScanner = false">
    <div class="qrcode-block">
      <qrcode-stream
        v-if="isShowQrcodeScanner"
        @decode="onDecode"
        @init="onInit"
      />
      <p class="error">{{ error }}</p>
    </div>
  </ActionSheet>
</template>
<script>
import { QrcodeStream } from "vue-qrcode-reader";
import ActionSheet from "@/ui-components/ActionSheet.vue";

export default {
  data() {
    return {
      error: ""
    };
  },
  props: {
    isShowQrcodeScanner: {
      type: Boolean,
      default: false
    }
  },
  components: {
    QrcodeStream,
    ActionSheet
  },
  computed: {},
  methods: {
    onDecode(result) {
      // 可以work
      this.$emit("finished", result);
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    }
  }
};
</script>

<style scoped>
.qrcode-block {
  width: 100%;
  height: 100%;
  padding-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
