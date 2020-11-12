import Vuex from 'vuex';
import store from "../store/index"
const $storeInstance = new Vuex.Store(store);

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
       $storeInstance.commit('CONFIRM_SAVE', users)
       expect($storeInstance.state.usersStorage).toEqual(users)
    })

})