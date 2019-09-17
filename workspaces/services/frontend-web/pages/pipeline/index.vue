<template>
  <page>
    <div slot="content">
      {{ message }}
    </div>
  </page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Page from "~/components/page/default.vue"

@Component(
  {
    components: {
      Page
    }
  }
)
export default class PageIndex extends Vue {
  message: string = 'Pipeline'
}
</script>
