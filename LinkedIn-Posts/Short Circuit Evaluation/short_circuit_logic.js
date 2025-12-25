// Scenario: Sending an email only if the user has an email address
const user = { email: "syed@example.com" };

// Standard way
if (user.email) {
  sendEmail(user.email);
}

// Short-circuit way
// 1. Checks user.email? Truthy.
// 2. Continues to execute sendEmail().
user.email && sendEmail(user.email);

// Scenario: Port configuration
const envPort = undefined; // Not set in environment
const defaultPort = 3000;

// Short-circuit way
// 1. Checks envPort? Falsy.
// 2. Moves to defaultPort. Returns 3000.
const port = envPort || defaultPort;
