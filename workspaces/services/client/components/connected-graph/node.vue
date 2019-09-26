<template>
  <div class="connected__node">
    <div class="ports">
      <port
        @move="onMove"
        @moveEnd="onMoveEnd"
        @moveStart="onMoveStart"
        @connected="onConnect"
        @disconnected="onDisconnect"
      ></port>
    </div>
    <div class="clearfix">
      <component :is="icon" v-if="icon" class="box-card__icon"></component>
      <span>{{ name }}</span>
      <el-button
        size="mini"
        type="text"
        icon="el-icon-delete"
        style="float: right; padding: 3px 0; color: red;"
      >
      </el-button>
    </div>
    <slot name="content">
      <div>x:{{ port.position.x }}, y:{{ port.position.y }}</div>
    </slot>
  </div>
</template>

<style lang="css">
.connected__node {
  width: 200px;
  border: 1px solid #c1cdda;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 20px;
  margin: 20px;
}
.connected__node:hover{
  border: 1px solid #409eff;
}
.ports {
  left: calc(100% + 20px);
  position: relative;
  user-select: none;
  z-index: 2;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import port from './port.vue'
import { PortEvent, ConnectionEvent } from './events'

@Component({
  components: {
    port
  }
})
export default class GraphNode extends Vue {
  @Prop({ default: () => 'Node' }) name!: string
  @Prop({ default: () => null }) icon!: Vue

  port = { position: { x: 0, y: 0 } }

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
    console.log('onConnect-node:', event)
    this.$emit(ConnectionEvent.CONNECTED, event)
  }

  onDisconnect(event: any) {
    this.$emit(ConnectionEvent.DISCONNECTED, event)
  }
}
</script>
