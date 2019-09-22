<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <component :is="icon" v-if="icon" class="box-card__icon"></component>
      <span>{{ name }}</span>
      <el-button
        size="mini"
        type="text"
        icon="el-icon-delete"
        style="float: right; padding: 3px 0; color: red;"
      >
        Delete
      </el-button>
    </div>
    <slot name="content"></slot>
    <div class="footer" style="position:relative;height: 24px;">
      <el-button size="mini" style="right:0; position:absolute" type="primary">
        Done
      </el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ResourceCard extends Vue {
  @Prop({ default: () => 'Untitled' }) name: string
  @Prop({ default: () => null }) icon: Vue
}
</script>
