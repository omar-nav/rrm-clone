<template>
  <div class="name">
    <p>hola mundo!</p>
    <!-- recibe el objectID -->
    <!-- por el metodo router de vue -->
    <p>{{specificName}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "name",
  components: {},
  data() {
    return {
      specificName: {}
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
    }
  }
};
</script>
