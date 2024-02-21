import { defineStore } from "pinia";


export const useAuctionPreparation = defineStore("auctionPreparation", {
    persist: true, 
    
    state: () => ({
        lastInsertedAuctionId: "",
        propertyCategoryId: "",

      }),

    getters: {
        getLastInsertedAuctionId: (state) => state.lastInsertedAuctionId,
        getPropertyCategoryId: (state) => state.propertyCategoryId,
      },
    
    actions: {
        setLastInsertedAuctionId(id) {
          this.lastInsertedAuctionId = id;
          console.log("lastInsertedAuctionId from auctionPreparation Store: ", this.lastInsertedAuctionId);
        },
        setPropertyCategoryId(id) {
          this.propertyCategoryId = id;
          console.log("propertyCategoryId from auctionPreparation Store: ", this.propertyCategoryId);
        },
      },
});