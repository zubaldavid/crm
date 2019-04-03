
const newDate = new Date();
//Add new log to the appLogs table
export function publishLog(name, action,newDate,e) {
  e.preventDefault();
  fetch('api/logs/', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name : name,
      action : action,
      date: newDate
    })
  })
  console.log("New log has been published!");
}
