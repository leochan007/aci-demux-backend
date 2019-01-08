const {
  States
} = require('alphacarinquiry-commons')

async function insert(state, payload, blockInfo, context) {
  console.log('----------------------> UPDATE insert')
  console.log(payload)

  const Creditinquiry = state.creditinquiry
  try {

    var promise = await Creditinquiry.findOneAndUpdate({
      "hash": payload.data.hash_val
    }, {
      $set: {
        "txId": payload.transactionId,
        "status": States.STATE_CONFIRMED
      }
    }, {
      new: true
    }).exec();

  } catch (err) {
    console.error('state insert catch:' + err)
  }
}

/*
{ transactionId: '46315853edeebc75cb8844e854b0cb2abb9fa30c5fc95bd5527323a4d64ff956',
  actionIndex: 0,
  account: 'alphacar',
  name: 'insert',
  authorization: [ { actor: 'alphacar', permission: 'active' } ],
  data:
   { account: '18017370947',
     hash_val: '2b01c69ca0f5ee6989e5ebd3407b7695337b9ff52aa2cff3eda302eb86c86e43' } }
*/

export default insert
