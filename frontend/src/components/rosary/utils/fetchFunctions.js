import { getUserRosaries, getMysteryCount, getRosaryCountByUser } from '../../../api/rosary';
import { getAllIntentions } from '../../../api/intentions';

export const fetchRosaries = async (userId, currentPage, rosariesPerPage, setLoading, setRosaries, setTotalRosaries, setError) => {
    setLoading(true);
    try {
        const data = await getUserRosaries(userId, currentPage, rosariesPerPage);
        setRosaries(data.rosaries);
        setTotalRosaries(data.total);
        setLoading(false);
    } catch (err) {
        setError(err.message);
        setLoading(false);
    }
};

export const fetchMysteryCounts = async (userId, setChartData) => {
    try {
        const response = await getMysteryCount(userId);
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

export const fetchIntentions = async (userId, setPrayerIntentions) => {
    try {
        const response = await getAllIntentions(userId, "Rosary");
        if (response) {
            setPrayerIntentions(response);
        } else {
            setPrayerIntentions([]);
        }
    } catch (error) {
        console.error("Error fetching intentions: ", error);
        setPrayerIntentions([]);
    }
};

export const fetchRosaryCount = async (userId, setCount) => {
    const response = await getRosaryCountByUser(userId);
    if (response) {
        setCount(response.rosaryCount);
    }
};
