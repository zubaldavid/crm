// Quote Form Status
export const status = [
  { value: 'none', label: '' },
  { value: 'submitted', label:'Submitted' },
  { value: 'awarded', label: 'Awarded',  },
  { value: 'dead', label: 'Dead' },
]
// Quote Form Revision
export const revision = [
  {  value: '0', label: '0' },
  {  value: '1', label: '1' },
  {  value: '2', label: '2' },
  {  value: '3', label: '3' },
  {  value: '4', label: '4' },
  {  value: '5', label: '5' },
]

// Quote Form - Employee
export function getQuoters (){
  fetch('/api/users/quoters')
  .then(res => res.json())
  .then(res => {
    let employeeList = res.map(r => r.first_name);
    this.setState({quoters: employeeList});
    console.log("quoters", this.state.quoters)
  })
}
