export const getData = async (url: string) => {
    try {
        const res = await fetch(url, { next: { revalidate: 30 } });
        console.log('revalidate');

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }

        return res.json();
    } catch (error) {
        // Handle any errors that occur during fetch operation
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}
