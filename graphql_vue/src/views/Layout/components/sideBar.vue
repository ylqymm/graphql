<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    hide-overlay
    stateless
    class="my_drawer"
    :style="flag"
  >
    <v-toolbar flat class="transparent"></v-toolbar>

    <v-list class="pt-0" dense>
      <v-list-group prepend-icon="menu" value="true" no-action>
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>graphql</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-tile
          v-for="(item,  i)  in  user"
          :key="i"
          @click="goUser(item)"
        >
          <v-list-tile-title v-text="item"></v-list-tile-title>
        </v-list-tile>
      </v-list-group>
    </v-list>
    <div class="collaspe">
      <v-btn icon @click.stop="mini = !mini">
        <v-icon style="color:#999">&lt;&lt;</v-icon>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { tile: "Home", icon: "dashboard" },
        { tile: "About", icon: "question_answer" }
      ],
      mini: false,
      right: null,
      active: -1,
      mini: false,
      right: null,
      user: ["用户"],
    };
  },
  methods: {
    goUser(item) {
      if (item == "用户") {
        this.$router.push("/");
      }
    }
  },
  computed: {
    flag() {
      return this.mini == true ? "width:80px" : "width:230px";
    }
  }
};
</script>

<style scoped>
.my_drawer {
  background-color: #f3f6fb !important;
}
.my_logo {
  padding: 10px;
  height: 52px !important;
}
.collaspe {
  position: fixed;
  bottom: 0;
  left: 0;
  padding-left: 165px;
  border-top: 1px solid #999;
  color: #999 !important;
}
.v-application--is-ltr .v-list-group--no-action>.v-list-group__items>div>.v-list-item{
  padding-left: 98px!important;
}
</style>
