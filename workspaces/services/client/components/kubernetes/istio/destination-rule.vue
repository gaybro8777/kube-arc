<template>
  <!-- VIRTUAL SERVICE CARD -->
  <resource-card :icon="destinationRuleIcon" name="Destination Rule">
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
import destinationRuleIcon from '~/assets/icons/destination-rule.svg'

@Component({
  components: {
    resourceCard,
    destinationRuleIcon
  }
})
export default class DestinationRuleCard extends Vue {
  destinationRuleIcon = destinationRuleIcon

  dockerRepo = {
    image: '',
    tag: 'latest'
  }
}
</script>
