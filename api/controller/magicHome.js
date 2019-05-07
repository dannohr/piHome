const { Discovery, Control, CustomMode } = require("magic-home");

let discovery = new Discovery();
let ip = null;

discovery.scan(500).then(devices => {
  ip = devices[0].address;
  console.log("The IP address is ", ip);
});

ip = "192.168.1.88";

if (ip == undefined) {
  console.log("Usage: node custom_mode_test.js <ip>");
  console.log();
  console.log(
    "Demostrates the use of the custom modes by setting the controller to a purple - green - red - blue jump effect, which is not one of the included patterns."
  );
  process.exit();
}

let control = new Control(ip, { wait_for_reply: false });

let my_effect = new CustomMode();

my_effect
  .addColor(255, 0, 255)
  .addColor(0, 255, 0)
  .addColor(255, 0, 0)
  .addColor(0, 0, 255)
  .setTransitionType("jump");

control
  .setCustomPattern(my_effect, 75)
  .then(success => {
    console.log(success ? "success" : "failed");
  })
  .catch(err => {
    return console.log("Error:", err.message);
  });
