

<template>
  <div v-if="post" class="postDetails">
    <h2>Post Details</h2>
    <p><strong>Date:</strong> {{ post.postdate }}</p>
    <p><strong>Message:</strong> {{ post.message }}</p>
    <div class="updateSection">
      <label for="updatedMessage">Update Message:</label>
      <input
        type="text"
        id="updatedMessage"
        v-model="updatedMessage"
        placeholder="Enter new message"
      />
      <button @click="updatePost" class="updateButton">Update</button>
    </div>
    <div class="buttonSection">
      <button @click="deletePost" class="deleteButton">Delete Post</button>
      <button @click="$router.push('/')" class="homeButton">Back to Home</button>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
<script>
import auth from "../auth";
export default {
  name: "PostDetails",
  props: ["id"],
  data() {
    return {
      post: null,        
      updatedMessage: "", 
      authResult: auth.authenticated(),
    };
  },
  mounted() {
    this.fetchPost();
    this.checkAuthentication();
  },
  methods: {
    fetchPost() {
      fetch(`http://localhost:3000/posts/${this.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch post");
          }
          return response.json();
        })
        .then((data) => {
          this.post = data;
          this.updatedMessage = data.message; 
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    },
    deletePost() {
        fetch(`http://localhost:3000/posts/${this.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete post");
            }
            return response.json();
          })
          .then(() => {
            this.$router.push("/"); 
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
          });
    },
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

    updatePost() {
      fetch(`http://localhost:3000/posts/${this.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: this.updatedMessage }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update post");
          }
          return response.json();
        })
        .then((data) => {
          this.post = data; 
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    },
  },
};
</script>

<style scoped>
.postDetails {
  padding: 20px;
  background-color: rgb(167, 154, 154);
  border-radius: 10px;
  max-width: 600px;
  margin: 50px auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  color: #333;
}
p {
  font-size: 1.2rem;
  margin: 10px 0;
}
.updateSection {
  margin-top: 20px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
.updateButton {
  background-color: #6e716e;
}
.deleteButton {
  background-color: #6e716e;
}
.homeButton {
  background-color: #6e716e;
}
.buttonSection {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
