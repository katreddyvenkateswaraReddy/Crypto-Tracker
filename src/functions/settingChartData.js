import convertDate from "./convertDate";
const settingChartData = (prices, setChartData) => {
    setChartData({
        labels: prices.map((item) => convertDate(item[0])),
        datasets: [
          {
            label: 'Dataset 1',
            data: prices.map((item) => item[1]),
            borderWidth: 2,
            fill: true,
            tension: 0.25,
            backgroundColor: prices?"transparent":"rgba(58, 128, 233, 0.1)",
            borderColor: "#3a80e9",
            pointRadius: 0,
          },
        ],
    });
}

export default settingChartData