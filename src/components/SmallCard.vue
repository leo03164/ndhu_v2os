<template>
  <div class="small-card">
    <div class="small-card-title">
      {{ title }}
    </div>
    <div class="small-card-content">
      {{ number }}
    </div>
  </div>
</template>
<script>
export default {
  name: "SmallCard",
  data() {
    return {};
  },
  props: ["title", "number"],
  methods: {},
  component: {}
};
</script>

<style lang="postcss" scoped>
.small-card {
  min-width: 330px;
  min-height: 184px;
  border-radius: 30px;
  background-color: #fff;
}
.small-card-title {
  font-size: 24px;
  color: #a9a9a9;
  margin: 0.75rem 0 0 2rem;
}
.small-card-content {
  font-size: 64px;
  color: #000000;
  text-align: center;
}
</style>
