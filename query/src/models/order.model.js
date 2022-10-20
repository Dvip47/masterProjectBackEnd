const { getResquest } = require("../api/api");
const Order = require("../db/schema/Order.schema");
const Wallet = require("../db/schema/Wallet.schema");
async function getMyOrdersM(body) {
  try {
    const myorders = await Order.find({ email: body?.email });
    return { message: myorders, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function getFilterSymbolDataM(body) {
  try {
    // let pipeline = [
    //   {
    //     $match: {
    //       email: body.email,
    //       status: "placed",
    //       symbol: body.symbol,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$symbol",
    //       activeOrder: {
    //         $sum: 1,
    //       },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "wallets",
    //       let: {
    //         symbol: "INR",
    //       },
    //       pipeline: [
    //         {
    //           $match: {
    //             currency: "INR",
    //           },
    //         },
    //       ],
    //       as: "balance",
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$balance",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   {
    //     $addFields: {
    //       totalBalance: "$balance.total",
    //       avaliableBalance: "$balance.balance",
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       activeOrder: 1,
    //       totalBalance: 1,
    //       avaliableBalance: 1,
    //     },
    //   },
    // ];
    let pipeline1 = [
      {
        $match: {
          email: body.email,
          status: "placed",
          symbol: body.symbol,
        },
      },
      {
        $group: {
          _id: "$symbol",
          activeOrder: {
            $sum: 1,
          },
        },
      },
    ];
    let pipeLine2 = [
      {
        $match: {
          email: body.email,
          currency: "INR",
        },
      },
      {
        $project: {
          totalBalance: "$total",
          avaliableBalance: "$balance",
        },
      },
    ];
    const myorders = await Order.aggregate(pipeline1);
    const mywallet = await Wallet.aggregate(pipeLine2);
    return {
      message: { ...mywallet[0], ...myorders[0] },
      success: true,
      token: null,
    };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}

module.exports = {
  getMyOrdersM,
  getFilterSymbolDataM,
};
