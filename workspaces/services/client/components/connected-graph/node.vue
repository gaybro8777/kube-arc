<template>
  <div class="connected__node">
    <div class="port-area">
      <component
        :is="NodePort"
        v-for="port in ports"
        :key="port.serial"
        ref="ports"
        :serial="port.serial"
        :style="portStyle(port)"
        @move="onMove"
        @moveEnd="onMoveEnd"
        @moveStart="onMoveStart"
        @connected="onConnect"
        @multi-connect="onMultiConnect"
        @multi-disconnect="onMultiDisonnect"
        @disconnected="onDisconnect"
      ></component>
    </div>
    <div ref="nodeArea" class="node-area" @mousedown="onMouseDown">
      <div ref="header" class="header">
        <node-status></node-status>
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
import { randomId } from '../common/utils'
import NodePort from './port.vue'
import NodeStatus from './node-status.vue'
import { PortEvent, ConnectionEvent, NodeEvent } from './events'
import { PortConnection } from './connection'

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

  NodePort = NodePort

  data = {
    type: 'service'
  }

  ports: PortDescriptor[] = [
    {
      serial: 0,
      position: { x: '100% - 20px', y: '100%/2 - 10px' },
      config: {}
    },
    { serial: 1, position: { x: 0, y: '100%/2 - 10px' }, config: {} }
  ]

  port = { position: { x: 0, y: 0 } }
  offset = { x: 0, y: 0 }
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

  onMoveStart(event: any) {
    this.port = event.port
    this.$emit(PortEvent.MOVE_START, event)
  }

  onMove(event: any) {
    this.$emit(PortEvent.MOVE, event)
  }

  onMoveEnd(event: any) {
    this.$emit(PortEvent.MOVE_END, event)
  }

  onConnect(event: any) {
    this.$emit(ConnectionEvent.CONNECTED, event)
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
      const ports = this.$refs.ports as NodePort[]
      const newPort = ports.find((port) => port.serial === serial)
      if (droppedPort) {
        droppedPort.connect(newPort)
        newPort.connect(droppedPort)

        const connection: PortConnection =
          droppedPort.connection || newPort.connection

        if (connection) {
          connection.ports = [newPort, droppedPort]
        }

        newPort.connection = connection
        droppedPort.connection = connection
        this.$emit(ConnectionEvent.CONNECTED, [newPort, droppedPort])
      }
      ports.forEach((port) => port.updatePosition(this.$el.parentElement))
    })
  }

  onMultiDisonnect(event: any) {
    this.$emit(ConnectionEvent.MULTI_DISCONNECT, event)
  }

  onDisconnect(event: any) {
    this.$emit(ConnectionEvent.DISCONNECTED, event)
  }

  onMouseMove(event: MouseEvent) {
    event.preventDefault()
    const el = this.$el as HTMLElement
    const width = el.offsetWidth
    const height = el.offsetHeight
    const halfHeight = Math.round(height / 2)
    this.port.position.y = event.clientY
    this.port.position.x = event.clientX
    const top = event.clientY - this.offset.y
    const left = event.clientX - this.offset.x
    el.style.top = top + 'px'
    el.style.left = left + 'px'
    const ports: NodePort[] = this.$refs.ports as NodePort[]
    const parent = el.parentElement
    ports.forEach((port) => port.updatePosition(parent))
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault()
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousemove', this.onMouseMove)
    const element = this.$el as HTMLElement
    this.offset.y = event.clientY - element.offsetTop
    this.offset.x = event.clientX - element.offsetLeft
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
