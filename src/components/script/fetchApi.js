const fetchApi = async (url, method) => {
  try {
    const response = await fetch(url, {
      method: method || "GET",
      credentials: "include",
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
} catch (error) {
    console.error("Error fetching data:", error);
}
};

export default fetchApi;