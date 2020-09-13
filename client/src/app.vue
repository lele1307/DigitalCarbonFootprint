<template>
    <div class="container" id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    created(){
        console.log($)
    }
}
</script>
<style scoped>
#app{
    width:100%;
    height: 100%;
}
</style>