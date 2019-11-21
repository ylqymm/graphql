<!--  app的框架结构-->
<template>
  <v-layout>
    <v-flex>
      <side-bar></side-bar>
    </v-flex>
    <v-flex class="is_big">
      <v-layout>
        <v-flex md12>
          <top-bar></top-bar>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex md12>
          <app-main></app-main>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import appMain from './components/appMain.vue';
import sideBar from './components/sideBar.vue';
import topBar from './components/topBar.vue';
export default {
  data () {
    return {
    };
  },

  components: {
    appMain,
    sideBar,
    topBar
  }
  
}

</script>
<style scoped>
.is_big {
  width:100% !important;
}
</style>