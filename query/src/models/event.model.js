// const { getResquest } = require("../api/api");
const Order = require("../db/schema/Order.schema");
const AdminBank = require("../db/schema/AdminBank");
const Bank = require("../db/schema/Bank.schema");
const User = require("../db/schema/User.schema");
const UserLedger = require("../db/schema/UserLedger.schema");
const VerifyDeposite = require("../db/schema/VerifyDepositeReciept.schema");
const Wallet = require("../db/schema/Wallet.schema");
const handleEvents = async (event, data) => {
  switch (event) {
    case "zxcvbnm":
      await User.create({
        ...data,
        balance: 0,
        active: false,
        canDeposite: false,
        canWithdraw: false,
      });
      await Wallet.create({
        email: data.email,
        currency: "INR",
        balance: 0,
        freezeAmount: 0,
        total: 0,
        active: true,
      });
      break;
    case "sndlknva":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { verified: true },
        }
      );
      break;
    case "vnjksd":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { passward: data.passward },
        }
      );
      break;
    case "sdijspofij":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { ...data },
        }
      );
      break;
    case "difhjgvoda":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { passward: data.passward },
        }
      );
      break;
    case "oareoie":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: {
            adharNumber: data.adharNumber,
            panNumber: data.panNumber,
            pan: data.pan,
            adharFront: data.adharFront,
            adharBack: data.adharBack,
            uniqueNumber: data.uniqueNumber,
            kyc: "pending",
          },
        }
      );
      break;
    case "fseifjwo":
      await Bank.create(data);
      break;
    case "sdjfisosopd":
      await Bank.findOneAndUpdate(
        { email: data.email, accountNumber: data.accountNumber },
        {
          $set: {
            accountHolderName: data.accountHolderName,
            bankStatus: data.bankStatus,
            userBankUniqueId: data.userBankUniqueId,
            bankActive: data.bankActive,
            utr: data.utr,
          },
        }
      );
      break;
    case "skmohiasta":
      await Bank.findOneAndUpdate(
        { email: data.email, accountNumber: data.accountNumber },
        {
          $set: {
            bankStatus: data.bankStatus,
          },
        }
      );
      break;
    case "mdoifvjhvn":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: {
            security: data.security,
          },
        }
      );
      break;
    case "pakmvapoev":
      await AdminBank.create(data);
      break;
    case "asaewepdov":
      await AdminBank.findOneAndUpdate({ accountNumber: data.ACNO }, data);
      break;
    case "paisbvecmso":
      const user = await User.findOne({ email: data.email });
      const newData = {
        email: data.email,
        symbol: "INR",
        amount: Number(data.deposite),
        Status: "pending",
        utrDeduction: 0,
        finalAmount: Number(data.deposite) - 0,
        description: "Request for deposite",
        oldBalance: Number(user.balance),
        newBalance: Number(user.balance) + Number(data.deposite),
        type: "money",
        mode: "deposite",
        utr: Number(data.utr),
      };
      await UserLedger.create(newData);
      await VerifyDeposite.create(data);
      break;
    case "pasmcwpocyus":
      await VerifyDeposite.findOneAndUpdate(
        { utr: data.utr },
        {
          status: data.status,
          description: data.description,
          actionTaken: data.actionTaken,
          ip: data.ip,
        }
      );
      if (data.status == "reject") {
        await UserLedger.findOneAndUpdate(
          { utr: data.utr },
          {
            Status: "reject",
          }
        );
      } else {
        let pipeline1 = [
          {
            $set: {
              balance: {
                $add: ["$balance", Number(data.balance)],
              },
              total: {
                $add: ["$total", Number(data.balance)],
              },
            },
          },
        ];
        await Wallet.updateOne(
          { email: data.email, currency: data.currency },
          pipeline1
        );
        await UserLedger.findOneAndUpdate(
          { utr: data.utr },
          {
            Status: "approve",
          }
        );
        if (data.type == "money") {
          let pipeline = [
            {
              $set: {
                balance: {
                  $add: ["$balance", Number(data.balance)],
                },
              },
            },
          ];
          await User.updateOne({ email: data.email }, pipeline);
        }
      }
      break;
    case "dspioasp":
      await User.findOneAndUpdate({ email: data.email }, data);
      break;
    case "aeuiryenv":
      let pipeline = [
        {
          $set: {
            balance: {
              $add: ["$balance", Number(data.amount)],
            },
            total: {
              $add: ["$total", Number(data.amount)],
            },
          },
        },
      ];
      await Wallet.updateOne(
        { email: data.email, currency: data.currency },
        pipeline
      );
      await User.updateOne({ email: data.email }, [
        {
          $set: {
            balance: {
              $add: ["$balance", Number(data.amount)],
            },
          },
        },
      ]);
      const userData = await User.findOne({ email: data.email });
      const newDataa = {
        email: data.email,
        symbol: "INR",
        amount: Number(data.amount),
        Status: "approve",
        utrDeduction: 0,
        finalAmount: Number(data.amount) - 0,
        description: data?.description,
        oldBalance: Number(userData.balance),
        newBalance: Number(userData.balance) + Number(data.amount),
        type: "money",
        mode: "deposite",
        utr: Number(data.utr),
        actionTaken: data.actionTaken,
        ip: data.ip,
      };
      await UserLedger.create(newDataa);
      break;
    case "eoiruencw":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { kyc: data.kyc },
        }
      );
      break;
    case "perfeniue":
      await Bank.findOneAndUpdate(
        { email: data.email, accountNumber: data.accountNumber },
        {
          $set: { bankActive: false },
        }
      );
      break;
    case "ewuychucs":
      await Order.create(data);
      break;
    default:
      break;
  }
};
async function eventM_P({ event, data }) {
  try {
    await handleEvents(event, data);
    return { message: "OK", success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function eventM() {
  try {
    return { message: data, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
module.exports = {
  eventM_P,
  eventM,
};
