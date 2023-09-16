$(".price-btn1").click(function(){
    document.getElementById("pidz").textContent = "42,000"
    document.getElementById("midz").textContent = "28,000"
    document.getElementById("widz").textContent = "9,800"
    document.getElementById("midday").textContent = "Rs 300"
    document.getElementById("morning").textContent = "Rs 500"
    $('.price-btn2').css({
        border: 'none',
        backgroundColor: 'transparent',
        color: '#09203e',
    })
    $(this).css({
        backgroundColor: '#09203e',
        color: '#ffffff',
        transition: '0.3s ease-in-out',
    })
})
function animateNumber(numberElement,targetNumber, duration) {
    const increment = targetNumber / (duration / 50); // Increment every 50ms
    let currentNumber = 0;

    function updateNumber() {
        if (currentNumber < targetNumber) {
            currentNumber += increment;
            numberElement.textContent = Math.floor(currentNumber);
            requestAnimationFrame(updateNumber);
        } else {
            numberElement.textContent = targetNumber;
        }
    }

    updateNumber();
}
$(".price-btn2").click(function(){
document.getElementById("pidz").textContent = "30,000"

document.getElementById("midz").textContent = "20,000"
document.getElementById("widz").textContent = "7,000"
document.getElementById("midday").textContent = "Rs 200"
document.getElementById("morning").textContent = "Rs 300"

    $('.price-btn1').css({
        border: 'none',
        backgroundColor: 'transparent',
        color: '#09203e',
    })
    $(this).css({
        backgroundColor: '#09203e',
        color: '#ffffff',
        transition: '0.3s ease-in-out',
    })
})

// Packages for Memberships
$(".price-btn1-member").click(function(){
    $('.prc1-member').fadeIn(500);
    $('.prc1-member').css({
        display: 'block',
    })
    $('.prc2-member').css({
        display: 'none',
    })
    $('.price-btn2-member').css({
        border: 'none',
        backgroundColor: 'transparent',
        color: '#09203e',
    })
    $(this).css({
        backgroundColor: '#09203e',
        color: '#ffffff',
        transition: '0.3s ease-in-out',
    })
})
$(".price-btn2-member").click(function(){
    $('.prc2-member').fadeIn(500);
    $('.prc2-member').css({
        display: 'block',
    })
    $('.prc1-member').css({
        display: 'none',
    })
    $('.price-btn1-member').css({
        border: 'none',
        backgroundColor: 'transparent',
        color: '#09203e',
    })
    $(this).css({
        backgroundColor: '#09203e',
        color: '#ffffff',
        transition: '0.3s ease-in-out',
    })
})
