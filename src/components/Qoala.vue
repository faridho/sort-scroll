<template>
  <div class="container">
    <div class="nav">
      <div class="title">{{ title }}</div>
      <div class="filter">
        <button class="filter-btn" @click="filterColor">
          {{ filter.color }}
        </button>
        <button class="filter-btn" @click="filterCity">
          {{ filter.city }}
        </button>
      </div>
    </div>
    <div class="row">
      <div id="infinite-list">
        <div
          class="cards"
          v-for="(user, index) in users"
          :key="index"
          :style="{ background: user.background }"
        >
          <div class="thumbnail">
            <img class="img" :src="user.thumbnail" />
          </div>
          <div class="info-top">
            {{ user.fullName }}
          </div>
          <div class="info-semi-top">
            {{ user.age }}
          </div>
          <div class="info-mid">
            {{ user.address }}
          </div>
          <div class="info-bot">
            {{ user.email }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Qoala",

  data: () => ({
    title: "Qoala Test",
    filter: {
      color: "Color",
      city: "City",
    },
    usersStorage: [],
    users: [],
    page: 1,
    limit: 10,
    windowWidth: window.innerWidth,
  }),

  mounted() {
    this.getUsers();
    window.onscroll = () => {
      if (
        window.innerWidth + window.scrollX >= document.body.offsetWidth &&
        this.windowWidth > 900
      ) {
        this.loadMore();
      }

      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        this.windowWidth <= 900
      ) {
        this.loadMore();
      }
    };
  },

  methods: {
    getUsers() {
      const fetchData = fetch("https://randomuser.me/api/?results=100")
      fetchData
        .then((response) => {
          return response.json();
        })
        .then((users) => {
          const userData = [];
          users.results.map((item) => {
            const age = item.dob.age;
            const background =
              age < 21 ? "red" : age >= 21 && age < 56 ? "green" : "blue";

            userData.push({
              thumbnail: item.picture.large,
              fullName: `${item.name.title} ${item.name.first} ${item.name.last}`,
              age: age,
              email: item.email,
              address: `${item.location.city} ${item.location.state} ${item.location.postcode}`,
              background: background,
            });
          });
          this.usersStorage = userData;
          this.users = userData.filter((item, index) => index < this.limit);
        });
    },

    filterColor() {
      const order = {
        green: 3,
        blue: 2,
        red: 1,
      };

      const userFilter = this.users.sort(
        (item, acc) => order[acc.background] - order[item.background]
      );
      this.users = userFilter;
    },

    filterCity() {
      const userFilter = this.users.sort((item, acc) => {
        if (item.address < acc.address) {
          return -1;
        }
        if (item.address > acc.address) {
          return 1;
        }
        return 0;
      });
      this.users = userFilter;
    },

    loadMore() {
      const moreUsers = this.usersStorage.filter(
        (item, index) =>
          index > this.users.length - 1 && index < this.users.length - 1 + 11
      );
      this.users = this.users.concat(moreUsers);
    },
  },

  watch: {
    scroll() {},
  },
};
</script>