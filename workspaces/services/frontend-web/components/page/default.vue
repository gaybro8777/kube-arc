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
          index="1"
          :route="getRouteUri('/')"
        >
          <img
            width="32"
            src="/icons/search.png"
          >
          <span slot="title">{{$t('SEARCH')}}</span>
        </el-menu-item>
        <el-menu-item
          v-if="isAdmin"
          index="2"
          :route="getRouteUri('/report')"
        >
          <img
            width="32"
            src="/icons/report.png"
          >
          <span slot="title">{{$t('REPORT')}}</span>
        </el-menu-item>
        <el-menu-item
          v-if="isAdmin"
          index="3"
          :route="getRouteUri('/dealers')"
        >
          <img
            width="32"
            src="/icons/contacts.png"
          >
          <span slot="title">{{$t('DEALERS')}}</span>
        </el-menu-item>
        <el-menu-item
          index="4"
          :route="getRouteUri('/cart')"
        >
          <el-badge
            :value="numSelectedVehicles"
            :max="9"
            class="selected-vehicle-badge"
          >
            <img
              width="32"
              src="/icons/shopping-cart.png"
            >
          </el-badge>
          <span slot="title">{{$t('CART')}}</span>
        </el-menu-item>
        <el-menu-item
          index="5"
          :route="getRouteUri('/order')"
        >
          <img
            width="32"
            src="/icons/office-material.png"
          >
          <span
            class="tmp"
            slot="title"
          >{{$t('ORDER_HISTORY')}}</span>
        </el-menu-item>
        <el-menu-item
          index="6"
          v-if="isAdmin"
          :route="getRouteUri('/offer/flash-sales')"
        >
          <img
            width="32"
            src="/icons/label.png"
          >
          <span slot="title">{{$t('OFFERS')}}</span>
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
    <div class="page-default-content">
      <slot name="content"></slot>
    </div>
    <div class="garage-header">
      <insta-logo></insta-logo>
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
        <div class="user-name">{{fullName}}</div>
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
    <div class="footer">
      <copyright />
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style>
.page-default {
  height: 100vh;
  display: grid;
  grid-template-columns: 55px 250px auto;
  grid-template-rows: 60px 40px 100fr 40px;
  grid-template-areas: "header header header" "menu content content" "menu content content" "footer footer footer";
}

.total-vehicles {
  color: #324a5e;
  font-size: 1.3em;
  font-weight: 300;
  padding: 10px;
  top: -35px;
  position: relative;
  display: inline-block;
}
.opportunity {
  color: #324a5e;
  font-size: 1.3em;
  font-weight: 300;
  padding: 10px;
  top: -13px;
  position: relative;
  display: inline-block;
}

.header-button-group {
  display: inline-block;
  right: 0;
  position: absolute;
  padding: 12px 15px 8px 8px;
}

.menu {
  height: 100%;
  grid-area: menu;
}

.settings-menu {
  width: 55px;
  position: absolute;
  bottom: 0;
}

.user-name {
  display: inline-block;
  padding: 0 10px 0 10px;
  color: #34495e;
}

.menu-vertical.el-menu--collapse {
  width: 55px;
  min-height: 400px;
  background: unset;
  height: 100%;
}

.el-menu {
  background: inherit;
  height: inherit;
}

.el-menu-item {
  width: 55px;
  padding: 11px !important;
}

.el-menu-item * {
  vertical-align: unset !important;
}

.el-menu-item.is-active {
  color: #1b9279;
  background: #e3e3e3;
  box-shadow: rgb(140, 140, 140) 0px 2px 4px -1px;
}

.el-menu-item .el-tooltip {
  padding: 11px !important;
}

.page-default-content {
  position: absolute;
  top: 60px;
  bottom: 40px;
  left: 54px;
  width: calc(100vw - 55px);
  border-left: 1px solid #bfc9d9;
  grid-area: content;
}

.lang-select {
  width: 65px;
  margin-right: 10px;
}

.el-badge__content.is-fixed {
  right: 18px;
}
.el-button--danger {
  color: white;
}
.el-button--success {
  color: white;
}
.el-button--warning {
  color: white;
}
</style>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import Modal from "../modal";
import Logo from "../logo";
import copyright from "../footer/copyright";

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
  !footer: boolean;

}
</script>
