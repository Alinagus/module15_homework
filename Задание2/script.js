const btn = document.getElementById('button');

btn.addEventListener('click', function(){
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const windowSize = [['Ширина: '+ width], " " + ['Высота: ' + height]]
    alert(windowSize)
})
