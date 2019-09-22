<template>
  <!-- DOMAIN CARD -->
  <resource-card :icon="domainIcon" name="Domain">
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
import domainIcon from '~/assets/icons/domain.svg'

@Component({
  components: {
    resourceCard,
    domainIcon
  }
})
export default class DomainCard extends Vue {
  domainIcon = domainIcon

  dockerRepo = {
    image: '',
    tag: 'latest'
  }
}
</script>
