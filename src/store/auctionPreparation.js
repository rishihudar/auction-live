import { defineStore } from "pinia";


export const useAuctionPreparation = defineStore("auctionPreparation", {
    persist: true,
    state: () => ({
        lastInsertedAuctionId: null,
        propertyCategoryId: "",
        isClicked: false,

      }),

    getters: {
        getLastInsertedAuctionId: (state) => state.lastInsertedAuctionId,
        getPropertyCategoryId: (state) => state.propertyCategoryId,
        getIsClicked: (state) => state.isClicked,
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
        setIsClicked(value) {
          this.isClicked = value;
          console.log("isClicked from auctionPreparation Store: ", this.isClicked);
        },
      },
});