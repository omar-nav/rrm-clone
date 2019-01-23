<template>
  <div class="newName">
    <p>hola mundo!</p>
    <!-- recibe el objectID -->
    <!-- por el metodo router de vue -->
    <p>{{specificName}}</p>
    <input v-model="newName">
    <button @click="sendNewName()">Send name to API</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "name",
  components: {},
  data() {
    return {
      specificName: {},
      newName: "new name to send back"
    };
  },
  mounted: function() {
    // method will execute on page load
    this.getSpecificName();
  },
  methods: {
    getSpecificName() {
      console.log("getting specific name!");

      axios
        .get("http://localhost:1337/specificname", {
          params: {
            id: this.$route.params.id
          }
        })
        .then(response => {
          console.log(response);
          this.specificName = response.data.result;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    sendNewName() {
      console.log("Send to API!");

      axios
        .put("http://localhost:1337/specificname", {
          id: this.$route.params.id,
          newName: this.newName
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
