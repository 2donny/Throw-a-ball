//Step 1
RADIUS = 10; 
TIME_INTERVAL = 10;
DIRECTION_LENGTH = 100;
INIT_VELOCITY = 700;
GRAV_ACCEL = 490;

//Step 2
const degreeToRadian = (deg) => {
    const rad = deg * Math.PI / 180;
    return rad;
}
//Step 3
const getProjectilePosition = (time, angle) => {
    const rad = degreeToRadian(angle);

    return {
        x: -RADIUS + INIT_VELOCITY * time * Math.cos(rad),
        y: -RADIUS + INIT_VELOCITY * time * Math.sin(rad) - 0.5 * GRAV_ACCEL * time * time,
    };
}
//Step 4
const getDirectionElementPosition = (angle) => {
    const rad = degreeToRadian(angle);
    return {
        x: 0.5 * DIRECTION_LENGTH * (Math.cos(rad) - 1),
        y: 0.5 * DIRECTION_LENGTH * Math.sin(rad),
    };
}
//Step 5
const setElementPosition = (element, position) => {
    element.style.left = position.x + "px";
    element.style.bottom = position.y + "px";
}

//Step 6
const createNewball = () => {
    const newBall = document.createElement('div');
    newBall.classList.add('ball');

    setElementPosition(newBall, {x: -RADIUS, y: -RADIUS});
    
    const panelEL = document.getElementById('panel');
    panelEL.appendChild(newBall);
    return newBall;
}

//Step 7 
// input angle값 변경시 발생하는 이벤트 "change"

document.getElementById("angle").addEventListener('change', function() {
    const angle = this.value;
    const directionEL = document.getElementById('direction');

    directionEL.style.transform = "rotate(-" + angle + "deg)"; 
    const position = getDirectionElementPosition(angle);
    setElementPosition(directionEL, position);
});


//Step 8 * shooting 버튼 클릭 시 발생하는 이벤트 "click"
document.getElementById('shooting').addEventListener('click', function() {
    const ballEL = createNewball();
    const angle = document.getElementById('angle').value;

    let time=0;
    const loopid = setInterval(() => {
        time += TIME_INTERVAL / 1000;
        const pos = getProjectilePosition(time, angle);
        setElementPosition(ballEL, pos);

        if(pos.y < -RADIUS) {
            document.getElementById('panel').removeChild(ballEL);
            clearInterval(loopid);
        }

    }, TIME_INTERVAL);

});



