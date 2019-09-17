<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div ref="container"
                     class="modal-container"
                     v-bind:style="{ width:modalWidth, height:modalHeight, padding:modalPadding }">
                    <div class="modal-header">
                        <slot name="header"></slot>
                        <el-button v-if="showClose"
                                   :class="closeClass?closeClass:'close-btn'"
                                   type="text"
                                   icon="el-icon-close"
                                   @click="$emit('close')"></el-button>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
            <div v-if="loading === true"
                 class="el-loading-mask"
                 style="">
                <div class="el-loading-spinner">
                    <svg viewBox="25 25 50 50"
                         class="circular">
                        <circle cx="50"
                                cy="50"
                                r="20"
                                fill="none"
                                class="path"></circle>
                    </svg>
                    <!---->
                </div>
            </div>
        </div>
    </transition>
</template>
<style>
.modal-mask {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: block;
    overflow: scroll;
    width: 100vw;
    height: 100vh;
}

.modal-container {
    width: 90%;
    margin: 20px auto;
    position: relative;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 40px auto 50px;
    grid-template-areas: "header" "body" "footer";
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-header {
    position: relative;
    grid-area: header;
}

.modal-header .close-btn {
    position: absolute;
    top: -10px;
    right: 0;
    color: #34495e;
}

.modal-body {
    /*margin: 20px 0;*/
    grid-area: body;
}

.modal-footer {
    /*margin: 20px 0;*/
    grid-area: footer;
}

.modal-default-button {
    float: right;
}

/*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
    @Prop({ default: "100%", type: String })
    modalHeight;
    @Prop({ default: "100%", type: String })
    modalWidth;
    @Prop({ default: "0", type: String })
    modalPadding;
    @Prop({ default: true, type: Boolean })
    showClose;
    @Prop({ default: "", type: String })
    closeClass;
    @Prop({ default: false, type: Boolean })
    loading;

    show = false;

    mounted() {
        this["$nextTick"](() => {
            this.show = true;
            document.addEventListener("keydown", e => {
                if (this.show && e.keyCode === 27) {
                    this.close();
                }
            });
        });
        const container = this.$refs["container"]
        if(window.innerHeight > container.offsetHeight) {
            container.style.top = (((window.innerHeight - 40) - container.offsetHeight) / 2) + "px";
        }
    }

    close() {
        this["$emit"]("close");
        this.show = false;
    }
}
</script>
