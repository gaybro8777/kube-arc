<template>
  <!-- SERVICE CARD -->
  <resource-card :icon="serviceIcon" name="Service">
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
import serviceIcon from '~/assets/icons/service.svg'

@Component({
  components: {
    resourceCard,
    serviceIcon
  }
})
export default class ServiceCard extends Vue {
  serviceIcon = serviceIcon

  dockerRepo = {
    image: '',
    tag: 'latest'
  }
}
</script>
