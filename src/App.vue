<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <header>
    <nav>
      <ul>
        <li class="nav-item">
              <img class="logo" src="./assets/build-a-bot-logo.png"/>
              Build-a-Bot
          </li>
          <li>User: {{user.userName}}
          <button @click="changeUserName()">Change</button>
          </li>
      </ul>
    </nav>
  </header>
  <main>
    <!-- <div class="robot-name">
      This is a test

    </div> -->
            <RobotBuilder/>
<Search/>
  </main>
</template>

<script>
// import Homepage from './home/HomePage.vue'
import RobotBuilder from './build/RobotBuilder.vue'
import Search from './search/Search.vue'

export default {
  name: 'App',
  data() {
    return {
      // userName: 'Jim' 
      user: {userName:'John'}
    }
  },

  // provide: {
  //   userName: 'John'
  // },
  provide() {
    // return {userName: this.userName}
        return {user: this.user}

  },
  components: {
    RobotBuilder,
    Search
  },
  methods: {
    changeUserName() {
      this.user.userName = 'Fred'
      // this.user = {userName:'Fred'} //broken
    }
  },
}
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
</style>
