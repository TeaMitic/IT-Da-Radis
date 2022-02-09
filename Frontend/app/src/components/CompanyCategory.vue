<template >
    <div @dblclick="enableInput(category)" class="category d-flex flex-row justify-content-between align-items-center card mx-2 my-1 rounded p-1">
        <input type="text" disabled v-bind:id="category" class="rounded category-input mx-1 px-2  " v-model="category"/>
        <button @click="removeCategory" v-if="editable" class="btn btn-sm btn-danger rounded-circle dugme ml-5 ">X</button>
    </div>
</template>
<script>
export default {
    props: { 
        category: { 
            required: true,
            type: String
        },
        allCategories: { 
            required: true,
            type: Array
        }
  },
  data() {
      return {
          editable: false
      }
  },
  methods: {
      enableInput(id) { 
          let inputPolje = document.getElementById(`${id}`)
          inputPolje.disabled = this.editable
          this.editable = !this.editable;

      },
      removeCategory() { 
          this.$store.dispatch('postaviCurrentCompanyCategories',this.allCategories.filter(cat => cat != this.category))
      }
  },

}
</script>
<style scoped>
 .dugme {
  color: white;
  outline: none;
  font-weight: 600;
  height: 30px;
  width: 30px;

}

.rounded { 
  border-radius: 10px !important;
}
.category::left { 
    
}
.category-input { 
    border-style:none;
}
.card {
    background-color: whitesmoke;
}
</style>