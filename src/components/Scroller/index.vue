<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import Bscroll from "better-scroll";
export default {
  name: "Scroller",
  //父子通讯
  props : {
      handleToScroll : {
          type : Function,
          default : function(){}
      },
        handleTouchEnd :{
              type : Function,
              default : function (){}
          }
  },
  mounted() {
    var scroll = new Bscroll(this.$refs.wrapper, {
      tap: true,
      probeType: 1
    });
    this.scroll = scroll;
    scroll.on('scroll',(pos)=>{
        this.handleToScroll(pos);
    });
     scroll.on('touchEnd',(pos)=>{
        this.handleTouchEnd(pos);
    });
    
  },
  methods:{
    //跳转到指定的位置
    toScrollTop(y){
        this.scroll.scrollTo(0,y);
    }
  }
}
</script>
<style scoped>
.wrapper {
  height: 100%;
}
</style>