/**
 * It fetches the data from the data.json file and returns it as a JavaScript array.
 * @returns The data is being returned.
 */
async function getData() {
  const response = await fetch("../../data/data.json");
  const data = await response.json();
  return data;
}

export const catalogData = await getData();
