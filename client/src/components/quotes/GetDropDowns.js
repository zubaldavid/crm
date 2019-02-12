// Employee dropdown
export function getQuoters = () => {
  fetch('/api/users/quoters')
  .then(res => res.json())
  .then(res => {
    let employeeList = res.map(r => r.first_name);
    this.setState({quoters: employeeList});
    console.log("quoters", this.state.quoters)
  })
}

export function getAgencies = () => {
  fetch('/api/users/quoters')
  .then(res => res.json())
  .then(res => {
    let employeeList = res.map(r => r.first_name);
    this.setState({quoters: employeeList});
    console.log("quoters", this.state.quoters)
  })
}

export function getPointsOfContact = () => {
  fetch('/api/users/quoters')
  .then(res => res.json())
  .then(res => {
    let employeeList = res.map(r => r.first_name);
    this.setState({quoters: employeeList});
    console.log("quoters", this.state.quoters)
  })
}
