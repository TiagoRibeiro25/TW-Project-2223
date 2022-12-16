/**
 * It fetches the data from the data.json file and returns it as a JavaScript array.
 * @returns The data is being returned.
 */
async function getData() {
  const data = await fetch("../../data/data.json")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));

  return data;
}

export const catalogData = await getData();
