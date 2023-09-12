<template>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <p>測試千分位：一共 {{ $thousandths(1000) }} 元</p>

  vuex:"{{ test }}"

  <IsLoading v-model:active="isLoading"></IsLoading>
</template>

<script>
import { mapState } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },

  data () {
    return {
      isLoading: false
    }
  },

  computed: {
    ...mapState('test', ['test'])
  },

  mounted () {
    this.isLoading = true
    this.$http.get('https://randomuser.me/api/')
      .then(res => {
        console.log(res)
        this.isLoading = false
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
