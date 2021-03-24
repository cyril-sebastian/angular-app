import { schedule, danger, warn } from "danger"
import { istanbulCoverage } from "danger-plugin-istanbul-coverage"

// schedule(istanbulCoverage()) // Use default configuration

const changes = danger.git.modified_files.reduce((prev, filePath) => {
  if(!prev.package) {
    prev.package = filePath.includes("package.json");
  }
  if(!prev.lock) {
    prev.lock = filePath.includes("package-lock.json")
  }
  return prev;
}, {});

if (changes.package && !changes.lock) {
  const message = 'Changes were made to package.json, but not to package-lock.json';
  const idea = 'Perhaps you need to run `npm install`?';
  warn(`${message} - <i>${idea}</i>`);
}

schedule(istanbulCoverage({
  // Set a custom success message
  customSuccessMessage: "Congrats, coverage is good",

  // Set a custom failure message
  customFailureMessage: "Coverage is a little low, take a look",

  // How to sort the entries in the table
  entrySortMethod: "alphabetical", // || "least-coverage" || "most-coverage" || "largest-file-size" ||"smallest-file-size" || "uncovered-lines"

  // Add a maximum number of entries to display
  numberOfEntries: 10,

//   // The location of the istanbul coverage file.
//   coveragePath: "./coverage/coverage-summary.json",
//   // Alternatively, if you have multiple coverage summaries, you can merge them into one report
//   coveragePaths: ["./dir1/coverage-summary.json", "./dir2/coverage-summary.json"]
  // You can also specify the format, instead of letting it be inferred from the file name
  coveragePath: { path: "./coverage/angular-app/lcov.info", type: "lcov" /* ||  "json-summary" */},

  // Which set of files to summarise from the coverage file.
  reportFileSet: "all", // || "modified" || "created" || "createdOrModified"

  // What to do when the PR doesn't meet the minimum code coverage threshold
  reportMode: "warn", // || "warn" || "fail" || "message"

//   // Minimum coverage threshold percentages. Compared against the cumulative coverage of the reportFileSet.
//   threshold: {
//     statements: 100,
//     branches: 100,
//     functions: 100,
//     lines: 100,
//   }
}))