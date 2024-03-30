import convertDate from "./convertDate";
const settingChartData = (prices1,setChartData,prices2) => {
    if(prices2){
      setChartData({
        labels: prices1.map((item) => convertDate(item[0])),
        datasets: [
          {
            label: 'Crypto1',
            data: prices1.map((item) => item[1]),
            borderWidth: 2,
            fill: false,
            tension: 0.25,
            borderColor: "#3a80e9",
            pointRadius: 0,
            yAxisID: "crypto1",
          },
          {
            label: 'Crypto2',
            data: prices2.map((item) => item[1]),
            borderWidth: 2,
            fill: false,
            tension: 0.25,
            borderColor: "#61c96f",
            pointRadius: 0,
            yAxisID: "crypto2",
          },
        ],
    });
    }
    else{
      setChartData({
        labels: prices1.map((item) => convertDate(item[0])),
        datasets: [
          {
            label: 'Dataset 1',
            data: prices1.map((item) => item[1]),
            borderWidth: 2,
            fill: true,
            tension: 0.25,
            backgroundColor: prices1?"transparent":"rgba(58, 128, 233, 0.1)",
            borderColor: "#3a80e9",
            pointRadius: 0,
            yAxisID: "crypto1",
          },
        ],
    });
    }
}

export default settingChartData