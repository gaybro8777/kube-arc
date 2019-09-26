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
      @connected="onConnect"
      @disconnected="onDisconnect"
    >
    </graph-node>
    <graph-node
      ref="node1"
      @moveStart="onPortMoveStart"
      @move="onPortMove"
      @moveEnd="onPortMoveEnd"
      @connected="onConnect"
      @disconnected="onDisconnect"
    >
    </graph-node>
    <port
      class="dropZone"
      @connected="onConnect"
      @disconnected="onDisconnect"
    ></port>
    <connection
      class="connection"
      :ports="ports"
      :style="{
        left: anchorPoint.x + 'px',
        top: anchorPoint.y + 'px'
      }"
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
.connection {
  width:100%;
  height:100%;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import { Point } from '../common/types/point'
import GraphNode from './node.vue'
import connection from './connection.vue'
import port from './port.vue'
import { ConnectionEvent } from './events'
import NodePort from './port.vue'

@Component({
  components: {
    GraphNode,
    connection,
    port
  }
})
export default class Connected extends Vue {
  @Action('graph/getPort') getPort!: (portId: string) => any

  @Prop({ default: () => 'Untitled' }) name!: string
  @Prop({ default: () => null }) icon!: Vue

  isConnectionEnabled: boolean = true
  ports: NodePort[] = []
  isPortMoving: boolean = false
  anchorPoint: Point = { x: 0, y: 0 }
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
    const element = this.currentPort.$el as HTMLElement
    this.anchorPoint.x = element.offsetLeft
    this.anchorPoint.y = element.offsetTop
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

  async onStageDropHandler(event: any) {
    event.preventDefault()
    const portId = event.dataTransfer.getData('text/plain')
    console.log(`onStageDropHandler [portId:${portId}]`)
    const droppedPort = await this.getPort(portId)

    if (droppedPort) {
      droppedPort.disconnect()
    }
  }

  onStageDragoverHandler(event: any) {
    event.preventDefault()
    // event.dataTransfer.dropEffect = 'move'
  }

  onConnect(ports: NodePort[]) {
    console.log('onConnect-outter:', event)
    this.isConnectionEnabled = true
    this.ports = ports
  }

  onDisconnect(event: any) {
    console.log(event)
  }
}
</script>
