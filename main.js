let box = document.querySelector('.box'),
    innerBoxes = document.querySelectorAll('.inner-box'),
    mainText = document.querySelector('.main-text'),
    wrapper = document.querySelector('.wrapper'),
    canvas = document.querySelector('canvas'),
    $ = canvas.getContext('2d')
    functions = [
        function() { wrapper.style.backgroundColor = '#061747' },
        function() { mainText.style.transform = 'scale(1)' },
    ]

function transform() {
    let value = -1000
    innerBoxes.forEach(elem => {
        elem.style.transform = `translateY(${value}px)`
        value -= value * 2
    })
}

function canvasOperation() {
    let w = canvas.width = window.innerWidth, 
        h = canvas.height = window.innerHeight  
    
    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth
        h = canvas.height = window.innerHeight 
    })

    function drawStar() {
        let radius = 0,
            x = [],
            y = [],
            colors = [
                'rgba(243, 8, 255, .6)', 
                'rgba(50, 227, 53, .6)', 
                'rgba(255, 207, 64, .6)', 
                'rgba(62, 209, 250, .6)'
            ],
            randomColor = Math.floor(Math.random() * 4)

        for (let i = 0; i < 5; ++i) {
            x.push(Math.random() * w)
            y.push(Math.random() * h)
        }
        let increase = setInterval(() => {
            if (radius < 10) {
                for (let i = 0; i < x.length; ++i) {
                    $.beginPath()
                    $.fillStyle = colors[randomColor]
                    $.arc(x[i], y[i], radius, 0, Math.PI * 2)
                    $.fill()
                    radius += 0.2
                }
            } else {
                $.clearRect(0, 0, w, h)
                clearInterval(increase)
                setTimeout(() => {
                    drawStar()
                }, 500)
            }
        }, 100)
    }
    drawStar()
}

function main() {
    box.removeEventListener('click', main)
    transform()
    for (let i = 0; i < functions.length; ++i) {
        let time = 50
        setInterval(() => {
            functions[i]()
        }, time)
        time += 50
    }
    setTimeout(() => {
        canvasOperation()
    }, 100)
}

box.addEventListener('click', main)
