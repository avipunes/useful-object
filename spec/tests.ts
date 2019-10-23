const Jasmine = require("jasmine");
const jas = new Jasmine();
jas.loadConfig({
    spec_dir: "dist/spec",
    spec_files: ["**/*[sS]pec.js"],
    helpers: ["helpers/**/*.js"],
    random: true,
    seed: null,
    stopSpecOnExpectationFailure: false
});
jas.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

// setup console reporter
const JasmineConsoleReporter = require("jasmine-console-reporter");
const reporter = new JasmineConsoleReporter({
    colors: 1, // (0|false)|(1|true)|2
    cleanStack: 1, // (0|false)|(1|true)|2|3
    verbosity: 4, // (0|false)|1|2|(3|true)|4|Object
    listStyle: "indent", // "flat"|"indent"
    timeUnit: "ms", // "ms"|"ns"|"s"
    timeThreshold: { ok: 500, warn: 1000, ouch: 3000 }, // Object|Number
    activity: true,
    emoji: true, // boolean or emoji-map object
    beep: true
});

// initialize and execute
jas.env.clearReporters();
jas.addReporter(reporter);
jas.execute();
