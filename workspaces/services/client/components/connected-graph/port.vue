<template>
  <div class="port" @mousedown="onMouseDown"></div>
</template>

<style lang="css">
.port {
  width: 10px;
  height: 10px;
  background: #409eff;
  position: absolute;
  right: -30px;
  top: 5px;
  cursor: pointer;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { PortEvent } from './events'

@Component({})
export default class NodePort extends Vue {
  port = { x: 0, y: 0 }
  onMouseDown(event: MouseEvent) {
    this.$emit(PortEvent.MOVE_START, { port: this.port })
  }
}
</script>
