$(".price-btn1").click(function(){
    $('.prc1').fadeIn(500);
    $('.prc1').css({
        display: 'block',
    })
    $('.prc2').css({
        display: 'none',
    })
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
$(".price-btn2").click(function(){
    $('.prc2').fadeIn(500);
    $('.prc2').css({
        display: 'block',
    })
    $('.prc1').css({
        display: 'none',
    })
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
