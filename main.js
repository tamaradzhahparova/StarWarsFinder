//сохраняем адрес API
const api = "https://swapi.dev/api/";

//создаем полный адрес запроса (персонаж по умолчанию)
let url = api + "people/";
let fullUrl = url + '?search=';

// получаем доступ ко всем необходимым для нас элементам
const select = document.getElementById('list1');
const personData = document.querySelector('.person_data')
const shipData = document.querySelector('.ship_data')
const planetData = document.querySelector('.planet_data')
const result = document.querySelector('.search_result');
const btn = document.getElementById('search_request_btn');
const person = document.getElementById('person_search_input');

//переменная для вывода вида результата (персонаж по умолчанию)
let resultType = 'персонажей';

// пишем функцию, которая меняет интерфейс страницы в зависимости от того, что мы ищем
function searchHandler(value) {
    result.innerHTML = '';

    if (select.value == 1) {
        personData.classList.remove('hidden');
        shipData.classList.add('hidden');
        planetData.classList.add('hidden');
        url = api + "people/";
        fullUrl = url + '?search=';
        resultType = 'персонажей';
    };

    if (select.value == 2) {
        shipData.classList.remove('hidden');
        personData.classList.add('hidden');
        planetData.classList.add('hidden')
        //создаем полный адрес запроса
        url = api + "starships/";
        fullUrl = url + '?search=';
        resultType = 'кораблей';
    };

    if (select.value == 3) {
        planetData.classList.remove('hidden');
        personData.classList.add('hidden');
        shipData.classList.add('hidden')
        //создаем полный адрес запроса
        url = api + "planets/";
        fullUrl = url + '?search=';
        resultType = 'планет';
    };
}

//Вешаем на кнопку поиска обработчик события "клик" 
btn.addEventListener('click', function (ev) {
    ev.preventDefault();

    result.innerHTML = '';

    const searchUrl = fullUrl + person.value;

    // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
    let request = new XMLHttpRequest();

    // Назначаем обработчик события load для запроса
    request.addEventListener("load", function () {
        // парсим ответ из JSON-строки в JavaScript-объект
        var response = JSON.parse(request.response);

        // Проверяем статус-код, который прислал сервер
        // 200 — это ОК, остальные — ошибка или не подходят
        if (request.status !== 200) {
            alert(
                "Произошла ошибка при получении ответа от сервера:\n\n" +
                response.message
            );
            return;
        }

        // Проверяем, есть ли поле имя в ответе на запрос
        if (response.count == 0) {
            alert("Ничего не найдено, попробуйте еще раз!");
            return;
        }
        //если все нормально, выводим информацию о количестве нвйденных результатов
        let responseCount = document.createElement('p');
        responseCount.innerHTML = `Найдено ${resultType}:  ${response.count}`
        result.append(responseCount);

        //Добавляем найденные результаты в список на странице
        for (let i = 0; i < response.count; i++) {
            let listItem = document.createElement('li');
            listItem.innerHTML = response.results[i].name;
            result.append(listItem);
        };
    });

    // Обработчик запроса готов, можно отправлять запрос
    // Открываем соединение и отправляем
    request.open("get", searchUrl);
    request.send();
});

const resultsList = document.querySelector('.search_result');

let resultName;

resultsList.addEventListener('click', function () {
    let resultItem = event.target.closest('li');
    if (!resultItem) return;
    resultName = resultItem.textContent;

    const resultUrl = fullUrl + resultName;


    let request = new XMLHttpRequest();
    request.addEventListener("load", function () {
        // парсим ответ из JSON-строки в JavaScript-объект
        var response = JSON.parse(request.response);

        console.log(response);

        if (request.status !== 200) {
            alert(
                "Произошла ошибка при получении ответа от сервера:\n\n" +
                response.message
            );
            return;
        }

        if (select.value == 1) {
            let name = document.getElementById('person_name');
            name.innerHTML = response.results[0].name;

            let height = document.getElementById('person_height');
            height.innerHTML = response.results[0].height;

            let mass = document.getElementById('person_mass');
            mass.innerHTML = response.results[0].mass;

            let birth_year = document.getElementById('person_birth_year');
            birth_year.innerHTML = response.results[0].birth_year;

            let films_count = document.getElementById('person_films_count');
            films_count.innerHTML = response.results[0].films.length;
        }

        if (select.value == 2) {
            let name = document.getElementById('ship_name');
            name.innerHTML = response.results[0].name;

            let model = document.getElementById('model');
            model.innerHTML = response.results[0].model;

            let length = document.getElementById('length');
            length.innerHTML = response.results[0].length;

            let passengers = document.getElementById('passengers');
            passengers.innerHTML = response.results[0].passengers;

            let manufacturer = document.getElementById('manufacturer');
            manufacturer.innerHTML = response.results[0].manufacturer;
        }

        if (select.value == 3) {
            let name = document.getElementById('planet_name');
            name.innerHTML = response.results[0].name;

            let orbital_period = document.getElementById('orbital_period');
            orbital_period.innerHTML = response.results[0].orbital_period;

            let diameter = document.getElementById('diameter');
            diameter.innerHTML = response.results[0].diameter;

            let climate = document.getElementById('climate');
            climate.innerHTML = response.results[0].climate;

            let population = document.getElementById('population');
            population.innerHTML = response.results[0].population;
        }




    });

    request.open("get", resultUrl);
    request.send();


});