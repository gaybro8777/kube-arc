<template>
  <div
    class="page-default"
    v-loading.lock="busy"
    element-loading-text="Please wait while we are switching your language..."
  >
    <div class="menu">
      <el-menu
        mode="vertical"
        router
        :default-active="defaultActive"
        class="menu-vertical"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-menu-item
          v-if="isAdmin"
          index="2"
          :route="getRouteUri('/dashboard')"
        >
          <img
            width="32"
            src="/icons/report.png"
          >
          <span slot="title">{{$t('REPORT')}}</span>
        </el-menu-item>

        <el-menu-item
          index="7"
          v-if="isAdmin"
          :route="getRouteUri('/users')"
        >
          <img
            width="32"
            src="/icons/user.png"
          >
          <span slot="title">{{$t('USERS')}}</span>
        </el-menu-item>

        <el-menu-item
          v-if="hasSuperAdminPermissions"
          index="8"
          :route="getRouteUri('/admin')"
          class="settings-menu"
        >
          <img
            width="32"
            src="/icons/super-admin.png"
          >
          <span slot="title">{{$t('Super Admin Console')}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="page-content">
      <slot name="content"></slot>
    </div>
    <div class="page-header">
      <logo></logo>
      <slot name="header">
      </slot>
      <div class="header-button-group">
        <el-select
          v-model="locale"
          size="small"
          class="lang-select"
          placeholder="Language"
        >
          <el-option
            v-for="item in locales"
            :key="item"
            :label="item.toUpperCase()"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-tooltip placement="bottom">
          <div slot="content">
            {{$t('LOGOUT')}}
          </div>
          <nuxt-link :to="'/logout'">
            <div class="h-box icon-button align-top no-margin">
              <img
                width="32"
                height="32"
                src="/icons/logout.png"
              >
            </div>
          </nuxt-link>
        </el-tooltip>
      </div>
    </div>
    <div class="page-footer">
      <copyright />
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style scoped>
.page-default {
  height: 100vh;
  display: grid;
  grid-template-columns: 55px 250px auto;
  grid-template-rows: 60px 40px 100fr 40px;
  grid-template-areas: "header header header" "menu content content" "menu content content" "footer footer footer";
}
.page-header {
  grid-area: header;
}
.header-button-group {
  display: inline-block;
  right: 0;
  position: absolute;
  padding: 12px 15px 8px 8px;
}

.page-footer {
  grid-area: footer;
}
.page-content {
  grid-area: content;
}
</style>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import Modal from "../modal/index.vue";
import Logo from "../logo/index.vue";
import copyright from "../footer/copyright.vue";

@Component({
  components: {
    Logo,
    Modal,
    copyright,
  },
})
export default class DefaultPage extends Vue {
  @Prop({
    default: () => {
      return true;
    },
    type: Boolean,
  })
  footer!: boolean;

  defaultParams = {};

  busy: boolean = false
  defaultActive: number = 1;

  getRouteUri(path: string, params: {} = {}, query: {} = {}): {} {
    return {
      path,
      params,
      query: this.defaultParams || query,
    };
  }
}
</script>
