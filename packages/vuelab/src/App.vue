<script setup lang="ts">
import MenuBar from './components/MenuBar.vue';
import MenuBarAcc from './components/MenuBar_acc.vue';


</script>

<template>
    <h2 style="margin: 50px 0 30px" > Questo menu non è proprio accessibile </h2>
    <MenuBarAcc />
    <h2 style="margin: 50px 0 30px"> Ecco un menu accessibile </h2>
    <MenuBar />
</template>

<style>
</style>
