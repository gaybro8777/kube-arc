<template>
  <!-- DEPLOYMENT CARD -->
  <resource-card :icon="deploymentIcon" name="Deployment">
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
import deploymentIcon from '~/assets/icons/deployment.svg'

@Component({
  components: {
    resourceCard,
    deploymentIcon
  }
})
export default class DeploymentCard extends Vue {
  deploymentIcon = deploymentIcon

  dockerRepo = {
    image: '',
    tag: 'latest'
  }
}
</script>
