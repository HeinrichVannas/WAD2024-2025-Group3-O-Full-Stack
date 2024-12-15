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
  export default {
  name: "AddPost", 
  data() {
      return {
        post: {
            date: "",
            body: "",
        },
    };
    },
    methods: {
        AddPost() {
                var data = {
                    date: '16.12.2023',
                    body: this.post.body,
                };

                // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
                fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                    credentials: 'include', //  Don't forget to specify this if you need cookies
                    body: JSON.stringify(data),
                })
                .then((response) => response.json())
                .then((data) => {
                console.log(data);
                this.$router.push("/");
                })
                .catch((e) => {
                console.log(e);
                console.log("error");
                });
            },
    }, 
    }
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