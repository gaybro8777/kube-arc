<template>
  <div
    class="connected__stage"
    @mouseup="stopMovingDraggable"
    @mouseleave="stopMovingDraggable"
    @drop="onStageDropHandler"
    @dragover="onStageDragoverHandler"
  >
    <!-- @mousemove="onMouseMove" -->
    <component
      v-for="node in nodes"
      :key="node.id"
      :is="GraphNode"
      @moveStart="onPortMoveStart"
      @move="onPortMove"
      @moveEnd="onPortMoveEnd"
      @connected="onConnect"
      @disconnected="onDisconnect"
    ></component>
    <port
      class="dropZone1"
      @moveStart="onPortMoveStart"
      @move="onPortMove"
      @moveEnd="onPortMoveEnd"
      @connected="onConnect"
      @disconnected="onDisconnect"
    ></port>
    <port
      class="dropZone2"
      @moveStart="onPortMoveStart"
      @move="onPortMove"
      @moveEnd="onPortMoveEnd"
      @connected="onConnect"
      @disconnected="onDisconnect"
    ></port>
    <port
      class="dropZone3"
      @moveStart="onPortMoveStart"
      @move="onPortMove"
      @moveEnd="onPortMoveEnd"
      @connected="onConnect"
      @disconnected="onDisconnect"
    ></port>
    <connection
      v-if="isConnectionEnabled"
      class="connection"
      :anchor="anchorPoint"
      :ports="ports"
    ></connection>
  </div>
</template>

<style lang="css">
.dropZone1 {
  position: absolute;
  top: 50px;
  left: 400px;
}
.dropZone2 {
  position: absolute;
  top: 100px;
  left: 400px;
}
.dropZone3 {
  position: absolute;
  top: 200px;
  left: 400px;
}
.connected__stage {
  position: relative;
  user-select: none;
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
import NodePort from './port.vue'
import { ConnectionEvent } from './events'

@Component({
  components: {
    GraphNode,
    connection,
    port: NodePort
  }
})
export default class Connected extends Vue {
  @Action('graph/getPort') getPort!: (portId: string) => any

  @Prop({ default: () => 'Untitled' }) name!: string
  @Prop({ default: () => null }) icon!: Vue

  GraphNode = GraphNode
  nodes: { id: number; x: number; y: number }[] = []
  isConnectionEnabled: boolean = true
  ports: NodePort[] = []
  isDraggableMoving: boolean = false
  anchorPoint: Point = { x: 0, y: 0 }
  currentPort: any

  mounted() {
    console.log(this)
  }

  addNode() {
    this.nodes.push({
      id: this.nodes.length,
      x: Math.round(Math.random() * 1000),
      y: Math.round(Math.random() * 1000)
    })
  }

  stopMovingDraggable(event: MouseEvent) {
    this.isDraggableMoving = false
  }
  onPortMoveStart(event: any) {
    this.isDraggableMoving = true
    this.currentPort = event.port
    this.ports = [this.currentPort]
    const element = this.currentPort.$el as HTMLElement
    const offset = this.findOffset(element, this.$el as HTMLElement)
    const x = offset.x + 10
    const y = offset.y + 10
    this.anchorPoint.x = x
    this.anchorPoint.y = y
    this.currentPort.updatePosition({ x: 0, y: 0 })
    this.isConnectionEnabled = true
  }

  onPortMoveEnd(event: any) {
    this.isDraggableMoving = false
  }

  findOffset(element: HTMLElement, parent: HTMLElement) {
    let currentParent = element.parentElement
    const offset = {
      x: element.offsetLeft,
      y: element.offsetTop
    }
    while (currentParent) {
      if (currentParent === parent) {
        break
      }
      offset.x += currentParent.offsetLeft
      offset.y += currentParent.offsetTop
      currentParent = currentParent.parentElement
    }
    return offset
  }

  onPortMove(event: MouseEvent) {
    if (this.isDraggableMoving && this.currentPort) {
      // const element = this.currentPort.$el as HTMLElement
      // const offset = this.findOffset(element, this.$el as HTMLElement)
      const x = event.offsetX - 5
      const y = event.offsetY - 5
      this.currentPort.updatePosition({ x, y })
    }
  }

  async onStageDropHandler(event: any) {
    event.preventDefault()
    this.anchorPoint.x = 0
    this.anchorPoint.y = 0
    this.ports = []
    this.isConnectionEnabled = false
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
    const element1 = ports[0].$el as HTMLElement
    const element2 = ports[1].$el as HTMLElement
    const offset1 = this.findOffset(element1, this.$el as HTMLElement)
    const offset2 = this.findOffset(element2, this.$el as HTMLElement)

    offset1.x += 10
    offset1.y += 10

    offset2.x += 10
    offset2.y += 10

    ports[0].updatePosition(offset1)
    ports[1].updatePosition(offset2)
    this.isConnectionEnabled = true
    this.ports = ports
  }

  onDisconnect(event: any) {
    console.log(event)
  }
}
</script>
