<template>
  <div
    class="connected__stage"
    @mouseup="stopMovingPort"
    @mouseleave="stopMovingPort"
    @drop="onStageDropHandler"
    @dragover="onStageDragoverHandler"
  >
    <!-- @mousemove="onMouseMove" -->
    <graph-node
      ref="node1"
      @moveStart="onPortMoveStart"
      @move="onPortMove"
      @moveEnd="onPortMoveEnd"
    >
    </graph-node>
    <graph-node
      ref="node1"
      @moveStart="onPortMoveStart"
      @move="onPortMove"
      @moveEnd="onPortMoveEnd"
    >
    </graph-node>
    <!-- <div class="dropZone" @drop="dropHandler" @dragover="dragoverHandler"></div> -->
    <port class="dropZone"></port>
    <connection
      v-if="$refs.node1 && $refs.node2"
      :port1="$refs.node1.port"
      :port2="$refs.node2.port"
    ></connection>
  </div>
</template>

<style lang="css">
.dropZone {
  position: absolute;
  top: 100px;
  left: 400px;
}
.connected__stage {
  position: relative;
  width:100%;
  height:100%;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import GraphNode from './node.vue'
import connection from './connection.vue'
import port from './port.vue'

@Component({
  components: {
    GraphNode,
    connection,
    port
  }
})
export default class Connected extends Vue {
  @Prop({ default: () => 'Untitled' }) name!: string
  @Prop({ default: () => null }) icon!: Vue

  isPortMoving: boolean = false
  currentPort: any

  mounted() {
    console.log(this)
  }

  stopMovingPort(event: MouseEvent) {
    this.isPortMoving = false
  }
  onPortMoveStart(event: any) {
    this.isPortMoving = true
    this.currentPort = event.port
  }
  onPortMoveEnd(event: any) {
    this.isPortMoving = false
  }

  onPortMove(event: MouseEvent) {
    if (this.isPortMoving && this.currentPort) {
      const x = event.offsetX
      const y = event.offsetY
      this.currentPort.updatePosition({ x, y })
    }
  }

  onStageDropHandler(event: any) {
    event.preventDefault()
    // event.dataTransfer.dropEffect = 'move'
  }

  onStageDragoverHandler(event: any) {
    event.preventDefault()
    // event.dataTransfer.dropEffect = 'move'
  }

  dragoverHandler(event: any) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  dropHandler(event: any) {
    console.log('dropped')
    event.dataTransfer.dropEffect = 'move'
    event.preventDefault()
    this.currentPort.anchor()
  }
}
</script>
