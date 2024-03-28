import { defineStore } from "pinia";

export const useAuctionStore = defineStore("auction", {
  persist: true,
  state: () => ({
    auction: {},
  }),
  getters: {
    auctionObj: (state) => state.auction
  },
  actions: {
    setAuction(payload) {
      this.auction = payload;
    },
  },
  
});
