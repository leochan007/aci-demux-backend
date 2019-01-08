import insert from './insert'
import erasebyhash from './erasebyhash'
import eraseall from './eraseall'

const { ACIConfig } = require('alphacarinquiry-commons');

export default [
  {
    actionType: `${ACIConfig.eos_account}::insert`,
    run: insert
  },
  {
    actionType: `${ACIConfig.eos_account}::erasebyhash`,
    run: erasebyhash
  },
  {
    actionType: `${ACIConfig.eos_account}::eraseall`,
    run: eraseall
  },
]
