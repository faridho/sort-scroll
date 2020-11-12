# Qoala Test
😀 This is a website that only show a list of users responsively mada by vue.js and vuex.

### Installation NPM
```
npm install
```

### Run on Development
```
npm run serve
```
or 
```
node server.js
```

### Code Snipet
1. Data resource, use endpoint https://randomuser.me/api/?results=100
```
getUsers() {
  ...
  const fetchData = fetch("https://randomuser.me/api/?results=100");
  fetchData
      .then((response) => {
        return response.json()
      })
      .then((users) => {
        ...
      });
   ...
}
```

2. Display the data using the following rules:
- Set website container height fixed. So the website only scroll horizontally, not vertically. But, when it come to mobile width. It will scroll vertically, not horizontally.
- Each user wrapped in a card that contain user’s information (name title, first name, last name, age, registered date, email, city, state, postcode).
- Each card height is not limited on other card. Display the card height masonry, set every card width 350px. On mobile width, display the card height and width equally.
- Add background color on each every card base on their ages: Red is age < 21, Green is  21 < age < 56 and Blue is age > 56.

Below is vue template code snipet:
```
...
<div class="row">
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
  <div class="loadmore" v-show="loading">
    {{ loadingText }}
  </div>
</div>
...
```
Below is Script code snipet:
```
getUsers() {
   ...
   users.results.map((item) => {
    const age = item.dob.age
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
   })
   ...
   this.users = userData.filter((item, index) => index < this.limit)
   ...
}
```
Below is SCSS code snipet:
```
...
.row {
    white-space: nowrap;
    margin-top: 100px;

    .cards {
        display: inline-block;
        vertical-align: top;
        width: 350px;
        padding: $QPadding;
        border: 1px solid $borderColor;
        margin: $QMargin;

        .thumbnail {
            .img {
                height: auto;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
        }

        @each $type, $font in $info-components {
            .info-#{$type} {
                font-size: $font;
                padding-top: $QPadding;
                white-space: normal;
            }   
        }
    }

    .loadmore {
        display: none;
    }
}
...
```
3. Set website function:
- Create First button named “Color” : so when the button is clicked. It will
  sort the displayed card base on background color (green, blue, red).
- Create Second button named “City” : when the button is clicked. Sort the displayed card base on their city (A -> Z).
Below is Script code snipet.
  
Below is templatre code snipet
```
...
<div class="filter">
  <button class="filter-btn" @click="filterColor">
    {{ filter.color }}
  </button>
  <button class="filter-btn" @click="filterCity">
    {{ filter.city }}
  </button>
</div>
...
```

Below is Script code snipet
```
filterColor() {
  const order = {
    green: 3,
    blue: 2,
    red: 1,
  };

  const userFilter = this.users.sort(
    (item, acc) => order[acc.background] - order[item.background]
  );
  this.users = userFilter
},
filterCity() {
  const userFilter = this.users.sort((item, acc) => {
    if (item.address < acc.address) {
      return -1
    }
    if (item.address > acc.address) {
      return 1
    }
    return 0
  });
  this.users = userFilter;
},
...
```

- First load, Display only 10 users. but when we scroll towards the end, retrieve next 10 every time until we have 100 users in the page.
- Everytime the page is refreshed. The data will stay just like before the page is not refreshing.
```
mounted() {
  ...
  window.onscroll = () => {
    // desktop only
    if (
      window.innerWidth + window.scrollX >= document.body.offsetWidth + this.windowWidth
    ) {
      this.loadMore()
    }

    // mobile only
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.windowWidth <= 900
    ) {
      setTimeout(() => {
        this.loadMore()
      }, 500)
    }
  };
},


methods: {
  ...
  loadMore() {
    const usersStorage = this.$store.state.usersStorage
    const moreUsers = usersStorage.filter(
      (item, index) =>
        index > this.users.length - 1 && index < this.users.length - 1 + 11
    );
    this.users = this.users.concat(moreUsers)

    if(this.users.length == 100) {
      this.loading = false
    }
  },
  ...
}
```

4. Bonus (Nice to have):
- Create a Test (TDD or automation)

Below is short test spec for components by jest.
```
import Qoala from "../components/Qoala"

describe("Component Test", () => {
    it('should have Qoala as name', () => {
        expect(Qoala.name).toBe('Qoala');
    })

    it('should the correct default data', () => {
        expect(typeof Qoala.data).toBe('function')
        const defaultData = Qoala.data()
        expect(defaultData.title).toBe('Qoala Test')
        expect(defaultData.filter).toEqual({
            color: "Color",
            city: "City",
        })
        expect(defaultData.loadingText).toBe('Loading...')
        expect(defaultData.users).toEqual([])
        expect(defaultData.limit).toBe(10)
        expect(defaultData.loading).toBeTruthy()
    })
})
```

Below is short test spec for vuex store by jest.
```
import { mutations } from "../store/index"

const users = [
    {
        "thumbnail": "https://randomuser.me/api/portraits/women/76.jpg",
        "fullName": "Ms Andrea Olsen",
        "age": 27,
        "email": "andrea.olsen@example.com",
        "address": "Gjerlev Hovedstaden 57667",
        "background": "green"
    },
    {
        "thumbnail": "https://randomuser.me/api/portraits/men/25.jpg",
        "fullName": "Mr Hans-Wilhelm Germann",
        "age": 45,
        "email": "hans-wilhelm.germann@example.com",
        "address": "Dahme/Mark Hamburg 11086",
        "background": "green"
    }
]

describe("Vuex Store Test", () => {
    it('should store data users', () => {
        const state = {
            usersStorage: []
        }

        mutations.CONFIRM_SAVE(state, users)
        expect(state.usersStorage).toEqual(users)
    })

})
```

- Already Deployed and saved on repository (can be cloned)
You can see production link via the link https://myqoala.herokuapp.com/ 

🍻cherss!!🍻 







