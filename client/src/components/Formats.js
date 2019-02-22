import moment from 'moment'

export function dateFormat (date) {
  if (date == null ) {}
  else {
    let newDate = moment(date).format("L");
    return newDate;
  }
}

export function numberFormat (dollar) {
  if (dollar == null || dollar === 0 ) {}
  else {
    let cost  = ("$" + dollar.toLocaleString());
    return cost;
  }
}

export function percentFormat (double) {
  if ( double == null ) {}
  else {
    return double.toLocaleString("en", {style:'percent'});
  }
}
