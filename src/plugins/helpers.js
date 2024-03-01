import MQL from "./mql.js";
export const  ifBool = function(params, dummy) {
    if (typeof params == 'boolean') {
        return params
    } else {
        return dummy
    }
}

export const fetchAuctionStatus = function (code) {
    return new Promise((resolve) => {
        new MQL()
            .useCoreServer()
            .setActivity('o.[fetchStatusFromStatusMaster]')
            .setData({ statusCode: code })
            .fetch()
            .then((rs) => {
                let res = rs.getActivity('fetchStatusFromStatusMaster',true)
                resolve(res)
            })
    })
}