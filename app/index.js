import { BaseActionWatcher } from 'demux'
import { MongoActionReader, NodeosActionReader } from 'demux-eos'
import ActionHandler from './ActionHandler'

const { ACIConfig } = require('alphacarinquiry-commons')

import handlerVersion from './handlerVersions'

const actionHandler = new ActionHandler([handlerVersion])

const actionReader = new NodeosActionReader(
  ACIConfig.eosio_http_url,
  ACIConfig.start_block,
  true,
)

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  250 // Poll at twice the block interval for less latency
)

module.exports = {
  actionWatcher
}
