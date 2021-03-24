import { schedule } from "danger"
import { istanbulCoverage } from "danger-plugin-istanbul-coverage/dist/index"
import { SortMethod } from "danger-plugin-istanbul-coverage/dist/config.model"

// fail("This is a failure message")
// warn("This is a warning")
// message("This is a normal message")
// markdown("*Markdown* is also **supported**")

// const { additions = 0, deletions = 0 } = danger.github.pr
// message(`:tada: The PR added ${additions} and removed ${deletions} lines.`)



// schedule(istanbulCoverage()) // Use default configuration

schedule(istanbulCoverage({
  // Set a custom success message
  customSuccessMessage: "Congrats, coverage is good",

  // Set a custom failure message
  customFailureMessage: "Coverage is a little low, take a look",

  // How to sort the entries in the table
  entrySortMethod: "alphabetically" as SortMethod, // || "least-coverage" || "most-coverage" || "largest-file-size" ||"smallest-file-size" || "uncovered-lines"

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

  // Minimum coverage threshold percentages. Compared against the cumulative coverage of the reportFileSet.
  threshold: {
    statements: 60,
    branches: 60,
    functions: 60,
    lines: 60,
  }
}))