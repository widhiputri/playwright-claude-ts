module.exports = {
  default: {
    require: ["features/steps/**/*.ts", "support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress"],
    paths: ["features/**/*.feature"],
    parallel: 1,
    publishQuiet: true
  }
};