import {defineStore} from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        counter: 0,
    }),
    getters: {
        doubleCounter: state => state.counter * 2,
        doubleCounterOne() {
            return this.doubleCounter + 1
        }
    },
    actions: {
        increment() {
            this.counter++
        },
        // => 메소드에서는 this 객체를 정상적으로 가져오지 못함
        increment2: () => { this.state.counter++}
    }
})