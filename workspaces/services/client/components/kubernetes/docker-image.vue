<template>
  <!-- DOCKER-IMAGE CARD -->
  <resource-card :icon="dockerImageIcon" name="Docker Image">
    <el-form
      slot="content"
      label-position="right"
      label-width="100px"
      :model="dockerRepo"
    >
      <el-form-item label="Registry">
        <el-input v-model="dockerRepo.registry"></el-input>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="dockerRepo.image"></el-input>
      </el-form-item>
      <el-form-item label="Tag">
        <el-input v-model="dockerRepo.tag"></el-input>
      </el-form-item>
    </el-form>
  </resource-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import resourceCard from '~/components/resource/resource-card.vue'
import dockerImageIcon from '~/assets/icons/docker-image.svg'

@Component({
  components: {
    resourceCard,
    dockerImageIcon
  }
})
export default class DockerImageCard extends Vue {
  dockerImageIcon = dockerImageIcon

  dockerRepo = {
    registry: 'dockerhub',
    image: '',
    tag: 'latest'
  }
}
</script>
