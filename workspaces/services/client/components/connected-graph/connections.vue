<template>
  <div class="edge-line">
    <svg v-if="connections" class="svg-canvas">
      <polyline
        v-for="connection in connections"
        :key="connection.id"
        :points="connection.points"
        style="stroke:#409eff; stroke-width:4px; fill:none"
      />
    </svg>
  </div>
</template>

<style lang="css">
.edge-line {
  position: absolute;
  user-select: none;
  pointer-events: none;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
}
.svg-canvas {
  width:inherit;
  height: inherit;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { Point } from '../common/types/point'
import { randomId } from '../common/utils'
import NodePort from './port.vue'
import { PortConnection } from './connection'

@Component({})
export default class PortConnections extends Vue {
  @Prop({ default: () => null, type: Array }) connections!: PortConnection[]

  get _connections() {
    console.log(this.connections.length)
    return this.connections.length
  }
}
</script>
