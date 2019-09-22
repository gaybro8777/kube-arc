<template>
  <!-- GATEWAY CARD -->
  <resource-card :icon="gatewayIcon" name="Gateway">
    <el-form
      slot="content"
      label-position="right"
      label-width="100px"
      :model="dockerRepo"
    >
      <el-form-item label="Name">
        <el-input v-model="dockerRepo.image"></el-input>
      </el-form-item>
    </el-form>
  </resource-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import resourceCard from '~/components/resource/resource-card.vue'
import gatewayIcon from '~/assets/icons/gateway.svg'

@Component({
  components: {
    resourceCard,
    gatewayIcon
  }
})
export default class GatewayCard extends Vue {
  gatewayIcon = gatewayIcon

  dockerRepo = {
    image: '',
    tag: 'latest'
  }
}
</script>
