<template>
  <div class="connected__node">
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
    <slot name="content"></slot>
  </div>
</template>

<style lang="css">
.connected__node {
  width: 150px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 20px;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Connected extends Vue {
  @Prop({ default: () => 'Untitled' }) name!: string
  @Prop({ default: () => null }) icon!: Vue
}
</script>
