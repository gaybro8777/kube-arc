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
      <!-- <el-badge is-dot class="item">
        <el-button size="small">Service v1.2.0</el-button>
      </el-badge> -->
      <el-popover placement="right" width="400" trigger="click">
        <div class="service-details">Name: Service 1</div>
        <el-button slot="reference" type="success">GraphQL Gateway</el-button>
      </el-popover>
      <el-button slot="reference" type="success">Service</el-button>
      <el-button slot="reference" type="primary">Deployment</el-button>
      <el-button slot="reference" type="primary">Virtual Service</el-button>
      <el-button slot="reference" type="primary">Destination Rule</el-button>
      <el-button slot="reference" type="primary">Gateway</el-button>
    </div>
    <div slot="footer" class="progress-bar--footer">
      <el-progress :percentage="30" color="#409eff"></el-progress>
    </div>
  </page>
</template>

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
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import page from '~/components/page/default.vue'

@Component({
  components: {
    page
  }
})
export default class PipelinePage extends Vue {
  mounted() {
    console.log('Test')
  }
}
</script>
