<template>
  <page>
    <div slot="header">
      <div class="button-group--header">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="medium"
          @click="addNode"
        >
          Add Node
        </el-button>
      </div>
    </div>
    <connected-graph ref="graph" slot="content"></connected-graph>
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
import ConnectedGraph from '~/components/connected-graph/index.vue'

@Component({
  components: {
    page,
    ConnectedGraph
  }
})
export default class PipelinePage extends Vue {
  addNode() {
    const graph = this.$refs.graph as ConnectedGraph
    graph.addNode()
  }
}
</script>
