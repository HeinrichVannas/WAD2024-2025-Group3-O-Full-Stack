<template>
    <div class="form">
      <h3>A post</h3>
      <label for="body">Body</label>
      <input name="body" type="text" id="body" required v-model="post.body">
      <div class="container">
        <button @click="AddPost"  class="center">Add</button>
      </div>
    </div>
  </template>
  
  <script>
  import auth from "../auth";
  export default {
    
  name: "AddPost", 
  data() {
      return {
        post: {
            date: "",
            body: "",
        },
        authResult: auth.authenticated()
    };
    },
    mounted() {
    // Väljakutse, kui komponent on laetud
    this.checkAuthentication();
  },
    methods: {

      async checkAuthentication() {
  try {
    const isAuthenticated = await auth.authenticated();
    console.log("Is user authenticated?", isAuthenticated);

    if (!isAuthenticated) {
      console.warn("User not authenticated, redirecting...");
      this.$router.push("/");
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
    this.$router.push("/");
  }
},
      AddPost() {
    // Kasutame ISO stringi, mis on 'YYYY-MM-DD' formaadis
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; 

    const data = {
        postdate: formattedDate, // Saadame kuupäeva stringina
        message: this.post.body  // Vormi sisestatud sõnum
    };

    fetch("http://localhost:3000/AddPost", { // Backend tee
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Saada JSON-andmed
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to add post");
        }
        return response.json();
    })
    .then((data) => {
        console.log("Post added successfully:", data);
        this.$router.push("/"); // Suuna pärast lisamist
    })
    .catch((e) => {
        console.error("Error adding post:", e);
    });
}

    }}
  </script>
  
  <style scoped>
  .form {
    max-width: 420px;
    margin: 30px auto;
    background: rgb(167, 154, 154);
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
  h3 {
    text-align: center;
    color: rgb(8, 110, 110);
  }
  label {
    color: rgb(8, 110, 110);
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid white;
    color: blue;
  }
  button {
    background: rgb(8, 110, 110);
    border: 0;
    padding: 10px 20px;
    margin: 20px 20px 20px 20px;
    color: white;
    border-radius: 20px;
    align-items: center;
    text-align: center;
  }
  .center {
    margin: auto;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    width: 30%; 
  }
  .container {
    display: flex;
    justify-content: center;
  }
  </style>