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
            v-for="distributor in distributorList"
            :key="distributor.ethAddress"
            :value="distributor.ethAddress"
            >{{ distributor.ethAddress }}</Option
          >
        </Select>
      </FormItem>
    </ActionSheet>
  </div>
</template>
<script>
import ActionSheet from "@/ui-components/ActionSheet.vue";
import { mapState } from "vuex";

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
      selectedDistributor: "",
      decodeTopics:
        "0xfc6e7d040a8092cf9d77373a8532258ad9b19d874605c3ee5d8b2a9330559b1e",
      eventParserMethodSignature: [
        {
          type: "string",
          name: "UID"
        },
        {
          type: "address",
          name: "distributor"
        },
        {
          type: "string",
          name: "country"
        },
        {
          type: "uint256",
          name: "bornDate"
        }
      ]
    };
  },
  computed: {
    ...mapState(["contract"])
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
    // move to vuex and save data to vuex
    async parserLog() {
      let i;
      const maxLogs = localStorage.getItem("logsNum");

      // decode data from localstorage
      for (i = 0; i < maxLogs; i += 1) {
        const logData = JSON.parse(localStorage.getItem(i));

        // check the event that is we want
        if (!logData.topics.includes(this.decodeTopics)) {
          continue;
        }

        // decode event and get product id
        const {
          UID,
          distributor,
          country,
          bornDate
        } = await web3.eth.abi.decodeLog(
          this.eventParserMethodSignature,
          logData.data,
          logData.topics
        );

        const newDistributor = {};
        newDistributor.UID = UID;
        newDistributor.ethAddress = distributor;
        newDistributor.country = country;
        newDistributor.bornDate = bornDate;

        this.distributorList.push(newDistributor);
        this.distributorCount++;
      }
    },
    close() {
      this.$emit("close");
    }
  },
  async created() {
    await this.parserLog();
  }
};
</script>
<style lang="postcss" scoped></style>
