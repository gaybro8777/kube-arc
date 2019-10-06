<template>
  <div class="app-logo">
    <app-icon class="app-icon--32"></app-icon>
    <div class="slogan">Kuberneteasy</div>
  </div>
</template>

<style lang="css">
.app-logo {
  width: 160px;
  display: inline-flex;
}
.app-icon--32 {
  height: 32px;
  width: 32px;
}
.slogan {
  height: 32px;
  padding: 10px;
  font-weight: 600;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AppIcon from '~/assets/icons/triangle.svg'

@Component({
  components: {
    AppIcon
  }
})
export default class AppLogo extends Vue {
  test: boolean = false
  mounted() {
    this.test = false
  }
}
</script>
