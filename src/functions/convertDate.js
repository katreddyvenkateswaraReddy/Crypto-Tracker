const coinData = (data) => {
    var myData = new Date(data);
    return myData.getDate() + '/' + (myData.getMonth() + 1) ;
}

export default coinData