<template>
  <div>
    <ActionSheet
      :title="'Empowerment'"
      @close="close"
      @submit="transferItemToDistributor"
    >
      <FormItem label="Distributor">
        <Select
          v-model="selectedDistributor"
          filterable
          placeholder="Select distributor"
          not-found-text="distributor not found"
        >
          <Option
            v-for="distributor in getDistributorList"
            :key="distributor.chainAddress"
            :value="distributor.chainAddress"
            >{{ distributor.chainAddress }}</Option
          >
        </Select>
      </FormItem>
    </ActionSheet>
  </div>
</template>
<script>
import ActionSheet from "@/ui-components/ActionSheet.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Empowerment",
  props: {
    product: Object
  },
  components: {
    ActionSheet
  },
  data() {
    return {
      distributorList: [],
      selectedDistributor: ""
    };
  },
  computed: {
    ...mapState(["contract"]),
    ...mapGetters(["getDistributorList"])
  },
  methods: {
    async transferItemToDistributor() {
      try {
        await this.contract.methods
          .empowerShoesToDistributor(this.product.id, this.selectedDistributor)
          .send({ type: "0x2" });
        this.$emit("close");
      } catch (error) {
        console.log(error);
      }
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
