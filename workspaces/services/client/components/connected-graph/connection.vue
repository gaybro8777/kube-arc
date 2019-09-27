<template>
  <div class="edge-line">
    <svg class="svg-canvas">
      <polyline
        :points="points"
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
import { Point } from '../common/types/point'
import NodePort from './port.vue'

export type ConnectionInfo = {
  component: PortConnection | null
  ports: NodePort[]
  metadata: {
    id: number
  }
}

@Component({})
export default class PortConnection extends Vue {
  @Prop({ default: () => -1, type: Number }) id!: number
  @Prop({ default: () => [], type: Array }) ports!: NodePort[]
  @Prop({ default: () => ({ x: 0, y: 0 }), type: Object }) anchor!: Point

  get points(): string {
    if (this.ports.length > 1) {
      const { x: x1, y: y1 } = this.ports[0].position
      const { x: x2, y: y2 } = this.ports[1].position
      return `${x1} ${y1}, ${x2} ${y2}`
    } else if (this.ports.length === 1) {
      const { x: x1, y: y1 } = this.ports[0].position
      const anchor = this.anchor
      return `${anchor.x} ${anchor.y}, ${anchor.x + x1} ${anchor.y + y1}`
    }
    return `0 0, 0 0`
  }
}
</script>
