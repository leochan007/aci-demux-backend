const {
  AbstractActionHandler
} = require('demux');

const {
  CreditInquirySchema,
  BlockIndexStateSchema,
  MongoDb,
  io,
} = require('alphacarinquiry-commons');

class ActionHandler extends AbstractActionHandler {

  constructor(handlerVersions) {
    super(handlerVersions);

    this.alphacar = new MongoDb('alphacar');
    this.blockinfos = new MongoDb('blockinfos');

    this.CreditInquiryModel = this.alphacar.db.model('credit_inquiry',
      CreditInquirySchema, 'credit_inquiry');

    this.BlockIndexStateModel = this.blockinfos.db.model('block_index_state',
      BlockIndexStateSchema, 'block_index_state');

    // Close the connection if the node process is terminated
    process.on('SIGINT', () => {
      this.alphacar.close();
      this.blockinfos.close();
      process.exit(0);
    })
  }


  async handleWithState(handle) {
    const context = {
      socket: io.getSocket()
    }
    const state = {
      creditinquiry: this.CreditInquiryModel,
      blockIndexState: this.BlockIndexStateModel
    }
    try {
      await handle(state, context)
    } catch (err) {
      console.error(err)
    }
  }

  async updateIndexState(state, block, isReplay, handlerVersionName) {
    const {
      blockInfo
    } = block

    //console.log(JSON.stringify(block))
    console.log(blockInfo.blockNumber)

    try {
      await state.blockIndexState.update({}, {
        blockNumber: blockInfo.blockNumber,
        blockHash: blockInfo.blockHash,
        isReplay,
        handlerVersionName: handlerVersionName
      }, {
        upsert: true
      }).exec()
    } catch (err) {
      console.error(err)
    }
  }

  async loadIndexState() {
    try {
      let blockHash
      let blockNumber
      let handlerVersionName
      const indexState = await this.BlockIndexStateModel.findOne({}).exec()
      console.log("indexState:" + indexState)
      if (indexState) {
        ({
          blockHash,
          blockNumber,
          handlerVersionName
        } = indexState)
      }
      console.log("blockHash:" + blockHash, "blockNumber:" + blockNumber + "handlerVersionName:" + handlerVersionName)
      if (blockNumber && blockHash && handlerVersionName) {
        return {
          blockNumber,
          blockHash,
          handlerVersionName
        }
      }
      return {
        blockNumber: 0,
        blockHash: '',
        handlerVersionName: 'v1'
      }
    } catch (err) {
      console.error(err)
    }
  }

  async rollbackTo(blockNumber) {
    console.log('rollbackTo ' + blockNumber);
  }

}

export default ActionHandler
