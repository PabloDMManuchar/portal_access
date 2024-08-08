const isAPIActive = async () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/status`;
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}




export const status = {
    isAPIActive,
}