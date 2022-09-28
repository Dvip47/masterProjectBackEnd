// const { getResquest } = require("../api/api");
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
        wallet: [
          {
            currency: "inr",
            balance: 0,
            freezeBalance: 0,
            total: 0,
            active: true,
            date: new Date(),
          },
        ],
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
        symbol: "inr",
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
      const oldWallet = await Wallet.findOne({
        email: data.email,
      });
      const oldUser = await User.findOne({ email: data.email });
      const currencyValue = oldWallet.wallet?.filter(
        (data) => data.currency == data.currency
      );
      await VerifyDeposite.findOneAndUpdate(
        { utr: data.utr },
        { status: data.status }
      );
      if (data.type != "money") {
        await Wallet.findOneAndUpdate(
          {
            email: data.email,
            "wallet.$.currency": data.currency,
          },
          {
            $set: {
              "wallet.$.balance": currencyValue[0].balance + data.balance,
              "wallet.$.date": new Date(),
              "wallet.$.total": currencyValue[0].total + data.balance,
            },
          }
        );
      } else {
        await User.findOneAndUpdate(
          { email: data.email },
          {
            balance: oldUser.balance + data.balance,
          }
        );
        await Wallet.findOneAndUpdate(
          {
            email: data.email,
            "wallet.currency": "inr",
          },
          {
            $set: {
              "wallet.$.balance": currencyValue[0].balance + data.balance,
              "wallet.$.date": new Date(),
              "wallet.$.total": currencyValue[0].total + data.balance,
            },
          }
        );
      }
      break;
    case "dspioasp":
      await User.findOneAndUpdate({ email: data.email }, data);
      break;
    case "aeuiryenv":
      const oldUserr = await Wallet.findOne({ email: data.email });
      const oldAmount = oldUserr.wallet?.filter(
        (data) => data.currency == "inr"
      );
      await Wallet.findOneAndUpdate(
        {
          email: data.email,
          "wallet.currency": "inr",
        },
        {
          $set: {
            "wallet.$.balance":
              Number(oldAmount[0].balance) + Number(data.amount),
            "wallet.$.date": new Date(),
            "wallet.$.total": Number(oldAmount[0].total) + Number(data.amount),
          },
        }
      );
      let userDataa = await User.findOneAndUpdate({ email: data.email }, [
        {
          $set: {
            balance: {
              $add: ["$balance", Number(data.amount)],
            },
          },
        },
      ]);
      const newDataa = {
        symbol: "inr",
        amount: Number(data.amount),
        Status: "pending",
        utrDeduction: 0,
        finalAmount: Number(data.amount) - 0,
        description: "Amount transaffered by Admin",
        oldBalance: Number(userDataa.balance),
        newBalance: Number(userDataa.balance) + Number(data.amount),
        type: "money",
        mode: "deposite",
        utr: Number(data.utr),
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
