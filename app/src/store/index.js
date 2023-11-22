import { defineStore } from 'pinia'

export const main = defineStore('main', {
  state: () => ({ isPageBlocked: false }),
  getters: {
    Boolean: state => state.isPageBlocked
  },
  actions: {
    MUTATE_PAGE_BLOCKER(payload){
      this.isPageBlocked=payload
    }
  },
})
