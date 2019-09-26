<template>
  <div class="edge-line">
    <svg>
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
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import NodePort from './port.vue'

type Point = {
  x: number
  y: number
}

@Component({})
export default class Connection extends Vue {
  @Prop({ default: () => [], type: Array }) ports!: NodePort[]

  get points(): string {
    if (this.ports.length > 1) {
      const { x: x1, y: y1 } = this.ports[0].position
      const { x: x2, y: y2 } = this.ports[1].position
      return `${x1} ${y1}, ${x2} ${y2}`
    }
    return `0 0, 0 0`
  }
}
</script>
