<template>
  <!-- SERVICE CARD -->
  <resource-card :icon="serviceIcon" name="Service">
    <el-form
      slot="content"
      label-position="right"
      label-width="100px"
      :model="data"
    >
      <el-form-item label="Name">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="Port">
        <el-input v-model="data.ports.port" placeholder="Port" type="number">
          <el-select
            slot="prepend"
            v-model="data.ports.protocol"
            placeholder="Protocol"
            style="width: 110px;"
          >
            <el-option label="TCP" value="tcp"></el-option>
            <el-option label="UDP" value="udp"></el-option>
            <el-option label="SCTP" value="sctp"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="Target Port">
        <el-input
          v-model="data.ports.targetPort"
          placeholder="Target Port"
          type="number"
        >
        </el-input>
      </el-form-item>
    </el-form>
  </resource-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import serviceAPI from './core-apis.json'
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
  serviceAPI = serviceAPI

  data = {
    name: 'Untitled-Service',
    selector: {
      app: 'Untitled-Service'
    },
    ports: {
      port: '80',
      protocol: 'tcp',
      targetPort: '3000'
    }
  }
}
</script>
