module.exports = {
  default: {
    require: ["features/steps/**/*.ts", "support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress", "html:reports/cucumber-report.html"],
    paths: ["features/**/*.feature"],
    parallel: 1,
    publishQuiet: true
  }
};
