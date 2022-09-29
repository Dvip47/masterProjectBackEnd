const bodyParser = require("body-parser");
const Coinlisting = require("../db/schema/Coinslisting.schema");
async function getAllCoinM() {
  try {
    const coinList = await Coinlisting.find({});
    return { message: coinList, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function updatePermissionM(body) {
  try {
    await Coinlisting.findOneAndUpdate({ symbol: body.symbol }, body);
    return { message: "Permission Updated", success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function getCoinBalanceM(body) {
  try {
    let pipeline = [
      {
        $lookup: {
          from: "wallets",
          let: {
            coin_symbol: "$symbol",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$email", body.email],
                    },
                    {
                      $eq: ["$currency", "$$coin_symbol"],
                    },
                  ],
                },
              },
            },
          ],
          as: "wallets",
        },
      },
      {
        $unwind: {
          path: "$wallets",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          total: {
            $multiply: [
              "$closePrice",
              {
                $toDouble: "$wallets.balance",
              },
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          symbol: 1,
          canDeposit: 1,
          canWithdrawal: 1,
          balance: {
            $ifNull: ["$wallets.balance", "0"],
          },
          contractAddress: 1,
          network: 1,
          total: {
            $toString: {
              $ifNull: ["$total", "0"],
            },
          },
        },
      },
    ];
    let coins = await Coinlisting.aggregate(pipeline);
    console.log(coins[0]);
    return { message: coins, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
module.exports = {
  getAllCoinM,
  updatePermissionM,
  getCoinBalanceM,
};
