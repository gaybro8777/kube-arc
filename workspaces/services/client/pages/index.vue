<template>
  <page>
    <div slot="header">
      <div class="button-group--header">
        <el-button type="primary" icon="el-icon-plus" size="medium">
          Add
        </el-button>
      </div>
    </div>
    <div slot="content">
      <el-row class="row-block">
        <el-col :span="4">
          <el-button type="success">Service</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">Deployment</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">Virtual Service</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">Destination Rule</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">Gateway</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">Add Docker Repo</el-button>
        </el-col>
      </el-row>
      <el-row class="row-block">
        <!-- DOCKER IMAGE CARD -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Docker Image</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-delete"
            >
              Delete
            </el-button>
          </div>
          <el-form
            label-position="right"
            label-width="100px"
            :model="dockerRepo"
          >
            <el-form-item label="Image">
              <el-input v-model="dockerRepo.image"></el-input>
            </el-form-item>
            <el-form-item label="Tag">
              <el-input v-model="dockerRepo.tag"></el-input>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- SERVICE CARD -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Service</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-delete"
            >
              Delete
            </el-button>
          </div>
          <el-form
            label-position="right"
            label-width="100px"
            :model="dockerRepo"
          >
            <el-form-item label="Name">
              <el-input v-model="dockerRepo.image"></el-input>
            </el-form-item>
            <el-form-item label="Image">
              <el-input v-model="dockerRepo.tag"></el-input>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- DEPLOYMENT CARD -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Deployment</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-delete"
            >
              Delete
            </el-button>
          </div>
          <el-form
            label-position="right"
            label-width="100px"
            :model="dockerRepo"
          >
            <el-form-item label="Name">
              <el-input v-model="dockerRepo.image"></el-input>
            </el-form-item>
            <el-form-item label="Image">
              <el-input v-model="dockerRepo.tag"></el-input>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- VIRTUAL SERVICE CARD -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Virtual Service</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-delete"
            >
              Delete
            </el-button>
          </div>
          <el-form
            label-position="right"
            label-width="100px"
            :model="dockerRepo"
          >
            <el-form-item label="Name">
              <el-input v-model="dockerRepo.image"></el-input>
            </el-form-item>
            <el-form-item label="Image">
              <el-input v-model="dockerRepo.tag"></el-input>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- DESTINATION RULE CARD -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Destination Rule</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-delete"
            >
              Delete
            </el-button>
          </div>
          <el-form
            label-position="right"
            label-width="100px"
            :model="dockerRepo"
          >
            <el-form-item label="Name">
              <el-input v-model="dockerRepo.image"></el-input>
            </el-form-item>
            <el-form-item label="Image">
              <el-input v-model="dockerRepo.tag"></el-input>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- GATEWAY CARD -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Gateway</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-delete"
            >
              Delete
            </el-button>
          </div>
          <el-form
            label-position="right"
            label-width="100px"
            :model="dockerRepo"
          >
            <el-form-item label="Name">
              <el-input v-model="dockerRepo.image"></el-input>
            </el-form-item>
            <el-form-item label="Image">
              <el-input v-model="dockerRepo.tag"></el-input>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- DOMAIN CARD -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Domain</span>
            <!-- <div class="btn" style="position:relative;"> -->
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              style="float: right; padding: 3px 0; color: red;"
            >
              Delete
            </el-button>
            <!-- </div> -->
          </div>
          <el-form
            label-position="right"
            label-width="100px"
            :model="dockerRepo"
          >
            <el-form-item label="Name">
              <el-input v-model="dockerRepo.image"></el-input>
            </el-form-item>
          </el-form>
          <div class="footer" style="position:relative;height: 24px;">
            <el-button
              size="mini"
              style="right:0; position:absolute"
              type="primary"
            >
              Done
            </el-button>
          </div>
        </el-card>
      </el-row>
    </div>
    <div slot="footer" class="progress-bar--footer">
      <el-progress :percentage="30" color="#409eff"></el-progress>
    </div>
  </page>
</template>

<style lang="css">
.box-card {
  width: 300px;
  margin: 20px;
  display: inline-block;
}
</style>

<style lang="css">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.button-group--header {
  position: absolute;
  right:20px;
}
.progress-bar--footer {
  width:20%;
}
.row-block {
  padding-bottom: 20px;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import page from '~/components/page/default.vue'

@Component({
  components: {
    page
  }
})
export default class PipelinePage extends Vue {
  dockerRepo = {
    image: '',
    tag: 'latest'
  }
}
</script>
