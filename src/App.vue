<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <div class="nav">
          <Sider breakpoint="md" collapsible :width="340" class="aside-navbar">
            <Menu active-name="1-2" theme="dark" width="auto" class="menu-item">
              <MenuItem name="1-1">
                <Icon type="md-person-add" />
                <router-link to="/admin/manager/create">新增管理員</router-link>
              </MenuItem>
              <MenuItem name="1-2">
                <Icon type="ios-ribbon" />
                <router-link to="/admin/distributor/create"
                  >新增經銷商</router-link
                >
              </MenuItem>
              <MenuItem name="1-3">
                <Icon type="md-clipboard" />
                <router-link to="/admin/product/create">新增商品</router-link>
              </MenuItem>
              <MenuItem name="1-4">
                <Icon type="ios-hand" />
                <router-link to="/product/ban">黑名單</router-link>
              </MenuItem>
              <MenuItem name="1-5">
                <Icon type="md-cube" />
                <router-link to="/admin/product/sell">商品販售</router-link>
              </MenuItem>
              <MenuItem name="1-6">
                <Icon type="ios-construct" />
                <router-link to="/customer/product">商品管理</router-link>
              </MenuItem>
              <MenuItem name="1-7">
                <Icon type="ios-search"></Icon>
                <router-link to="/product/search">搜尋商品</router-link>
              </MenuItem>
              <MenuItem name="1-8">
                <Icon type="ios-list-box" />
                <router-link to="/admin/report-list">檢舉列表</router-link>
              </MenuItem>
            </Menu>
            <div slot="trigger"></div>
          </Sider>
        </div>
        <div class="content-container">
          <Layout>
            <router-view />
          </Layout>
        </div>
      </Layout>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["initIPFS", "initContract"])
  },
  computed: {},
  async created() {
    await this.initIPFS();
    await this.initContract();
  }
};
</script>

<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
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

.nav {
  position: relative;
}

.aside-navbar {
  height: 100vh;
  width: 340px;
  position: fixed;
  z-index: 999;
}

.content-container {
  margin-left: 340px;
  max-width: 1100px;
}
</style>
