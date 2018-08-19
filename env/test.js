// I log information to the console, if debugging is enabled. This is expecting to
// use either the console.log or the console.trace method.
debug = process.env.debug
  ? console[process.env.debug]
  : function() {
      /* no-op. */
    };

// Test environmental variable.
console.log("Env( hello ): %s", process.env.hello);

// Trying debugging some information (behavior will change based on environment).
debug("This is me debugging!");
