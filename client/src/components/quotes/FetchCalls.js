// Functions are called to GET data frrom the server.

export function getBidsList (url,activePage, data) {
  if ( activePage === undefined) {activePage = 1;}
  let fullUrl = (url + activePage);
  console.log('Quote List:', fullUrl);
  fetch(fullUrl)
  .then(res => res.json())
  .then(fetch => {
    data = fetch;
    console.log("data", data);
  })
  console.log("return quotes:", data);
  return data;
}

export function getCount (url, data) {
  console.log(url);
  fetch(url)
  .then(res => res.json())
  .then(raw =>  data = raw[0].count );
  console.log('Count:', data);
  return data;
}

export function getProfit () {
  const profit = 0;
  fetch('/api/quote/completed_bids/profit')
  .then(res => res.json())
  .then(data => {
    this.setState({profit:data[0].sum});
  });
  return profit;
}

export function getMargin () {
  const margin = 0;
  fetch('/api/quote/completed_bids/margin')
  .then(res => res.json())
  .then(data => {
    this.setState({margin:data[0].avg});
  });
  return margin;
}
