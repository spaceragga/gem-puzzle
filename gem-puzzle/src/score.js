/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
exports.setScore = function () {
  const allScore = JSON.parse(localStorage.getItem('allScore'));
  if (allScore && allScore.length > 0) {
    allScore.sort((a, b) => ((a[0] + a[1]) - (b[0] + b[1])));
    for (let i = 0; i < 10; i++) {
      if (!allScore[i]) break;
      document.getElementById(`scoreList${i + 1}`).innerHTML = `Время: 
        ${Math.floor(allScore[i][0] / 60).toString().padStart(2, '0')}:${(allScore[i][0] % 60).toString().padStart(2, '0')}
         Ходов: ${allScore[i][1]}`;
    }
  }
};
