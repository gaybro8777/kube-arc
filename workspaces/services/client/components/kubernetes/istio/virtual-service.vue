<template>
  <!-- VIRTUAL SERVICE CARD -->
  <resource-card :icon="virtualServiceIcon" name="Virtual Service">
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
import virtualServiceIcon from '~/assets/icons/virtual-service.svg'

@Component({
  components: {
    resourceCard,
    virtualServiceIcon
  }
})
export default class VirtualServiceCard extends Vue {
  virtualServiceIcon = virtualServiceIcon

  dockerRepo = {
    image: '',
    tag: 'latest'
  }
}
</script>
