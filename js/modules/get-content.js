let getContent = [];

fetch('https://26.javascript.pages.academy/kekstagram/data')
.then((response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status} — ${response.statusText}`);
})
.then((response) => {return response.json()})
.then((posts) =>  {getContent =posts})
.catch((error) => console.log(error));

console.log(getContent)

  export  {getContent};
