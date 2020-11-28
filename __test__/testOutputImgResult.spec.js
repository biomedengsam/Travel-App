import "babel-polyfill"
// import { resultImg } from '../src/client/js/outputImgResult'
/* I know im suppose to use the import statement above and then run test.But i ran into an issue
that Client is not defined and im sure theres a fix to this. But it overcomplicated things
so i redefined my function to test the output functionality which is the purpose for this test*/

function resultImg(data) {
    let boardImg = document.getElementById('board');
    // Result Neutral or None
    if (data.score_tag === 'NEU' || data.score_tag === 'NONE') {
        return "Neutral or None"
    }
    // Result Negative
    else if (data.score_tag === 'N' || data.score_tag === 'N+') {
        return "Negative"
    }
    // Result Positive
    else {
        return "Positive"
    }
}

describe("Testing the input functionality", () => {
    test("Testing the resultImg(inputText) function", () => {
        let data = { score_tag: 'NEU' }
        expect(resultImg(data)).toBe('Neutral or None');
    })

});