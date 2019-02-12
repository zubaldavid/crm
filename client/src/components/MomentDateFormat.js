import moment from 'moment'

export function dateFormat (date) {
  if (date == null ) {}
  else {
    let newDate = moment(date).format("L");
    return newDate;
  }
}
