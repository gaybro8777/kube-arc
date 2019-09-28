<template>
  <div ref="node" class="connected__node" @mousedown="onMouseDown">
    <div class="ports--left">
      <component
        v-for="port in leftPorts"
        :key="port.id"
        ref="ports"
        :is="NodePort"
        @move="onMove"
        @moveEnd="onMoveEnd"
        @moveStart="onMoveStart"
        @connected="onConnect"
        @disconnected="onDisconnect"
      ></component>
    </div>
    <div class="ports--right">
      <component
        v-for="port in rightPorts"
        :key="port.portId"
        :is="NodePort"
        ref="ports"
        @move="onMove"
        @moveEnd="onMoveEnd"
        @moveStart="onMoveStart"
        @connected="onConnect"
        @disconnected="onDisconnect"
      ></component>
    </div>
    <div ref="content" class="content">
      <component :is="icon" v-if="icon" class="box-card__icon"></component>
      <span>{{ name }}</span>
      <el-button
        size="mini"
        type="text"
        icon="el-icon-delete"
        style="float: right; padding: 3px 0; color: red;"
      >
      </el-button>
      <div>x:{{ port.position.x }}, y:{{ port.position.y }}</div>
    </div>
  </div>
</template>

<style lang="css">
.connected__node {
  position: absolute;
  cursor: move;
  width: 200px;
  border: 1px solid #c1cdda;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background: white;
  z-index: 1;
}
.connected__node:hover{
  border: 1px solid #409eff;
}
.content {
  padding: 20px;
}
.ports--left {
  left: -20px;
  top: calc(100% / 2 - 10px);
  position: absolute;
  user-select: none;
  z-index: 2;
}
.ports--right {
  left: calc(100%);
  top: calc(100% / 2 - 10px);
  position: absolute;
  user-select: none;
  z-index: 2;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import NodePort from './port.vue'
import { PortEvent, ConnectionEvent } from './events'

@Component({
  components: {
    NodePort
  }
})
export default class GraphNode extends Vue {
  @Prop({ default: () => 'Node' }) name!: string
  @Prop({ default: () => null }) icon!: Vue

  NodePort = NodePort
  leftPorts = [{ id: 0 }]
  rightPorts = [{ id: 1 }]

  port = { position: { x: 0, y: 0 } }
  offset = { x: 0, y: 0 }
  isDragging = false

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

  onDisconnect(event: any) {
    this.$emit(ConnectionEvent.DISCONNECTED, event)
  }

  onMouseMove(event: MouseEvent) {
    event.preventDefault()
    const el = this.$refs.node as HTMLElement
    const width = el.offsetWidth
    const height = el.offsetHeight
    const halfHeight = Math.round(height / 2)
    this.port.position.y = event.clientY
    this.port.position.x = event.clientX
    const top = event.clientY - this.offset.y
    const left = event.clientX - this.offset.x
    el.style.top = top + 'px'
    el.style.left = left + 'px'
    const [port0, port1]: NodePort[] = this.$refs.ports as NodePort[]
    port0.updatePosition({ x: left - 10, y: top + halfHeight })
    port1.updatePosition({ x: left + width + 10, y: top + halfHeight })
  }

  onMouseDown(event: MouseEvent) {
    const target = event.target
    if (target !== this.$refs.node && target !== this.$refs.content) {
      return
    }
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
}
</script>
