<template>
  <div>
    <ActionSheet
      :title="'Random Value'"
      @close="close"
      @submit="setRandomValue"
    >
      <p>This is your random value please keep it carefully</p>
      <p>Key: {{ getRandomValue }}</p>
      <br />
    </ActionSheet>
  </div>
</template>
<script>
import ActionSheet from "@/ui-components/ActionSheet.vue";
import { mapState } from "vuex";

export default {
  name: "RandomValue",
  props: {
    shoesId: {
      type: String,
      default: ""
    }
  },
  components: {
    ActionSheet
  },
  data() {
    return {
      randomValue: ""
    };
  },
  computed: {
    ...mapState(["contract"]),
    getRandomValue() {
      return this.randomValue;
    }
  },
  methods: {
    async setRandomValue() {
      const rvHash = await web3.utils.soliditySha3(this.randomValue);
      try {
        await this.contract.methods
          .setShoesRandomValue(this.shoesId, rvHash)
          .send({ type: "0x2" });
        this.$emit("close");
      } catch (error) {
        console.log(error);
      }
    },
    async randomFunction(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    close() {
      this.$emit("close");
    }
  },
  async created() {
    const MAX_RANDOM_LENGTH = 12;
    this.randomValue = await this.randomFunction(MAX_RANDOM_LENGTH);
  }
};
</script>
<style scoped></style>
