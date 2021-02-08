export const getShortUrl = async (url: string) => {
    const SERVICE_URL = "http://localhost:9001/v1/link";
    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url })
    };
    const response = await fetch(SERVICE_URL, options);
    return await response.json();
}