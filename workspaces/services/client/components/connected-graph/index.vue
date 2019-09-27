<template>
  <div
    class="connected__stage"
    @mouseup="stopMovingDraggable"
    @mouseleave="stopMovingDraggable"
    @drop="onStageDropHandler"
    @dragover="onStageDragoverHandler"
  >
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
    <component
      v-for="connection in connections"
      ref="connections"
      class="connection"
      :key="'connection_' + connection.metadata.id"
      :is="PortConnection"
      :id="connection.metadata.id"
      :anchor="anchorPoint"
      :ports="connection.ports"
    ></component>
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
import PortConnection, { ConnectionInfo } from './connection.vue'
import NodePort from './port.vue'
import { ConnectionEvent } from './events'

@Component({
  components: {
    GraphNode,
    PortConnection
  }
})
export default class ConnectedGraph extends Vue {
  @Action('graph/getPort') getPort!: (portId: string) => any

  @Prop({ default: () => 'Untitled' }) name!: string
  @Prop({ default: () => null }) icon!: Vue

  PortConnection = PortConnection
  GraphNode = GraphNode
  nodes: { id: number; x: number; y: number }[] = []
  connections: ConnectionInfo[] = []
  isDraggableMoving: boolean = false
  anchorPoint: Point = { x: 0, y: 0 }
  currentPort: any

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
    if (this.currentPort.connections.length === 0) {
      const connectionInfo: ConnectionInfo = {
        metadata: { id: this.connections.length },
        ports: [this.currentPort],
        component: null
      }
      this.currentPort.connectionId = connectionInfo.metadata.id
      this.connections.push(connectionInfo)
    }
    const element = this.currentPort.$el as HTMLElement
    const offset = this.findOffset(element, this.$el as HTMLElement)
    const x = offset.x + 10
    const y = offset.y + 10
    this.anchorPoint.x = x
    this.anchorPoint.y = y
    this.currentPort.updatePosition({ x: 0, y: 0 })
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
      if (this.currentPort.connections.length === 0) {
        const connections = this.$refs.connections as PortConnection[]
        if (connections) {
          const connection = connections.find(
            (c) => c.id === this.currentPort.connectionId
          )
          const connectionInfo = this.connections.find(
            (c) => c.metadata.id === this.currentPort.connectionId
          )
          if (connectionInfo && connection) {
            connectionInfo.component = connection
            this.currentPort.connections.push(connectionInfo)
          }
        }
      }
      const x = event.offsetX - 5
      const y = event.offsetY - 5
      this.currentPort.updatePosition({ x, y })
    }
  }

  async onStageDropHandler(event: any) {
    event.preventDefault()
    this.anchorPoint.x = 0
    this.anchorPoint.y = 0
    const portId = event.dataTransfer.getData('text/plain')
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
  }

  onDisconnect(event: any) {
    console.log(event)
  }
}
</script>
