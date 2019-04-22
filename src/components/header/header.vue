<template>
    <div class="header">
        <span class="icon-add_circle"></span>
        <div class="box"></div>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl'

    .box
        height px2rem(75)
        width px2rem(75)
        background red
</style>