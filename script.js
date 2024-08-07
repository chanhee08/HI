document.addEventListener('DOMContentLoaded', function() {
    const increaseButton = document.getElementById('increaseButton');
    const decreaseButton = document.getElementById('decreaseButton');
    const currentIntakeElement = document.getElementById('currentIntake');
    const averageButton = document.getElementById('averageButton');
    const averageIntakeElement = document.getElementById('averageIntake');
    const calendarElement = document.getElementById('calendar');
    const cupImage = document.getElementById('cupImage');
    const calendarTitle = document.getElementById('calendarTitle');
    const monthButtons = document.querySelectorAll('.month-button');
    const projectTitle = document.getElementById('projectTitle');
    let currentIntake = 0;
    let dailyIntake = Array(31).fill(0);

    increaseButton.addEventListener('click', () => {
        currentIntake++;
        currentIntakeElement.textContent = currentIntake;
    });

    decreaseButton.addEventListener('click', () => {
        if (currentIntake > 0) {
            currentIntake--;
            currentIntakeElement.textContent = currentIntake;
        }
    });

    averageButton.addEventListener('click', () => {
        const recordedDays = dailyIntake.filter(intake => intake > 0);
        const averageIntake = recordedDays.reduce((sum, intake) => sum + intake, 0) / recordedDays.length;
        averageIntakeElement.textContent = `하루 평균 물 섭취량: ${averageIntake.toFixed(2)} 컵`;
        
        if (averageIntake >= 0 && averageIntake <= 1) {
            cupImage.src = 'one-cup-or-less.png';
        } else if (averageIntake > 1&& averageIntake <= 3) {
            cupImage.src = 'two-to-three-cups.png';
        }else if (averageIntake > 3 && averageIntake <= 5) {
            cupImage.src='four-to-five-cups.png';
        }else if (averageIntake > 5 && averageIntake <= 7) {
            cupImage.src = 'six-to-seven-cups.png';
        } else if (averageIntake > 7) {
            cupImage.src = 'eight-cups-or-more.png';
        }else {
            cupImage.scr = '';
        }
        
        if (averageIntake > 0) {
            cupImage.style.display = 'block';
        } else {
            cupImage.style.display = 'none';
        }
    });

    


    function renderCalendar(month, days) { 
        calendarElement.innerHTML = '';
        calendarTitle.textContent = `${month}월`; 
        dailyIntake = Array(days).fill(0);
        for (let day = 1; day <= days; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.addEventListener('click', () => {
                dailyIntake[day - 1] = currentIntake;
                dayElement.innerHTML = `${day}<br/>(${currentIntake}컵)`;
                currentIntake = 0;
                currentIntakeElement.textContent = currentIntake;
            });
            calendarElement.appendChild(dayElement);
        }
    }

    monthButtons.forEach(button => { 
        button.addEventListener('click', () => {
            const month = button.getAttribute('data-month'); 
            const days = parseInt(button.getAttribute('data-days'), 10);
            renderCalendar(month, days);
        });
    });

    projectTitle.addEventListener('click', () => {
        window.location.href = 'intro.html';
    });



    renderCalendar(1, 31); 
});
