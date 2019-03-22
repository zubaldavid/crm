
const newDate = new Date();
//Add new log to the appLogs table
export publishLog (name, action) {
  fetch('api/logs/', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name : name,
      action : action,
      date: newDate
    })
    console.log("New log has been published!");
  })
}
