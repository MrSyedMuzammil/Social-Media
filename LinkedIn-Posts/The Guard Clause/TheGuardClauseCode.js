function registerUser(user) {
  // Deep indentation makes logic hard to follow
  if (user) {
    if (user.email) {
      if (user.password) {
        saveToDatabase(user);
      }
    }
  }
}

function registerUser(user) {
  // Checks for bad data first & stops immediately
  if (!user) return;
  if (!user.email) return;
  if (!user.password) return;

  // The "Happy Path" runs here
  saveToDatabase(user);
}
