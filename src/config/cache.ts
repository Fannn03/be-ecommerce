import NodeCache from "node-cache";

export default new NodeCache({
  checkperiod: 0,
  deleteOnExpire: true
})