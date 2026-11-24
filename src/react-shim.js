const OriginalReact = require("../node_modules/react/index.js");

const safeAct = (cb) => {
  if (typeof cb === "function") {
    return cb();
  }
  return undefined;
};

const act = OriginalReact.act || safeAct;
const unstable_act = OriginalReact.unstable_act || safeAct;

module.exports = {
  ...OriginalReact,
  act,
  unstable_act,
  default: {
    ...OriginalReact,
    act,
    unstable_act,
  },
};
