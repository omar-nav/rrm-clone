<template>
  <div class="home">
    <input v-model="name" /> Name
    <p>{{name}}</p>
    <button @click="send()">Send to API</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name      : "home",
  components: {

  },
  data() {
    return {
      name: "Jorge"
    }
  },
  methods: {
    send: function () {
      console.log("Send to API!")
      
      axios.post('http://localhost:1337/name', {
        name: this.name
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }
};
</script>
