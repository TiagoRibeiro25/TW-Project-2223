async function getData() {
  const response = await fetch("../../data/data.json");
  const data = await response.json();
  return data;
}

const catalogData = await getData();
console.log(catalogData);
