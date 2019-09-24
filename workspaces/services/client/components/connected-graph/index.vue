<template>
  <div
    class="connected__stage"
    @mouseup="stopMovingPort"
    @mouseleave="stopMovingPort"
    @mousemove="onMouseMove"
  >
    <graph-node @moveStart="onPortMoveStart"> </graph-node>
    <graph-node @moveStart="onPortMoveStart"> </graph-node>
  </div>
</template>

<style lang="css">
.connected__stage {
  width:100%;
  height:100%;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import GraphNode from './node.vue'

@Component({
  components: {
    GraphNode
  }
})
export default class Connected extends Vue {
  @Prop({ default: () => 'Untitled' }) name!: string
  @Prop({ default: () => null }) icon!: Vue

  isPortMoving: boolean = false
  currentPort: any

  stopMovingPort(event: MouseEvent) {
    this.isPortMoving = false
  }
  onPortMoveStart(event: any) {
    this.isPortMoving = true
    this.currentPort = event.port
  }

  onMouseMove(event: MouseEvent) {
    if (this.isPortMoving && this.currentPort) {
      this.currentPort.x = event.offsetX
      this.currentPort.y = event.offsetY
    }
  }
}
</script>
