<template>
    <div class="app_main">

                <router-view>
                </router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
    }
</script>

<style scoped>
.transitionRouter-enter-active,
.transitionRouter-leave-active {
    transition: all 0.4s;
}

.transitionRouter-enter,
.transitionRouter-leave{
    transform: translate3d(100%, 0, 0);
}
.app_main {
    background-color:#f9f9f9;
    padding: 20px;
}
</style>