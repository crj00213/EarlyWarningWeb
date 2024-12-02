let excelData = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        excelData = data;
    });


//查詢學號
document.getElementById('searchButton').addEventListener('click', function () {
    const studentId = document.getElementById('studentId').value.trim();
    const resultDiv = document.getElementById('result');

    if (!studentId) {
        resultDiv.innerHTML = `<p>請輸入學號！</p>`;
        return;
    }

    const result = excelData.find(row => row['學號'] === studentId);

    if (result) {
        const quizScore = result['小考成績'] || 0;
        const midtermScore = result['期中考'] || 0;
        const weightedScore = quizScore * 0.15 + midtermScore * 0.3;

        if (weightedScore < 30) {
            resultDiv.innerHTML = `
                <p>學號：${result['學號']}</p>
                <p>第一次小考：${quizScore}</p>
                <p>期中考：${midtermScore}</p>
                <p style="color: red; font-size: 20px; ">期中預警！</p>
            `;
        } else {
            resultDiv.innerHTML = `
                <p>學號：${result['學號']}</p>
                <p>第一次小考：${quizScore}</p>
                <p>期中考：${midtermScore}</p>
                <p style="color: green; font-size: 20px;">成績穩定，無需預警。</p>
            `;
        }
    } else {
        resultDiv.innerHTML = `<p>查無此學號！</p>`;
    }
});
