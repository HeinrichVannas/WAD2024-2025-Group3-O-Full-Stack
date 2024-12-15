<template>
  <div class="header">
    <div class="container">
    <button v-if = "authResult" @click="Logout" class="center">Logout</button>
    </div>
      <PostComponent :posts="posts" />
  </div>
  <div class="footer">
    <div class="container">
      <button v-if = "authResult" @click='this.$router.push("/addpost")' class="center">Add post</button>
      <button v-if = "authResult" @click="DeleteAll" class="center">Delete all</button>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import auth from "../auth";
import PostComponent from "@/components/Post.vue";

export default {
  name: "HomeView",
  components: {
    PostComponent
  },
   data: function() {
    return {
    posts:[ ],
    authResult: auth.authenticated()
    }
  },
  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
          credentials: 'include', //  Don't forget to specify this if you need cookies
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        //console.log('jwt removed:' + auth.authenticated());
        this.$router.push("/login");
        //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error logout");
      });
    },
    DeleteAll() {
  
    fetch("http://localhost:3000/DeletePosts", {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete all posts");
        }
        return response.json();
      })
      .then((data) => {
        console.log("All posts deleted successfully:", data);
        this.posts=[];
      })
      .catch((e) => {
        console.error("Error deleting posts:", e);
        alert("Failed to delete posts.");
      });
  
}

  }, 
  mounted() {
        fetch('http://localhost:3000/posts/get')
        .then((response) => response.json())
        .then(data => this.posts = data)
        .catch(err => console.log(err.message))
    },
};
</script>

<style scoped>
nav{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 80px;
}
input{
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
  width: 100%;
}
label{
  display: block;
  margin: 20px 0 10px;
}
button{
  margin-top: 30px;
  border-radius: 36px;
  background: #FEE996;
  border:0;
  font-weight: 700;
  font-size: 0.8em;
  display: block;
  padding: 10px 16px;
  letter-spacing: 2px;
}
nav{
  display: flex;
  align-items: center;
}
.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  margin: 10px auto;
  width: 30%;
}
.container {
  display: flex;
  justify-content: center;
}
.footer {
  position: sticky
}

</style>