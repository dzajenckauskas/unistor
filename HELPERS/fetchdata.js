export async function fetchData(link, data) {
   try {
      const res = await fetch(link, {
         method: "POST",
         headers: {"Content-type": "application/json"},
         body: JSON.stringify(data),
      });
      return await res.json();
   } catch (error) {
      console.log(error);
   }
}
