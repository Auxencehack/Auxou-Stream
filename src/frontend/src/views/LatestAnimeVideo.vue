<template>
  <!-- all content -->
  <div class="bg-white overflow-hidden">
    <!-- top bar -->
    <div class="border-b flex px-6 py-2 items-center flex-none">
        <div class="flex flex-col">
            <h3 class="text-grey-darkest mb-1 font-extrabold">👑 Video Section</h3>
            <div class="text-grey-dark text-sm truncate">
              💖 Enjoy the world of anime
            </div>
        </div>

        <div class="flex-1 justify-center hidden sm:flex">
          <!--<v-suggest :data="latest" type="text" placeholder="Search Anime ..." show-field="title" v-model="latestModel" class="border border-grey px-8 py-2 w-1/2 max-w-md outline-none rounded-l"></v-suggest> -->
          <!--<input type="text" placeholder="Search Anime ..." class="border border-grey px-3 py-2 w-1/2 max-w-md outline-none rounded-l"/> -->

            <!--<button class="flex justify-center items-center bg-grey-lighter px-6 border border-grey border-l-0 rounded-r focus:outline-none hover:bg-gray-100">

            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" class="w-5 opacity-50"><g>
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </g>
            </svg>
          </button> -->
        </div>

        <!-- href links to platforms and social media -->
        <div class="flex justify-start items-center text-gray-500">
          <a href="https://github.com/ChrisMichaelPerezSantiago/ryuanime" class="block flex items-center hover:text-gray-700 mr-5">
            <svg class="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>GitHub</title>
              <path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0">
              </path>
            </svg>
          </a>
        </div>

    </div>

    <!-- content inside -->
    <div class="px-6 py-4 flex-1 overflow-y-scroll scrollbar" id="style-1">
      <div v-if="isLoading">
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
      <div class="flex flex-wrap" v-else>
        <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
          <Video :Id="id" :Title="title" :Eps="eps" :Synopsis="synopsis" :ContentType="types.content" :State="state"/>
        </div>

         <!--  aside -->
        <aside class="w-full md:max-w-xs xl:max-w-full xl:w-1/4 md:pl-16 mt-5 md:mt-4">
          <!-- up next -->
          <div class="w-full">
            <div class="flex w-full items-center justify-between mb-3">
              <span><i class="fas fa-sort-numeric-down"></i> Select Episode
                <!-- select episode -->
                <select class="list-reset border border-purple-200 rounded w-20 font-sans" v-model="eps">
                  <option v-for="(episode , index) in Array.from({length: types.totalEps}, (v , k) => k + 1)"
                    :value="episode"
                    :key="index"
                    >
                    {{ episode }}
                  </option>
                </select>
              </span>

            </div>

            <div class="max-w-sm rounded shadow-2xl border-indigo-900 overflow-hidden shadow-lg">
              <img class="w-full" :src="poster" :alt="title">
            </div>

          </div>
        </aside>
      </div>
    </div>

  </div>
</template>

<script>
  import Video from '../components/Video'
  import {mapState , mapGetters} from 'vuex'
  import store from '../store/store'
  export default {
    name: "home",
    components:{
      Video
    },
    data(){
      return{
        latestModel: '',
        id: this.$route.params.id,
        title: this.$route.params.title,
        synopsis: this.$route.params.synopsis,
        poster: this.$route.params.poster,
        state: this.$route.params.state,
        types:{
          totalEps: this.$route.params.type.replace(/[^0-9]/g,'') || 25, //,
          content: this.$route.params.type.split('/')[0].trim() || ''
        } ,
        eps: null,
      }
    },
    computed:{
      ...mapState(['latest' , 'isLoading']),
    },
    created(){
      if(this.types.content.includes('Pelicula')){
        //alert('is a movie');
        this.types.totalEps = 1;
      }
    },
    watch:{
      eps: function(){
        store.dispatch('GET_LATEST_DATA')
      }
    },
    mounted(){
      store.dispatch('GET_LATEST_DATA')
    }
  };
</script>



<style scoped>
eps-select{
  border-color: coral !important;
}
</style>
