<template>
  <div class="home">
    <input v-model="name"> Name
    <p>{{name}}</p>
    <button @click="send()">Send name to API</button>
    <button @click="showAll()">Show all names</button>
    <p v-for="name in names">
      <router-link :to="'/name/'+ name._id">{{name.name}}</router-link>
      <button @click="deleteById(name._id)">delete</button>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  components: {},
  data() {
    return {
      name: "AMLO",
      names: []
    };
  },
  methods: {
    send() {
      console.log("Send to API!");

      axios
        .post("http://localhost:1337/name", {
          name: this.name
        })
        .then(response => {
          console.log(response);
          this.showAll();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showAll() {
      console.log("Received from API!");

      axios
        .get("http://localhost:1337/name", {})
        .then(response => {
          console.log(response);
          this.names = response.data.result;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteById(idOfName) {
      console.log("Send to API!");

      axios
        .delete("http://localhost:1337/specificname", {
          data: { id: idOfName }
        })
        .then(response => {
          console.log(response);
          this.showAll();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
