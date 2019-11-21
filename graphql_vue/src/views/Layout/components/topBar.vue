<template>
  <v-layout class="top_bar">
    <v-flex md9>study · {{title}}</v-flex>
    
  </v-layout>
  
</template>
<script>
export default {
  data() {
    return {
      tile: true,
      hasimg: true,
      searchText: "",
      hasSearch: false,
      hasclickAvatar: false,
      overlap: true,
      text: "1",
      aboutme:false,
      loginout:false,
      active:false
    };
  },
  methods: {
    showSearch() {
      this.hasclickAvatar=false
      this.hasSearch = !this.hasSearch;
    },
    showUserLogin() {
      this.hasSearch=false
      this.hasclickAvatar = !this.hasclickAvatar;
    },
    mycenter(){
        console.log("关于我的")
        this.hasclickAvatar=false
    },
    loginOut(){
        console.log("退出")
        this.hasclickAvatar=false

    }
    
  },
  computed: {
    title() {
      return this.$route.name;
    }
  }
};
</script>
<style>
.topbar-notice .v-badge__badge {
  width: 10px !important;
  height: 10px !important;
  display: inline-block;
}
.topbar-notice .v-badge--overlap .v-badge__badge {
  top: 4px;
  right: -5px;
}
.v-tabs__item{
width:60px!important;
}
</style>

<style  scoped>
.currclick-active{
background:red;
}
.center {
  display: flex;
  width: 60px;
  height: 40px;
  justify-content: center;
  border-radius: 5px;
}
.top_bar {
  background-color: #fff;
  height: 60px;
  padding: 10px;
  line-height: 35px;
  justify-content: space-between;
}
.topbar-notice {
  padding-top: 5px;
}
.divided_line {
  display: inline-block;
  width: 2px;
  height: 25px;
  background: #f4f4f4;
  margin: 9px 5px 0 10px;
}
.topbar-avatar {
  position: relative;
  align-items: center;
  display: flex;
}
.menu_down {
  position: absolute;
  bottom: 0px;
  left: 15px;
}
.mx-auto {
  position: absolute;
  left: 100px;
  top: 13px;
  z-index: 888;
}
#tabs {
  position: relative;
}
.search_side {
  position: absolute;
  top: -51px;
  left: -241px;
}
 .fade-enter, .fade-leave-to {
  transition: translateX(-100px);
  opacity: 0;
  transition:0.5s ease-in-out;
}
 .fade-enter-active,
.fade-leave-active {
  transition: 0.5s ease-in-out;
}
</style>