import { defineStore } from "pinia";

export const useCardStore = defineStore("cards", {
  persist: true,
  state: () => ({
    cardId: 0 
  }),
  getters: {
    cardObj: (state) => state.cardId
  },
  actions: {
    setCardId(payload) {
      this.cardId = payload;
    },
  },
  
});
