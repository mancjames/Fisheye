fetch('../fisheyedata.json')
  .then((res) => res.json())
  .then((data) => console.log(data));
