import { defineStore } from "pinia";
import { ref, watch } from "vue";

export default defineStore('app', () => {

    const title = ref("")
    const currency = ref(localStorage.getItem("currency") || "USD")
    const locale = Intl.DateTimeFormat().resolvedOptions().locale

    watch(currency, (newValue) => {
        console.log("currency set to", newValue);
        
        localStorage.setItem("currency", newValue)
    })
    
    watch(title, () => {
        document.title = title.value
    })

    return {
        title,
        currency,
        locale
    }
})