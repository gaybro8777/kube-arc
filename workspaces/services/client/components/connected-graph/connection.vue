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
  width: 10px;
  height: 5px;
  background: #409eff;
  position: absolute;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

type Point = {
  x: number
  y: number
}

@Component({})
export default class Connection extends Vue {
  @Prop({ default: () => ({ x: 0, y: 0 }), type: Object }) point1!: Point
  @Prop({ default: () => ({ x: 300, y: 0 }), type: Object }) point2!: Point

  get points(): string {
    const { x: x1, y: y1 } = this.point1
    const { x: x2, y: y2 } = this.point2
    return `${x1} ${y1}, ${x2} ${y2}`
  }
}
</script>
