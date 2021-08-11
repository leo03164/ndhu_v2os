<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <div class="nav">
          <Sider breakpoint="md" collapsible :width="340" style="height:500px">
            <Menu active-name="1-2" theme="dark" width="auto" class="menu-item">
              <MenuItem name="1-1">
                <Icon type="ios-navigate"></Icon>
                <router-link to="/about">Option</router-link>
              </MenuItem>
              <MenuItem name="1-2">
                <Icon type="ios-search"></Icon>
                <span>Option 2</span>
              </MenuItem>
              <MenuItem name="1-3">
                <Icon type="ios-settings"></Icon>
                <span>Option 3</span>
              </MenuItem>
            </Menu>
            <div slot="trigger"></div>
          </Sider>
        </div>
        <Layout>
          <router-view />
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {}
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
}
a:focus {
  color: #2d8cf0;
}
</style>
