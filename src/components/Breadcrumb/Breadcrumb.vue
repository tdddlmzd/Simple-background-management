<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{item.title}}</el-breadcrumb-item>
</el-breadcrumb>
</div>
</template>

<script>
export default {
   props: ["matched"],
    data(){
        return {
          breadcrumb:[]
        }
    },
    methods : {
      getRoute(){
        for (var i = 0; i < this.matched.length; i++) {
          this.breadcrumb.push({
              "path":this.matched[i].path,
              "title":this.matched[i].meta.title,
            })      
          };
      }
    },
    mounted(){

    },
    computed:{
      mat(){
        return this.matched;
      }
    },
    watch:{
      "mat":function(nValue) {
          this.getRoute();
      }
    }
  }
</script>

<style>

</style>