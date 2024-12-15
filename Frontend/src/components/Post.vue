<script>
export default {
  name: "PostComponent",
  props: ["posts"],
  methods: {
    goToPost(postId) {
      this.$router.push(`/post/${postId}`);
    },
  },
};
</script>

<template>
  <div
    class="post"
    v-for="(post, index) in posts"
    :key="index"
    @click="goToPost(post.id)" 
  >
    <div class="postfirst">
      <p class="date">{{ post.postdate }}</p>
    </div>
    <div class="postsecond">
      <p class="postMessage">{{ post.message }}</p>
    </div>
  </div>
</template>

<style scoped>
.post {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-self: center;
  background-color: #696969;
  margin-top: 20px;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
}
.post p {
  font-size: 1.5rem;
  padding: 1%;
}
.date {
  justify-self: flex-end;
}
</style>
