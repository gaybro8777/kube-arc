<template>
    <div class="logo-container"
         @click="$router.push('/')">
        <logo class="logo"></logo>
        <div class="app-slogan">
            Kube Arc
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Logo from "~assets/icons/triangle.svg"

@Component({
    components:{
        Logo
    }
})
export default class AppLogo extends Vue {

}
</script>

<style>
.logo {
    color: #20ac90;
    transform: translate(-16px, -6px) scale(0.5);
    display: inline-block;
    position: relative;
    fill: currentColor;
}
.logo-container {
    display: inline-block;
    cursor: pointer;
    height: 58px;
}

.app-logo {
    padding: 8px 0 0 15px;
    display: inline-block;
}

.app-slogan {
    color: #20ac90;
    font-weight: 600;
    font-size: 2rem;
    padding-left: 0px;
    position: relative;
    top: -32px;
    left: -32px;
    display: inline-block;
    /* text-shadow: 0 1px 1px #22927a; */
}
</style>
