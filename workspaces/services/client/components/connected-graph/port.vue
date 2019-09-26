<template>
  <div class="port-container">
    <div class="port fixed"></div>
    <div
      ref="port"
      class="port"
      draggable="true"
      :style="{ left: anchorPoint.x + 'px', top: anchorPoint.y + 'px' }"
      @dragstart="onDragStart"
      @drag="onDrag"
      @dragend="onDragEnd"
    ></div>
    <!-- :style="{ left: position.x + 'px', top: position.y + 'px' }" -->
    <div class="receptor" @drop="onDrop" @dragover="onDragOver"></div>
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
  cursor: none;
  user-select: none;
  background: red;
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
// import { Action } from 'vuex-class'
// eslint-disable-next-line
import { Point } from '../common/types/point'
import { PortEvent } from './events'

@Component({})
export default class NodePort extends Vue {
  // Store actions
  // @Action('ports/getPort') getPort!: (portId: string) => any
  // @Action('ports/addPort') addPort!: (port: NodePort) => string

  initialPosition = { x: 0, y: 0 }
  position = { ...this.initialPosition }
  anchorPoint = { ...this.initialPosition }
  isMoving = false
  portId: string = ''

  mounted() {
    // this.portId = this.addPort(this)
    console.log('Port ID: ', this.portId)
  }

  onDragStart(event: DragEvent) {
    console.log('drag start')
    this.isMoving = true
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
    console.log('drag end')
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

  anchor() {
    this.isMoving = false
    this.anchorPoint.x = this.position.x
    this.anchorPoint.y = this.position.y
  }

  reset() {
    this.anchorPoint.x = this.initialPosition.x
    this.anchorPoint.y = this.initialPosition.y
  }

  // Receptor handlers
  onDragOver(event: any) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  onDrop(event: any) {
    console.log('dropped')
    event.dataTransfer.dropEffect = 'move'
    const portId = event.dataTransfer.getData('text/plain')
    event.preventDefault()
    // const droppedPort = this.getPort('portId')
    // if (droppedPort) {
    //   droppedPort.anchor()
    // }
  }
}
</script>
