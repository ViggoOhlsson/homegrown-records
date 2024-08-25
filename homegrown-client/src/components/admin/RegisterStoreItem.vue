<script lang="ts">
import type IStoreItem from '@/models/IStoreItem'
import { computed, defineComponent, ref } from 'vue'
import FormRow from '../globals/form/FormRow.vue'
import FormSection from '../globals/form/FormSection.vue'
import NumberInput from '../globals/form/NumberInput.vue'
import SelectList from '../globals/form/SelectList.vue'
import TextInput from '../globals/form/TextInput.vue'
import TextTitle from '../globals/text/TextTitle.vue'
import TextFieldInput from '@/components/globals/form/TextFieldInput.vue'
import Text from '../globals/text/Text.vue'
import PrimaryButton from '../globals/buttons/PrimaryButton.vue'
import StoreItemFacts from '@/components/store/StoreItemFacts.vue'
import useAdminService from '@/services/useAdminService'
import { useRouter } from 'vue-router'
import {exampleStoreItems} from "@/api"

export default defineComponent({
	components: { 
        TextTitle, 
        TextInput, 
        FormSection, 
        FormRow, 
        NumberInput, 
        SelectList, 
        TextFieldInput, 
        Text, 
        PrimaryButton,
        StoreItemFacts
        },
    setup() {
        const router = useRouter()
        const { registerStoreItem } = useAdminService()
        const title = ref("")
        const cost = ref(0)
        const type = ref("Type")
        const category = ref("Category")
        const thumbnail = ref("")
        const tracklistRaw = ref("")
        const tracklist = computed(() => tracklistRaw.value.split(", "))
        const description = ref("")
        const titleData = ref("")
        const artist = ref("")
        const brand = ref("")
        const discs = ref(0)
        const releaseYear = ref(0)
        const storeItemPreview = computed<IStoreItem>(() => { return {
            title: title.value,
            costUSD: (cost.value -0.05 < 0 ? 0 : cost.value - 0.05),
            type: type.value,
            category: category.value,
            thumbnail: thumbnail.value,
            costSEK: 0,
            data: {
                ...(tracklistRaw.value ? {tracklist: tracklist.value} : null),
                title: titleData.value,
                artist: artist.value,
                description: description.value,
                discs: discs.value,
                brand: brand.value,
                releaseYear: releaseYear.value,
            },
            dateAdded: new Date(),
            _id: "65148681fe750175c9c08c8f" //temporär fix, ta bort senare
        }})

        const onSubmit = async () => {
            // let res = await registerStoreItem(storeItemPreview.value)
            exampleStoreItems.push(storeItemPreview.value)

            router.push({name: 'store-item', params: {id: storeItemPreview.value._id}})
        }
        
        return {
            title,
            cost,
            type,
            category,
            thumbnail,
            tracklistRaw,
            description,
            titleData, 
            artist,
            brand,
            discs,
            releaseYear,
            storeItemPreview,
            onSubmit
        }
    },
})
</script>

<template>
    <div class="register-store-item-wrapper">
        <TextTitle center bold>Register Store Item</TextTitle>
        <FormSection>
            <TextTitle bold>Title</TextTitle>
            <TextInput v-model="title" placeholder="Store item title"></TextInput>
        </FormSection>
        <FormSection>
            <TextTitle bold>Cost (USD)</TextTitle>
            <NumberInput v-model="cost" placeholder="Item cost"></NumberInput>
            <Text dim>(${{storeItemPreview.costUSD}})</Text>
        </FormSection>
        <FormRow>
            <FormSection>
                <TextTitle bold>Type</TextTitle>
                <SelectList v-model="type" :options="['Vinyl', 'CD', 'Hardware']"></SelectList>
            </FormSection>
            <FormSection>
                <TextTitle bold>Category</TextTitle>
                <SelectList v-model="category" :options="['Any', 'LP', 'EP', 'Single', 'Record Player', 'Speakers', 'Amplifier', 'Headphones', 'Other']"></SelectList>
            </FormSection>
        </FormRow>
        <FormSection>
            <TextTitle bold>Thumbnail</TextTitle>
            <TextInput v-model="thumbnail" placeholder="Store item thumbnail"></TextInput>
            <Text dim>(Thumbnail should be square.)</Text>
        </FormSection>
        <p></p>
        <TextTitle center bold>Other Data</TextTitle>
        <Text dim center>All following fields are optional</Text>
        <FormSection>
            <TextTitle bold>Description</TextTitle>
            <TextFieldInput v-model="description" placeholder="Enter description here"></TextFieldInput>
        </FormSection>
        <FormSection>
            <TextTitle bold>Tracklist</TextTitle>
            <TextFieldInput v-model="tracklistRaw" placeholder="Separate with commas"></TextFieldInput>
        </FormSection>
        <FormRow>
            <FormSection>
                <TextTitle bold>Title</TextTitle>
                <TextInput v-model="titleData" placeholder="Store item data title"></TextInput>
            </FormSection>
            <FormSection>
                <TextTitle bold>Artist</TextTitle>
                <TextInput v-model="artist" placeholder="Store item artist"></TextInput>
            </FormSection>
        </FormRow>
        <FormRow>
            <FormSection>
                <TextTitle bold>Release Year</TextTitle>
                <NumberInput v-model="releaseYear" placeholder="Store item release year"></NumberInput>
            </FormSection>
            <FormSection>
                <TextTitle bold>Discs</TextTitle>
                <NumberInput v-model="discs" placeholder="Store item discs"></NumberInput>
            </FormSection>
        </FormRow>
        <FormRow>
            <FormSection>
                <TextTitle bold>Brand</TextTitle>
                <TextInput v-model="brand" placeholder="Store item brand"></TextInput>
            </FormSection>
        </FormRow>
        <FormSection>
            <StoreItemFacts :storeItem="storeItemPreview" registering></StoreItemFacts>
        </FormSection>
        <FormSection>
            <PrimaryButton @click="onSubmit">Submit</PrimaryButton>
        </FormSection>
    </div>  
</template>

<style lang="scss" scoped>

</style>