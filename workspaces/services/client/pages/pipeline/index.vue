<template>
  <page>
    <div slot="header">
      <div class="button-group--header">
        <el-button type="primary" icon="el-icon-plus" size="medium">
          Add
        </el-button>
      </div>
    </div>
    <div slot="content">
      <el-row class="row-block">
        <!-- DOCKER IMAGE CARD -->
        <docker-image></docker-image>

        <!-- SERVICE CARD -->
        <service></service>

        <!-- DEPLOYMENT CARD -->
        <deployment></deployment>

        <!-- VIRTUAL SERVICE CARD -->
        <virtual-service></virtual-service>

        <!-- DESTINATION RULE CARD -->
        <destination-rule></destination-rule>

        <!-- GATEWAY CARD -->
        <gateway></gateway>

        <!-- DOMAIN CARD -->
        <domain></domain>
      </el-row>
    </div>
    <div slot="footer" class="progress-bar--footer">
      <el-progress :percentage="30" color="#409eff"></el-progress>
    </div>
  </page>
</template>

<style lang="css">
.box-card {
  width: 500px;
  margin: 20px;
  display: inline-block;
}
.box-card__icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin: 0 5px 0 0;
}
</style>

<style lang="css">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.button-group--header {
  position: absolute;
  right:20px;
}
.progress-bar--footer {
  width:20%;
}
.row-block {
  padding-bottom: 20px;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import page from '~/components/page/default.vue'
import virtualService from '~/components/kubernetes/istio/virtual-service.vue'
import destinationRule from '~/components/kubernetes/istio/destination-rule.vue'
import gateway from '~/components/kubernetes/istio/gateway.vue'
import service from '~/components/kubernetes/service.vue'
import dockerImage from '~/components/kubernetes/docker-image.vue'
import deployment from '~/components/kubernetes/deployment.vue'
import domain from '~/components/dns/domain.vue'

@Component({
  components: {
    page,
    virtualService,
    destinationRule,
    gateway,

    service,
    dockerImage,
    deployment,
    domain
  }
})
export default class PipelinePage extends Vue {}
</script>
