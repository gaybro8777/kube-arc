<template>
  <div class="connected__node">
    <div
      class="port-area"
      @mousedown="onPortActive"
      @mouseover="onPortAreaOver"
      @mousemove="onPortAreaMove"
      @mouseleave="onPortAreaLeave"
      @mouseout="onPortAreaLeave"
      @dragover="onPortAreaOver"
      @dragleave="onPortAreaLeave"
      @drop="onPortAreaDrop"
    >
      <!-- Dummy port -->
      <node-port
        ref="dummyPort"
        :style="dummyPortStyle"
        :parent-node="this"
        :is-dummy="true"
        @move="onPortMove"
        @moveEnd="onPortMoveEnd"
        @moveStart="onPortMoveStart"
        @connect="onConnect"
        @multi-connect="onMultiConnect"
        @multi-disconnect="onMultiDisonnect"
        @disconnect="onDisconnect"
      ></node-port>
      <component
        :is="NodePort"
        v-for="port in ports"
        :key="port.serial"
        ref="ports"
        :serial="port.serial"
        :style="portStyle(port)"
        @move="onPortMove"
        @moveEnd="onPortMoveEnd"
        @moveStart="onPortMoveStart"
        @connect="onConnect"
        @multi-connect="onMultiConnect"
        @multi-disconnect="onMultiDisonnect"
        @disconnect="onDisconnect"
        @disconnected="onDisconnected"
      ></component>
    </div>
    <div ref="nodeArea" class="node-area" @mousedown="onMouseDown">
      <div ref="header" class="header">
        <node-status></node-status>
        <div class="debug">
          {{ `[${dummyPortStyle.left}, ${dummyPortStyle.top}]` }}
        </div>
        <div class="action-group">
          <el-button
            class="tiny-btn"
            style="margin-left:0;"
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="onEdit"
          >
          </el-button>
          <el-button
            class="tiny-btn"
            style="margin-left:0;"
            size="small"
            type="primary"
            icon="el-icon-delete"
            @click="onDelete"
          >
          </el-button>
        </div>
      </div>
      <div ref="content" class="content">
        <el-select v-model="data.type" placeholder="Type" style="width: 177px;">
          <el-option label="Service" value="service"></el-option>
          <el-option label="VirtualService" value="virtual-service"></el-option>
          <el-option
            label="DestinationRule"
            value="destination-rule"
          ></el-option>
          <el-option label="Gateway" value="gateway"></el-option>
          <el-option label="DockerImage" value="docker-image"></el-option>
          <el-option label="Deployment" value="deployment"></el-option>
          <el-option label="Domain" value="domain"></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.debug {
  font-size: 10px;
  padding-left: 10px;
}
.connected__node {
  position: absolute;
  cursor: move;
  width: 200px;
  height: 90px;
  border: 1px solid #c1cdda;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background: white;
  z-index: 1;
}
.connected__node:hover{
  border: 1px solid #409eff;
}
.node__icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.header {
  padding: 10px;
  display: flex;
}
.content {
  padding: 10px;
}
.action-group {
  right: 10px;
  position: absolute;
}
.tiny-btn {
  padding: 3px;
  margin-left:0;
}
.node-area{
  position: absolute;
  background: white;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
}
.port-area{
  position: absolute;
  /* border: 1px solid #ff00fd; */
  left: -20px;
  top: -20px;
  width: calc(100% + 40px);
  height: calc(100% + 40px);
}
.ports--left {
  left: 0;
  top: calc(100% / 2 - 10px);
  position: absolute;
  user-select: none;
  z-index: 2;
}
.ports--right {
  left: calc(100% - 20px);
  top: calc(100% / 2 - 10px);
  position: absolute;
  user-select: none;
  z-index: 2;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { randomId, clamp } from '../common/utils'
import NodePort from './port.vue'
import NodeStatus from './node-status.vue'
import { PortEvent, ConnectionEvent, NodeEvent } from './events'
import { PortConnection, findOffset } from './connection'

type PortDescriptor = {
  serial: number
  position: { x: number | string; y: number | string }
  config: any
}

@Component({
  components: {
    NodePort,
    NodeStatus
  }
})
export default class GraphNode extends Vue {
  @Prop({ default: () => randomId() }) id!: string
  @Prop({ default: () => 'Service' }) name!: string
  @Prop({ default: () => null }) icon!: Vue

  @Action('graph/getPort') getPort!: (portId: string) => any

  NodePort = NodePort

  data = {
    type: 'service'
  }

  portSerial: number = 0
  ports: PortDescriptor[] = []

  port = { position: { x: 0, y: 0 } }
  dummyPortStyle = {
    left: '0',
    top: '0',
    display: 'block',
    opacity: 0,
    transition: 'opacity 200ms ease 0s'
  }
  offset = { x: 0, y: 0 }
  mouseOffset = { x: 0, y: 0 }
  isPortActive = false
  isPortDragging = false
  isDragging = false

  portStyle(port: PortDescriptor) {
    const { x, y } = port.position
    let left = x
    if (typeof x === 'string') {
      left = `calc(${x})`
    }

    let top = y
    if (typeof y === 'string') {
      top = `calc(${y})`
    }
    return {
      left,
      top
    }
  }

  mounted() {
    const element = this.$el as HTMLElement
    this.offset = findOffset(element, element.parentElement.parentElement)
  }

  onPortAreaOver(event: MouseEvent) {
    event.preventDefault()
    this.dummyPortStyle.display = 'block'
    this.dummyPortStyle.opacity = 1
    this.onPortAreaMove(event)
  }

  onPortAreaLeave(event: MouseEvent) {
    event.preventDefault()
    if (this.isPortActive) return
    this.dummyPortStyle.opacity = 0
  }

  onPortAreaMove(event: MouseEvent) {
    event.preventDefault()
    const { clientX, clientY } = event
    const element = this.$el as HTMLElement
    const x = clientX - element.offsetLeft - this.offset.x + 10
    const y = clientY - element.offsetTop - this.offset.y + 10
    this.setDummyPortPosition(x, y)
  }

  setDummyPortPosition(x, y) {
    const xL = x < 20
    const xR = x > 200
    const yT = y < 18
    const yB = y > 90

    if ((xL && (yT || yB)) || (xR && (yT || yB))) {
      this.dummyPortStyle.display = 'none'
      return
    } else {
      this.dummyPortStyle.display = 'block'
    }

    if (yT || yB) {
      x = clamp(x, 0, 219)
    } else if (xL) {
      x = 0
    } else if (xR) {
      x = 219
    }

    if (xL || xR) {
      y = clamp(y, 18, 90)
    } else if (yT) {
      y = 0
    } else if (yB) {
      y = 109
    }

    this.dummyPortStyle.left = x + 'px'
    this.dummyPortStyle.top = y + 'px'
  }

  onPortAreaDragover(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    const { clientX, clientY } = event
    const element = this.$el as HTMLElement
    const x = clientX - element.offsetLeft - this.offset.x + 10
    const y = clientY - element.offsetTop - this.offset.y + 10
    this.setDummyPortPosition(x, y)
  }

  async onPortAreaDrop(event: any) {
    event.preventDefault()
    event.stopPropagation()
    this.dummyPortStyle.opacity = 1
    this.dummyPortStyle.display = 'block'
    const dummyPort = this.$refs.dummyPort as NodePort
    const serial = this.portSerial++
    let foreignPortSerial
    let droppedPort
    if (dummyPort) {
      {
        const element = dummyPort.$el as HTMLElement
        const { offsetLeft: x, offsetTop: y } = element
        this.ports.push({
          serial,
          position: { x: x + 'px', y: y + 'px' },
          config: {}
        })
      }
      {
        const portId = event.dataTransfer.getData('text/plain')
        droppedPort = await this.getPort(portId)
        const element = droppedPort.$el as HTMLElement
        const { offsetLeft: x, offsetTop: y } = element
        if (droppedPort.parentNode) {
          foreignPortSerial = droppedPort.parentNode.portSerial++
          droppedPort.parentNode.ports.push({
            serial: foreignPortSerial,
            position: { x: x + 'px', y: y + 'px' },
            config: {}
          })
        }
      }
      this.$nextTick(() => {
        // New port
        const ports = this.$refs.ports as NodePort[]
        const newPort = ports.find((port) => port.serial === serial)

        // Foreign Port
        if (droppedPort.parentNode) {
          const foreignPorts = droppedPort.parentNode.$refs.ports as NodePort[]
          const newForeignPort = foreignPorts.find(
            (port) => port.serial === foreignPortSerial
          )
          if (newPort && newForeignPort) {
            newPort.connection = droppedPort.connection
            setTimeout(() => {
              newPort.dropPort(newForeignPort)
            }, 0)
          }
        }
      })
    }
  }

  onPortMoveStart(event: any) {
    this.isPortDragging = true
    this.port = event.port
    this.$emit(PortEvent.MOVE_START, event)
  }

  onPortActive(event: any) {
    this.isPortActive = true
  }

  onPortMove(event: any) {
    this.$emit(PortEvent.MOVE, event)
  }

  onPortMoveEnd(event: any) {
    this.dummyPortStyle.opacity = 0
    this.isPortDragging = false
    this.isPortActive = false
    this.$emit(PortEvent.MOVE_END, event)
  }

  onConnect(event: any) {
    this.$emit(ConnectionEvent.CONNECT, event)
  }

  onMultiConnect({ droppedPort }: { droppedPort: NodePort }) {
    const nodeArea = this.$refs.nodeArea as HTMLElement
    const height = nodeArea.offsetHeight
    const width = nodeArea.offsetWidth
    const serial = this.ports.length
    this.ports.push({
      serial,
      position: { x: 0, y: '100%/2 + 10px' },
      config: {}
    })
    const gap = 5
    const leftPorts = this.ports.filter((p) => p.position.x === 0)
    const numPorts = leftPorts.length
    const portHeight = 20 + gap
    const totalGap = (numPorts - 1) * gap
    const totalPortsHeight = numPorts * 20 + totalGap
    const offsetY = 20 + Math.round((height - totalPortsHeight) / 2)

    let y = offsetY
    leftPorts.forEach((p) => {
      p.position.y = y + 'px'
      y += portHeight
    })

    this.$nextTick(() => {
      const element = this.$el as HTMLElement
      const parentElement = element.parentElement
      const ports = this.$refs.ports as NodePort[]
      const newPort = ports.find((port) => port.serial === serial)
      if (droppedPort && newPort) {
        droppedPort.connect(newPort)
        newPort.connect(droppedPort)

        const connection = droppedPort.connection || newPort.connection

        if (connection) {
          connection.ports = [newPort, droppedPort]
        }

        newPort.connection = connection
        droppedPort.connection = connection
        this.$emit(ConnectionEvent.CONNECT, [newPort, droppedPort])
      }
      if (parentElement !== null) {
        ports.forEach((port) => port.updatePosition(parentElement))
      }
    })
  }

  onMultiDisonnect(event: any) {
    this.$emit(ConnectionEvent.MULTI_DISCONNECT, event)
  }

  onDisconnect(event: any) {
    this.$emit(ConnectionEvent.DISCONNECT, event)
  }

  onDisconnected(ports: NodePort[]) {
    this.dummyPortStyle.opacity = 0
    const dummyPort = this.$refs.dummyPort as NodePort
    dummyPort.connection = null
    ports.forEach((port) => {
      const found = this.ports.find((_port) => _port.serial === port.serial)
      if (found) {
        const index = this.ports.indexOf(found)
        this.ports.splice(index, 1)
      }
    })
  }

  onMouseMove(event: MouseEvent) {
    event.preventDefault()
    const el = this.$el as HTMLElement
    const width = el.offsetWidth
    const height = el.offsetHeight
    const halfHeight = Math.round(height / 2)
    this.port.position.y = event.clientY
    this.port.position.x = event.clientX
    const top = event.clientY - this.mouseOffset.y
    const left = event.clientX - this.mouseOffset.x
    el.style.top = top + 'px'
    el.style.left = left + 'px'
    const ports: NodePort[] = this.$refs.ports as NodePort[]
    const parent = el.parentElement
    if (parent && ports) {
      ports.forEach((port) => port.updatePosition(parent))
    }
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault()
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousemove', this.onMouseMove)
    const element = this.$el as HTMLElement
    this.mouseOffset.y = event.clientY - element.offsetTop
    this.mouseOffset.x = event.clientX - element.offsetLeft
    this.isDragging = true
  }

  onMouseUp(event: MouseEvent) {
    event.preventDefault()
    this.isDragging = false
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('mousemove', this.onMouseMove)
  }

  onDelete() {
    this.$emit(NodeEvent.DELETE, this)
  }

  onEdit() {
    this.$emit(NodeEvent.EDIT, this)
  }
}
</script>
