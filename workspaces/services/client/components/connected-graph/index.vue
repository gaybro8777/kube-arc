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
      :is="GraphNode"
      v-for="node in nodes"
      :id="node.id"
      :key="'node_' + node.id"
      ref="nodes"
      :icon="serviceIcon"
      @moveStart="onPortMoveStart"
      @move="onPortMove"
      @moveEnd="onPortMoveEnd"
      @connected="onConnect"
      @disconnected="onDisconnect"
      @delete="onDeleteNode"
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
import { Action, Getter } from 'vuex-class'
import { Point } from '../common/types/point'
import { randomId } from '../common/utils'
import GraphNode from './node.vue'
import PortConnections from './connections.vue'
import { PortConnection, findOffset } from './connection'
import NodePort from './port.vue'
import { ConnectionEvent } from './events'
import serviceIcon from '~/assets/icons/service.svg'

@Component({
  components: {
    GraphNode,
    PortConnections,
    serviceIcon
  }
})
export default class ConnectedGraph extends Vue {
  @Action('graph/getPort') getPort!: (portId: string) => any

  @Prop({ default: () => 'Untitled' }) name!: string
  @Prop({ default: () => null }) icon!: Vue

  // Connections
  connections: PortConnection[] = []

  // Components
  GraphNode = GraphNode
  serviceIcon = serviceIcon

  nodes: { id: string; x: number; y: number }[] = []
  isDraggableMoving: boolean = false
  currentPort!: NodePort
  offset = { x: 0, y: 0 }

  addNode() {
    this.nodes.push({
      id: randomId(),
      x: Math.round(Math.random() * 1000),
      y: Math.round(Math.random() * 1000)
    })
  }

  addConnection(connection: PortConnection) {
    this.connections.push(connection)
  }

  removeConnection(connection: PortConnection) {
    const index = this.connections.indexOf(connection)
    if (index > -1) {
      this.connections.splice(index, 1)
    }
  }

  stopMovingDraggable(event: MouseEvent) {
    this.isDraggableMoving = false
  }

  onPortMoveStart(event: any) {
    this.isDraggableMoving = true
    this.currentPort = event.port

    if (this.currentPort.connection === null) {
      const element = this.currentPort.$el as HTMLElement
      const offset = findOffset(element, this.$el as HTMLElement)
      const x = offset.x + 10
      const y = offset.y + 10
      const anchorPoint = { x, y }
      const connection: PortConnection = new PortConnection(
        randomId(),
        [this.currentPort],
        anchorPoint
      )
      this.currentPort.connection = connection
      this.offset.x = 0
      this.offset.y = 0
      this.addConnection(connection)
    } else {
      const connection = this.currentPort.connection
      const otherPort = this.currentPort.connectedPort
      if (otherPort && connection) {
        connection.anchor = otherPort.position
        connection.ports = [this.currentPort]
        const pos1 = this.currentPort.position
        const pos2 = otherPort.position
        this.offset.x = pos2.x - pos1.x
        this.offset.y = pos2.y - pos1.y
      }
    }
    this.currentPort.setPosition({ x: this.offset.x, y: this.offset.y })
  }

  onPortMove(event: MouseEvent) {
    if (this.isDraggableMoving && this.currentPort) {
      const x = event.offsetX - 5 - this.offset.x
      const y = event.offsetY - 5 - this.offset.y
      this.currentPort.setPosition({ x, y })
    }
  }

  onPortMoveEnd(event: any) {
    this.isDraggableMoving = false
  }

  async onStageDropHandler(event: any) {
    event.preventDefault()
    const portId = event.dataTransfer.getData('text/plain')
    const droppedPort = await this.getPort(portId)

    if (droppedPort) {
      console.log('connection:', droppedPort.connection.id)
      this.removeConnection(droppedPort.connection)
      droppedPort.disconnect()
    }
  }

  onStageDragoverHandler(event: any) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  onConnect(ports: NodePort[]) {
    const element1 = ports[0].$el as HTMLElement
    const element2 = ports[1].$el as HTMLElement
    const offset1 = findOffset(element1, this.$el as HTMLElement)
    const offset2 = findOffset(element2, this.$el as HTMLElement)

    offset1.x += 10
    offset1.y += 10

    offset2.x += 10
    offset2.y += 10

    ports[0].setPosition(offset1)
    ports[1].setPosition(offset2)
  }

  onDisconnect(ports: NodePort[]) {
    ports.forEach((port) => {
      if (port.connection) {
        this.removeConnection(port.connection)
      }
      port.disconnect()
    })
  }

  onDeleteNode(node: GraphNode) {
    const ports: NodePort[] = node.$refs.ports as NodePort[]
    const connectionsToDelete = new Set<PortConnection>()
    ports.forEach((port) => {
      if (port.connection) {
        connectionsToDelete.add(port.connection)
      }
      port.disconnect()
    })

    for (const c of connectionsToDelete) {
      const index = this.connections.indexOf(c)
      this.connections.splice(index, 1)
    }

    const found = this.nodes.find((n) => n.id === node.id)
    if (found) {
      const index = this.nodes.indexOf(found)
      this.nodes.splice(index, 1)
    }
  }
}
</script>
