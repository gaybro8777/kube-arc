<template>
  <div class="copyright">
    <div class="copyright__notice">© {{ year }} 01-Alchemist ♥</div>
  </div>
</template>
<style lang="css">
.copyright {
  font-size: 0.8rem;
  display: inline-flex;
  position: absolute;
  right: 10px;
  padding: 2px;
}
</style>

// SCRIPT
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Copyright extends Vue {
  year = new Date().getFullYear()
}
</script>
