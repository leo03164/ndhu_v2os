<template>
  <div class="create-form-container">
    <div class="form-title">{{ title }}</div>
    <Form :label-width="80">
      <div class="input-form">
        <slot></slot>
        <FormItem>
          <div class="button-group">
            <Button type="primary" @click="submit">Submit</Button>
            <Button style="margin-left: 8px" @click="cancel">Cancel</Button>
          </div>
        </FormItem>
      </div>
    </Form>
  </div>
</template>
<script>
export default {
  name: "ActionSheet",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    cancel() {
      this.$emit("close");
    }
  }
};
</script>
<style scoped>
.create-form-container {
  width: 450px;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 50px;

  position: fixed;
  left: calc(100vh - 450px / 2);
  top: 15vh;
  float: left;

  z-index: 999;
  background-color: #fff;

  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.3);
}
.form-title {
  text-align: center;
  font-size: 24px;
}
.input-form {
  margin-top: 20px;
}
.button-group {
  display: flex;
  justify-content: flex-end;
}
</style>
