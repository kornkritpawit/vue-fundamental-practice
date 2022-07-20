<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <header>
    <nav>
      <ul>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="foo"
            :to="{ name: 'Home' }"
            exact
          >
            <img class="logo" src="./assets/build-a-bot-logo.png" />
            Build-a-Bot
          </router-link>
        </li>
        <li class="nav-item">
          User: {{ user.userName }}
          <button @click="changeUserName()">Change</button>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Build' }" exact>
            Build
          </router-link>
        </li>
        <li class="nav-item cart">
          <router-link class="nav-link" to="/cart" exact> Cart </router-link>
          <div class="cart-items">
            {{ cart.length }}
          </div>
        </li>
      </ul>
    </nav>
  </header>

  <div class="container">
    <aside class="aside">
      <router-view name="sidebar" />
    </aside>
    <main>
      <router-view />
      <!-- <RobotBuilder/> -->
      <!-- <Search/> -->
    </main>
  </div>
</template>

<script>
// import Homepage from './home/HomePage.vue'
import RobotBuilder from "./build/RobotBuilder.vue";
import Search from "./search/Search.vue";

export default {
  name: "App",
  data() {
    return {
      // userName: 'Jim'
      user: { userName: "John" },
    };
  },

  // provide: {
  //   userName: 'John'
  // },
  provide() {
    // return {userName: this.userName}
    return { user: this.user };
  },
  components: {
    RobotBuilder,
    Search,
  },
  computed: {
        cart() {
    //   return this.$store.state.cart;
            return this.$store.state.robots.cart;

    },
  },
  methods: {
    changeUserName() {
      this.user.userName = "Fred";
      // this.user = {userName:'Fred'} //broken
    },
  },
};
</script>
<style>
body {
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
<style scoped>
/* .robot-name {color: red;
  border: 2px solid blue;
} */

/* .content >>> .robot-name{
  color: red;
    border: 2px solid blue;
} */
main {
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  width: 1024px;
  min-height: 300px;
}

header {
  background-color: #999;
  width: 1084px;
  margin: 0 auto;
}
ul {
  padding: 3px;
  display: flex;
}
.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}
.logo {
  vertical-align: middle;
  height: 30px;
}
.nav-link {
  text-decoration: none;
  color: inherit;
}
.router-link-active {
  color: white;
}
.foo {
  color: white;
}
.container {
  display: flex;
  margin: 10px auto 0 auto;
  justify-content: center;
}
.aside {
  padding: 30px;
  background-color: #aaa;
  width: 100px;
  min-height: 300px;
}
.nav-item.cart {
  position: relative;
  margin-left: auto;
  border-right: none;
}
.cart-items {
  position: absolute;
  top: -5px;
  right: -9px;
  font-size: 18px;
  width: 20px;
  text-align: center;
  display: inline-block;
  border-radius: 100px;
  background-color: mediumseagreen;
}
</style>
