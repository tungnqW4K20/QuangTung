const circle = document.getElementById('circle');
const pointer = document.getElementById('pointer');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');

spinBtn.addEventListener('click', spinCircle);

function spinCircle() {
    const randomDegree = Math.floor(Math.random() * 3600) + 360 * 5;
    circle.style.transition = 'transform 5s ease-out';
    circle.style.transform = `rotate(${randomDegree}deg)`;
    spinBtn.disabled = true;
    setTimeout(showResult, 5000);
}

function showResult() {
    const degree = getRotationDegrees(circle);
    const section = determineSection(degree);
    resultDiv.textContent = `Số tiền bạn nhận được là: ${section} điểm.`;
    spinBtn.disabled = false;
}

function getRotationDegrees(element) {
    const style = window.getComputedStyle(element);
    const matrix = style.transform || style.webkitTransform || style.mozTransform;
    let angle = 0;
    if (matrix !== 'none') {
        const values = matrix.split('(')[1].split(')')[0].split(',');
        const a = values[0];
        const b = values[1];
        angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }
    return angle >= 0 ? angle : angle + 360;
}

function determineSection(degree) {
    const sections = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];
    const sectionAngle = 360 / sections.length;
    const index = Math.floor(degree / sectionAngle);
    return sections[index];
}
