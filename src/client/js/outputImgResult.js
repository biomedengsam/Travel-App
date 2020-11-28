// Output image according to api response function
function resultImg(data) {
    let boardImg = document.getElementById('board');
    // Result Neutral or None
    if (data.score_tag === 'NEU' || data.score_tag === 'NONE') {
        let result = "Neutral or None";
        boardImg.src = Client.boardN;
        return result
    }
    // Result Negative
    else if (data.score_tag === 'N' || data.score_tag === 'N+') {
        boardImg.src = Client.boardNeg;
        return "Negative"
    }
    // Result Positive
    else {
        boardImg.src = Client.boardP;
        return "Positive"
    }
}

export {
    resultImg
}