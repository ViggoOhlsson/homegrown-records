<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import type { PropType } from "vue"
import type IStoreFilter from "@/models/IStoreFilter"
import TextTitle from "@/components/globals/text/TextTitle.vue"
import SelectList from '../globals/form/SelectList.vue'
import PrimaryButton from '../globals/buttons/PrimaryButton.vue'
import SearchInput from '../globals/form/SearchInput.vue'

export default defineComponent({
    components: {
        TextTitle,
        SelectList,
        PrimaryButton,
        SearchInput
    },
    props: {
        modelValue: {
            type: Object as PropType<IStoreFilter>,
            required:true
        }
    },
    emits: [
        "update:modelValue",
        "changeGridStyle"

    ],
    setup(props, { emit }) {
        const type = ref(localStorage.getItem("filter-type") || "Any")
        watch(type, (value, oldvalue) => {localStorage.setItem("filter-type", value), emitFilter()})

        const category = ref(localStorage.getItem("filter-category") || "Any")
        watch(category, (value, oldvalue) => {localStorage.setItem("filter-category", value), emitFilter()})
        
        const orderBy = ref(localStorage.getItem("filter-orderBy") || "Any")
        watch(orderBy, (value, oldvalue) => {localStorage.setItem("filter-orderBy", value), emitFilter()})

        const searchValue = ref(localStorage.getItem("filter-searchValue") || "")
        watch(searchValue, (value, oldvalue) => {localStorage.setItem("filter-searchValue", value), emitFilter()})

        onMounted(() => emitFilter())

        const emitFilter = () => {
            const filter = {
                ...(type.value === "Any" ? null : {type: type.value}),
                ...(category.value === "Any" ? null : {category: category.value}),
                ...(orderBy.value === "Any" ? null : {order: orderBy.value}),
                ...(!searchValue.value ? null : {search: searchValue.value})
            }
            emit("update:modelValue", filter)
        }
        
        const resetFilter = () => {
            type.value = "Any"
            category.value = "Any"
            orderBy.value = "Any"
            searchValue.value = ""
        }

        const categoryOptions = computed(() => {
            if (type.value === "Vinyl" || type.value === "CD") return ['Any', 'LP', 'EP', 'Single']
            if (type.value === "Hardware") return ['Any', 'Record Player', 'Speakers', 'Amplifier', 'Headphones', 'Other']
            else return['Any', 'LP', 'EP', 'Single', 'Record Player', 'Speakers', 'Amplifier', 'Headphones', 'Other']
        })

        return {
            type,
            category,
            orderBy,
            resetFilter,
            searchValue,
            categoryOptions
        }
    },
})
</script>

<template>
    <div class="store-filter">
        <div class="filter-head">
            <TextTitle :em="1.4" bold><i class="fa-solid fa-filter"></i> Filter</TextTitle>
            <PrimaryButton @click="resetFilter"><i class="fa-solid fa-refresh"></i>Reset Filter</PrimaryButton>
        </div>
        <div class="filter-grid">
            <div class="grid-cell">
                <TextTitle bold><i class="fa-solid fa-tag"></i> Type</TextTitle>
                <SelectList v-model="type" :options="['Any', 'Vinyl', 'CD', 'Hardware']"></SelectList>
                <TextTitle bold><i class="fa-solid fa-tags"></i> Category</TextTitle>
                <SelectList v-model="category" :options="categoryOptions"></SelectList>
            </div>
            <div class="grid-cell">
                <TextTitle bold><i class="fa-solid fa-arrow-up-z-a"></i> Order By</TextTitle>
                <SelectList v-model="orderBy" :options="['Any', 'Newest', 'Oldest', 'Alphabetically A-Z', 'Alphabetically Z-A', 'Cost Lowest-Highest', 'Cost Highest-Lowest']"></SelectList>
            </div>
            <div class="grid-cell">
                <TextTitle bold><i class="fa-solid fa-order-by"></i> Search</TextTitle>
                <SearchInput v-model="searchValue" placeholder="Enter Search Term..." />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.store-filter {
    margin: 10px 0 0;
    padding: 10px 10px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .filter-head {
        display: flex;
        flex-direction: column;
        gap:10px;
        align-items: flex-start;
    }
    .filter-grid {
        display: grid;
        flex-direction: column;
        grid-template-columns: 1fr;
        gap: 20px;
        align-items: flex-start;
        @include desktop {
            flex-direction: row;
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .grid-cell {
            display: flex;
            flex-direction: column;
            gap:10px;
            background: $dark-color2;
            padding: 10px;
            select {
                font-size: 1em;
                font-weight: bold;
                appearance: none;
                background: $dark-color3;
                color: white;
                border-radius: none;
                border:none;
                padding: 10px;
                cursor: pointer;
                outline: none;
                &::after {
                    border: none;
                }
                option {
                    appearance: none;
                    border:none;

                    &:nth-child(odd) {
                        background-color:$dark-color4;

                    }
                }
            }
        }
    }
}

</style>