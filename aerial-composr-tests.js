// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by aerial-composr.js.
import { name as packageName } from "meteor/aerial-composr";

// Write your tests here!
// Here is an example.
Tinytest.add('aerial-composr - example', function (test) {
  test.equal(packageName, "aerial-composr");
});
