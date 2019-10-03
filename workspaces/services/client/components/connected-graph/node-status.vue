<template>
  <div class="status-type"></div>
</template>
<style lang="css">
.status-type {
  width: 20px;
  height: 10px;
  background: orange;
}
</style>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { NodeStatusType } from './node-type'

@Component({})
export default class NodeStatus extends Vue {
  @Prop({ default: () => 'inactive', type: String }) status!: NodeStatusType
}
</script>
