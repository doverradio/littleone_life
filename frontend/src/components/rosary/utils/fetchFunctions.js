import { getUserRosaries, getMysteryCount, getRosaryCountByUser } from '../../../api/rosary';
import { getAllIntentions } from '../../../api/intentions';

export const fetchRosaries = async (userId, token, currentPage, rosariesPerPage, setLoading, setRosaries, setTotalRosaries, setError) => {
    setLoading(true);
    try {
        const data = await getUserRosaries(userId, token, currentPage, rosariesPerPage);
        setRosaries(data.rosaries);
        setTotalRosaries(data.total);
        setLoading(false);
    } catch (err) {
        setError(err.message);
        setLoading(false);
    }
};

export const fetchMysteryCounts = async (userId, token, setChartData) => {
    try {
        const response = await getMysteryCount(userId, token);
        if(response) {
            const labels = response.map(item => item._id);
            const data = response.map(item => item.count);
            setChartData(prevChartData => ({
                ...prevChartData,
                labels: labels,
                datasets: [{ ...prevChartData.datasets[0], data: data }]
            }));
        }
    } catch (error) {
        console.error('Error fetching mystery counts:', error);
    }
};

export const fetchIntentions = async (userId, token, setPrayerIntentions) => {
    try {
        const response = await getAllIntentions(userId, "Rosary", token);
        if (response) {
            // console.log('fetchIntentions response:', response); // Log the response
            setPrayerIntentions(response);
        } else {
            setPrayerIntentions([]);
        }
    } catch (error) {
        console.error("Error fetching intentions: ", error);
        setPrayerIntentions([]);
    }
};

export const fetchRosaryCount = async (userId, token, setCount) => {
    const response = await getRosaryCountByUser(userId, token);
    if (response) {
        setCount(response.rosaryCount);
    }
};
