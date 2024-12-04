let phy_grade = [];
let econ_grade = [];

Promise.all([
    fetch('grade_phy.json').then(res => res.json()),
    fetch('grade_econ.json').then(res => res.json())
]).then(([data1, data2]) => {
    phy_grade = data1;
    econ_grade = data2;
});


//查詢學號
document.getElementById('searchButton').addEventListener('click', function () {
    const studentId = document.getElementById('studentId').value.trim();
    const resultDiv = document.getElementById('result');

    if (!studentId) {
        resultDiv.innerHTML = `<h2>請輸入學號！</h2>`;
        return;
    }

    const result_phy = phy_grade.find(row => row['學號'] === studentId);
    const result_econ = econ_grade.find(row => row['學號'] === studentId);
    const calculateWarning = (quiz, midterm) =>{
        const weightedScore = quiz * 0.15 + midterm * 0.3;
        return weightedScore < 27
        ? `<p style="color: red; font-size: 20px">期中預警！請注意！</p>`
        : `<p style="color: green; font-size: 20px">無預警！請繼續保持！</p>`;
    }
    let output = `<h2>查詢結果：</h2>`;

    if (result_phy || result_econ) {
        output += `<p>學號：${studentId}</p>`;

        if(result_phy){
            const quiz = result_phy['小考成績'] || 0;
            const midterm = result_phy['期中考'] || 0;
            output += `
                <h3>科目：心理統計</h3>
                <p>第一次小考：${quiz}</p>
                <p>期中考：${midterm}</p>
                ${calculateWarning(quiz, midterm)}`;
        }

        if (result_econ) {
            const quiz = result_econ['小考成績'] || 0;
            const midterm = result_econ['期中考'] || 0;
            output += `
                <h3>科目：經濟學原理：個體篇</h3>
                <p>第一次小考：${quiz}</p>
                <p>期中考：${midterm}</p>
                ${calculateWarning(quiz, midterm)}`;
        }
    }
    else
        output += `<h2>查無學號！</h2>`;
    resultDiv.innerHTML = output;
});
