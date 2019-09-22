<template>
  <!-- DEPLOYMENT CARD -->
  <resource-card :icon="deploymentIcon" name="Deployment">
    <el-form
      slot="content"
      label-position="right"
      label-width="100px"
      :model="data"
    >
      <el-form-item label="Name">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="Service">
        <el-select
          v-model="data.service"
          filterable
          placeholder="Select service"
        >
          <el-option
            v-for="service in serviceList"
            :key="service"
            :label="service"
            :value="service"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Version">
        <el-input v-model="data.version"></el-input>
      </el-form-item>
      <el-form-item label="Image">
        <el-select v-model="data.image" filterable placeholder="Select image">
          <el-option
            v-for="image in imageList"
            :key="image"
            :label="image"
            :value="image"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Pull Image">
        <el-select
          v-model="data.imagePullPolicy"
          filterable
          placeholder="Select Image Pull-Policy"
        >
          <el-option
            v-for="image in imagePullPolicyList"
            :key="image"
            :label="image"
            :value="image"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Replicas">
        <el-input v-model="data.replicas" type="number"></el-input>
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

  serviceList = ['service-1']
  imageList = ['image-1']
  imagePullPolicyList = ['Never', 'Always', 'IfNotPresent']

  data = {
    name: 'Untiled-Deployment',
    service: '',
    image: '',
    imagePullPolicy: '',
    version: 'v0.0.1',
    replicas: 1
  }
}
</script>
