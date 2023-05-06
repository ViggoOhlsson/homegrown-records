<script lang="ts">
import { defineComponent } from 'vue'
import TextTitle from "@/components/globals/text/TextTitle.vue"
import XButton from '../buttons/XButton.vue'

export default defineComponent({
    components: {
        TextTitle,
        XButton
    },
    props: {
        title:String,
        show:Boolean
    },
    emits: [
        "close"
    ],
    setup(props, {emit}) {
        const close = () => emit("close")
        return {
            close,
        }
    },
})
</script>

<template>
    <transition name="modal-transition">
        <div class="modal-base" v-if="$props.show">
            <div class="modal" @blur="close">
                <div class="modal-head">
                    <TextTitle class="title" bold>{{$props.title}}</TextTitle>
                    <XButton @click="close" />
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
    .modal-transition {
        &-enter-from, &-leave-to {
            opacity: 0;
        }
        &-enter-active, &-leave-active {
            transition: all 0.2s ease;
        }
    }

    .modal-base {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 0;
        right: 0;
        height: 100vh;
        width: 100vw;
        z-index: 2;
        background: rgba($color: #000000, $alpha: 0.5);
    }
    .modal {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        background: $dark-color2;
        width: 90%;
        max-height: 70%;
        overflow-y: auto;
        @include desktop {
            width: 80%;
            min-height: 300px;
        }
        &-head {
            display: flex;
            align-items: center;
            .title {
                text-align: center;
                flex-grow: 1;
            }
        }
        &-body {  
            padding: 20px;
            flex-grow: 1;
        }
        &-footer {
            display: grid;
            grid-template-columns: 1fr 1fr;
            @include tablet {
            display: flex;
            justify-content: space-between;

            }
        }
    }

</style>