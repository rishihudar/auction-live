import { defineStore } from "pinia";

export const useAuctionStore = defineStore("auction", {
  persist: true,
  state: () => ({
    auction: {},
    auctions: []
  }),
  getters: {
    auctionObj: (state) => state.auction,
    auctionList: (state) => state.auctions
  },
  actions: {
    setAuction(payload) {
      this.auction = payload;
    },
    pushAuction(auction) {
      this.auctions.push(auction)
      console.log("pushAuction console",this.auctions)
      console.log("pushAuction with value",this.auctions.value)
    },
    removeAuction (auctionId_){
      console.log("removeAuction auctionID",auctionId_)
      console.log("removeAuction auctions object with value",this.auctions.value)
      console.log("removeAuction auctions object with value",this.auctions)
      // let index = this.auctions.findIndex(({auctionId}) => auctionId == auctionId_)
      // console.log(index);
      // this.auctions.splice(index,1)
      this.auctions = this.auctions.filter(item => item.auctionId !== auctionId_);

    },
    // clearAucitonStore(){
    //   this.auctions = []
    // }
  },
  
});
