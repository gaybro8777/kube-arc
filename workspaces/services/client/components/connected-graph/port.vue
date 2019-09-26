<template>
  <div class="port-container" @drop="onDrop" @dragover="onDragOver">
    <div class="port fixed"></div>
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
}
.fixed {
  user-select: none;
  background: #f56c6c;
  z-index: 1;
}
.receptor {
  width:20px;
  height:20px;
  transform: translate(-5px, -5px);
  background: #d1d1d1;
  z-index: 0;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
// eslint-disable-next-line
import { Point } from '../common/types/point'
import { PortEvent, ConnectionEvent } from './events'

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
  connections: NodePort[] = []

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
    console.log(`onDrop [portId:${portId}]`)
    const droppedPort = await this.getPort(portId)
    const element = this.$el as HTMLElement
    const x = element.offsetLeft
    const y = element.offsetTop
    if (droppedPort) {
      droppedPort.connect(this)
      this.connect(droppedPort)
      this.$emit(ConnectionEvent.CONNECTED, [droppedPort, this])
    }
  }

  connect(port: NodePort) {
    this.color = '#f56c6c'
    this.isMoving = false
    this.connections.push(port)
  }

  disconnect(ports?: NodePort[]) {
    this.isMoving = false
    let connections = this.connections
    if (ports) {
      connections = []
      const remainders: NodePort[] = []
      this.connections.forEach((port) => {
        if (ports.includes(port)) {
          connections.push(port)
        } else {
          remainders.push(port)
        }
      })
      this.connections = remainders
    } else {
      this.connections = []
    }
    connections.forEach((connection) => connection.disconnect([this]))

    if (this.connections.length === 0) {
      this.reset()
    }
  }
}
</script>
