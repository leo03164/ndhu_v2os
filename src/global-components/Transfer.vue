<template>
  <div>
    <ActionSheet
      :title="'Transfer Product'"
      @close="close"
      @submit="transferHandler"
    >
      <FormItem label="轉移模式">
        <RadioGroup v-model="mode">
          <Radio label="face2Face">轉移至買家</Radio>
          <Radio label="proxy">轉移至代理</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem label="購買者" v-if="mode === 'face2Face'">
        <Input v-model="buyer" placeholder="請輸入購買者位址"></Input>
      </FormItem>

      <FormItem label="販售價格" v-if="mode === 'proxy'">
        <Input
          v-model="price"
          placeholder="請輸入欲販售金額"
          number
          style="width: 80px"
        ></Input>
      </FormItem>
    </ActionSheet>
  </div>
</template>
<script>
import ActionSheet from "@/ui-components/ActionSheet.vue";
import { mapState } from "vuex";
import { getShoesIdByAttribute } from "@/utils";

export default {
  name: "Transfer",
  props: {
    product: Object
  },
  components: {
    ActionSheet
  },
  data() {
    return {
      mode: "face2Face",
      buyer: "",
      price: 0,
      shoesId: ""
    };
  },
  computed: {
    ...mapState(["contract"])
  },
  methods: {
    async transferHandler() {
      try {
        if (this.mode === "face2Face") {
          await this.contract.methods
            .transferShoesByOwner(this.shoesId, this.buyer, "Taiwan")
            .send({ type: "0x2" });
        } else if (this.mode === "proxy") {
          await this.contract.methods
            .transferShoesToContract(this.shoesId, this.price, "Taiwan")
            .send({ type: "0x2" });
        } else {
          console.log("transferHandler error");
        }
        this.close();
      } catch (error) {
        console.log(error);
      }
    },
    close() {
      this.$emit("close");
    }
  },
  created() {
    this.shoesId = getShoesIdByAttribute(
      this.product.SN,
      this.product.name,
      this.product.company
    );
  }
};
</script>
<style scoped></style>
