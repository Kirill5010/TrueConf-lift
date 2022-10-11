let maxHeight = document.querySelector('.lift-cont__sha').clientHeight
let navBtn = Array.from(document.querySelectorAll('.lift-cont__nav__btn'))
let liftNav = document.querySelector('.lift__nav')
let liftDoor = document.querySelector('.lift__door')
let lift = document.querySelector('.lift')
let oneFloor = maxHeight / navBtn.length
lift.classList.add('lift-stand')


// счетчики для отработки рекурсии
let count = 0
let reCount = 0
// Объект для Storage
let obj = {}

// для вгрузки из Storage
let newOBJ = JSON.parse(localStorage.getItem('myStorage'));
liftNav.innerHTML = newOBJ.position
lift.style = newOBJ.style

// Слушатель событий на кнопки
navBtn.map((btn)=>{
   btn.addEventListener('click', async (e) =>{
      count = reCount
      reCount++
      e.target.classList.add('green')
      return (foo(e,count))
   })
})
// Функция с рекурсией для отработки последовательности событий
function foo(e,count){
   return  setTimeout(() => count == 0 ? movement(e, count) : [count--, foo(e, count)], 3000)
}

// Функция отвечающая за передвижение лифта
function movement (e,count) {
   // закрытие дверей
   closeDoor()
   // направление движения
   UpDown(e)
   // движение лифта
   setTimeout(() => {
      let num = e.target.innerHTML - 1
      lift.style = `bottom:${oneFloor * num}px; transition: 1s;`
      // запись в storage последнее состояние лифта
      obj.style = `bottom:${oneFloor * num}px;`
      localStorage.setItem('myStorage', JSON.stringify(obj))
      // открытие дверей
      setTimeout(() => {
         openDoor()
         finalCall(e)
         reCount--
         count = reCount
      }, 1000)
   }, 1000)
}

// Функция вычесляе направление движения лифта 
function UpDown (e){
   let position = lift.style.bottom
   let num = e.target.innerHTML - 1
   let nextFloor = oneFloor * num

   if (parseInt(position) < Math.round(nextFloor)) {
      liftNav.innerHTML = `Вверх ${e.target.innerHTML}`
      // Записываем в store последнее направление лифта
      obj.position = `Вверх ${e.target.innerHTML}`
      localStorage.setItem('myStorage', JSON.stringify(obj))
   } else {
      liftNav.innerHTML = `Вниз ${e.target.innerHTML}`
      // Записываем в store последнее направление лифта
      obj.position = `Вниз ${e.target.innerHTML}`
      localStorage.setItem('myStorage', JSON.stringify(obj))
   }

}

function finalCall (e){
   e.target.classList.remove('green')
}

function openDoor(e) {
         lift.classList.add('lift-stand')
         liftDoor.classList.remove('lift__door-active')
}
function closeDoor() {
         lift.classList.remove('lift-stand')
         liftDoor.classList.add('lift__door-active')
}

