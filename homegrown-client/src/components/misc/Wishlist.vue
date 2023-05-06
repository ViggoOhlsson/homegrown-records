<script lang="ts">
import useUser from '@/stores/useUser'
import { defineComponent } from 'vue'
import Text from "@/components/globals/text/Text.vue"
import SecondaryButton from '../globals/buttons/SecondaryButton.vue'
import { storeToRefs } from 'pinia'
import useStoreService from '@/services/useStoreService'

export default defineComponent({
    components: {
        Text,
        SecondaryButton
    },
    setup() {
        const user = useUser()
        const {wishlist} = storeToRefs(user)
        const { setToWishlist } = useStoreService()

        const onSetToWishlist = async (id: string) => {
            const newWishlist = await setToWishlist(id)
            if (!user.data) return
            wishlist.value = newWishlist
        }
        
        return {
            onSetToWishlist,
            user
        }
    },
})
</script>

<template>
    <div class="wishlist">
        <div v-for="item in user.wishlist" :key="item._id" class="item">
            <div class="thumbnail">
                <img :src="item.thumbnail" :alt="item.title">
            </div>
            <Text class="body" bold>{{item.title}}</Text>
            <SecondaryButton @click="onSetToWishlist(item._id)" square><i class="fa-solid fa-trash"></i></SecondaryButton>
            <SecondaryButton @click="$router.push({name: 'store-item', params: {id: item._id}})" square><i class="fa-solid fa-arrow-right"></i></SecondaryButton>
        </div>
    </div>
</template>

<style lang="scss">
.wishlist {
    display: flex;
    flex-direction: column;
    margin: 10px 0 0;
    .item {
        display: flex;
        align-items: center;
        gap:10px;
        .thumbnail {
            margin: 10px 0 10px 10px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1/1;
            align-content: center;
            img {
                height: 100%;
            }
        }
        .body {
            flex-grow: 1;
            font-size: 0.8em;
        }
        button {
            height: 100%;
        }

        &:nth-child(odd) {
            background: $dark-color3;
        }
    }
}

</style>