<template>
  <resource-card :name="name" :icon="icon">
    <div slot="content">

    </div>
  </resource-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import resourceCard from './resource-card.vue'

@Component({
  components: {
    resourceCard
  }
})
export default class ResourceCard extends Vue {
  @Prop({ default: () => 'Untitled' }) name!: string
  @Prop({ default: () => null }) icon!: Vue
  @Prop({ default: () => {} }) resource!: any
}
</script>
