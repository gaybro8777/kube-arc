<template>
  <div
    class="connected__stage"
    @mouseup="stopMovingDraggable"
    @mouseleave="stopMovingDraggable"
    @drop="onStageDropHandler"
    @dragover="onStageDragoverHandler"
  >
    <!-- Nodes -->
    <component
      v-for="node in nodes"
      ref="nodes"
      :key="'node_' + node.id"
      :is="GraphNode"
      @moveStart="onPortMoveStart"
      @move="onPortMove"
      @moveEnd="onPortMoveEnd"
      @connected="onConnect"
      @disconnected="onDisconnect"
    ></component>
    <!-- Port Connections -->
    <port-connections
      ref="connections"
      :connections="connections"
    ></port-connections>
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
import PortConnections, {
  ConnectionInfo,
  PortConnection
} from './connections.vue'
import NodePort from './port.vue'
import { ConnectionEvent } from './events'

@Component({
  components: {
    GraphNode,
    PortConnections
  }
})
export default class ConnectedGraph extends Vue {
  @Action('graph/getPort') getPort!: (portId: string) => any

  @Prop({ default: () => 'Untitled' }) name!: string
  @Prop({ default: () => null }) icon!: Vue

  GraphNode = GraphNode
  nodes: { id: number; x: number; y: number }[] = []
  connections: ConnectionInfo[] = []
  isDraggableMoving: boolean = false
  currentPort!: NodePort
  offset = { x: 0, y: 0 }

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

    if (this.currentPort.connection === null) {
      const element = this.currentPort.$el as HTMLElement
      const offset = this.findOffset(element, this.$el as HTMLElement)
      const x = offset.x + 10
      const y = offset.y + 10
      const anchorPoint = { x, y }
      const id = this.connections.length
      const connectionInfo: ConnectionInfo = {
        metadata: { id },
        connection: new PortConnection(id, [this.currentPort], anchorPoint)
      }
      this.connections.push(connectionInfo)
      this.currentPort.connection = connectionInfo
      this.offset.x = 0
      this.offset.y = 0
    } else {
      console.log('Already connected')
      const connectionInfo = this.currentPort.connection
      const otherPort = this.currentPort.connectedPort
      if (otherPort && connectionInfo && connectionInfo.connection) {
        connectionInfo.connection.anchor = otherPort.position
        connectionInfo.connection.ports = [this.currentPort]
        const pos1 = this.currentPort.position
        const pos2 = otherPort.position
        this.offset.x = pos2.x - pos1.x
        this.offset.y = pos2.y - pos1.y
      }
    }
    this.currentPort.updatePosition({ x: this.offset.x, y: this.offset.y })
  }

  onPortMove(event: MouseEvent) {
    if (this.isDraggableMoving && this.currentPort) {
      const x = event.offsetX - 5 - this.offset.x
      const y = event.offsetY - 5 - this.offset.y
      this.currentPort.updatePosition({ x, y })
    }
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

  async onStageDropHandler(event: any) {
    event.preventDefault()
    const portId = event.dataTransfer.getData('text/plain')
    const droppedPort = await this.getPort(portId)
    console.log(droppedPort.connection.metadata.id)

    if (droppedPort) {
      const connectionInfo = this.connections.find(
        (c) => c.metadata.id === droppedPort.connection.metadata.id
      )
      if (connectionInfo) {
        const index = this.connections.indexOf(connectionInfo)
        this.connections.splice(index, 1)
      }
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
  }

  onDisconnect(event: any) {
    console.log(event)
  }
}
</script>
