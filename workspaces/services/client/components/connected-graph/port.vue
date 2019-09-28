<template>
  <div
    :id="portId"
    class="port-container"
    @drop="onDrop"
    @dragover="onDragOver"
  >
    <!-- <div class="port fixed"></div> -->
    <div
      ref="port"
      class="port"
      draggable="true"
      :style="{
        left: anchorPoint.x + 'px',
        top: anchorPoint.y + 'px',
        background: color
      }"
      @dragstart="onDragStart"
      @drag="onDrag"
      @dragend="onDragEnd"
    ></div>
    <!-- :style="{ left: position.x + 'px', top: position.y + 'px' }" -->
    <div class="receptor"></div>
  </div>
</template>

<style lang="css">
.port-container {
  position: absolute
}
.port {
  width: 10px;
  height: 10px;
  background: #409eff;
  position: absolute;
  cursor: pointer;
  z-index: 2;
  transform: translate(5px, 5px);
}
.fixed {
  user-select: none;
  background: #f56c6c;
  z-index: 1;
}
.receptor {
  width:20px;
  height:20px;
  background: #d1d1d1;
  z-index: 0;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Point } from '../common/types/point'
import { PortEvent, ConnectionEvent } from './events'
import PortConnection, { ConnectionInfo } from './connections.vue'

@Component({})
export default class NodePort extends Vue {
  // Store actions
  @Action('graph/getPort') getPort!: (portId: string) => any
  @Action('graph/addPort') addPort!: (port: NodePort) => string

  color = '#409eff'
  initialPosition = { x: 0, y: 0 }
  position = { ...this.initialPosition }
  anchorPoint = { ...this.initialPosition }
  isMoving = false
  portId: string = ''
  connection: ConnectionInfo | null = null
  connectedPort: NodePort | null = null

  async mounted() {
    this.portId = await this.addPort(this)
    console.log('Port ID: ', this.portId)
  }

  onDragStart(event: DragEvent) {
    this.isMoving = true
    this.color = '#849eb1'
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('text/plain', this.portId)
    }
    this.$emit(PortEvent.MOVE_START, { port: this })
  }

  onDrag(event: DragEvent) {
    this.$emit(PortEvent.MOVE, event)
  }

  onDragEnd(event: DragEvent) {
    if (this.isMoving) {
      this.reset()
    }
    this.isMoving = false
    this.$emit(PortEvent.MOVE_END, { port: this })
  }

  updatePosition(position: Point) {
    this.position.x = position.x
    this.position.y = position.y
  }

  anchor(pos?: Point) {
    const position = pos || this.position
    this.color = '#f56c6c'
    this.isMoving = false
    this.anchorPoint.x = position.x
    this.anchorPoint.y = position.y
  }

  reset() {
    this.color = '#409eff'
    this.anchorPoint.x = this.initialPosition.x
    this.anchorPoint.y = this.initialPosition.y
  }

  // Receptor handlers
  onDragOver(event: any) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  async onDrop(event: any) {
    event.preventDefault()
    event.stopPropagation()
    event.dataTransfer.dropEffect = 'move'
    const portId = event.dataTransfer.getData('text/plain')
    let droppedPort = await this.getPort(portId)
    const element = this.$el as HTMLElement
    const x = element.offsetLeft
    const y = element.offsetTop
    if (droppedPort === this) {
      droppedPort = droppedPort.connectedPort
    }
    if (droppedPort) {
      droppedPort.connect(this)
      this.connect(droppedPort)
      const connectionInfo: ConnectionInfo =
        droppedPort.connection || this.connection
      if (connectionInfo && connectionInfo.connection) {
        connectionInfo.connection.ports = [this, droppedPort]
      }
      this.connection = connectionInfo
      droppedPort.connection = connectionInfo
      this.$emit(ConnectionEvent.CONNECTED, [this, droppedPort])
    }
  }

  connect(port: NodePort) {
    if (this.connection === null && port === this) return
    this.color = '#f56c6c'
    this.isMoving = false
    if (this.connection) {
      if (this.connection.connection && this.connectedPort) {
        console.log(
          'this.connection.connection.ports:',
          this.connection.connection.ports
        )
        this.connection.connection.ports = [this, this.connectedPort]
      }
    } else {
      this.connectedPort = port
    }
  }

  disconnect(ports?: NodePort[]) {
    this.isMoving = false
    this.connection = null
    this.connectedPort = null
    this.reset()
  }
}
</script>
