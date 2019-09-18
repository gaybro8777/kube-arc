// TEMPLATE
<template>
  <div class="page--default">
    <!-- HEADER -->
    <div class="page__header">
      <app-logo></app-logo>
      <slot name="header"></slot>
    </div>
    <!-- BODY -->
    <div class="page__content">
      <slot name="content"></slot>
    </div>
    <!-- FOOTER -->
    <div class="page__footer">
      <slot name="footer"></slot>
      <copyright></copyright>
    </div>
  </div>
</template>

// STYLE
<style lang="css">
.page--default {
  height: 100vh;
  display: grid;
  grid-template-columns: 55px 250px auto;
  grid-template-rows: 55px 40px 100fr 40px;
  grid-template-areas:
    'header header header'
    'content content content'
    'content content content'
    'footer footer footer';
}
.page__header {
  display: inline-flex;
  width: 100vw;
  box-shadow: 0px 0px 2px 1px #999898;
  grid-area: header;
  padding: 10px;
}
.page__content {
  grid-area: content;
  padding: 20px;
}
.page__footer {
  display: inline-flex;
  width: 100vw;
  height: 40px;
  box-shadow: 0px 0px 1px 0px #999898;
  grid-area: footer;
  padding: 10px;
}
</style>

// SCRIPT
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AppLogo from '~/components/common/logo.vue'
import copyright from '~/components/common/copyright.vue'

@Component({
  components: {
    AppLogo,
    copyright
  }
})
export default class DefaultPage extends Vue {
  test: boolean = false
  mounted() {
    this.test = false
  }
}
</script>
