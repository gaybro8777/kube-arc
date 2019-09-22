<template>
  <!-- VIRTUAL SERVICE CARD -->
  <resource-card :icon="virtualServiceIcon" name="Virtual Service">
    <el-form
      slot="content"
      label-position="right"
      label-width="100px"
      :model="data"
    >
      <el-form-item label="Name">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="Hosts">
        <el-input v-model="data.hosts"></el-input>
      </el-form-item>
      <el-form-item label="Gateways">
        <el-select
          v-model="data.gateways"
          filterable
          placeholder="Select gateways"
        >
          <el-option
            v-for="gateway in gatewayList"
            :key="gateway"
            :label="gateway"
            :value="gateway"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="http">
        <el-input v-model="data.http"></el-input>
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

  gatewayList = ['gateway-1', 'gateway-2']

  data = {
    name: '',
    hosts: '*',
    gateways: '*'
  }
}
</script>
