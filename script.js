window.onload = function () {
  // Сохраняем адрес API
  var api = "https://swapi.dev/api/";

  
    // Формируем полный адрес запроса:
    var url = api + "people/?search="; // добавляем к запросу тип необходимых данных подробно о формате https://swapi.dev/documentation
    url += "obi"; // значение переменной запроса search
  
    // Таким образом формируется строка вида:
    // https://swapi.dev/api/people/?search=obi
  
    // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
    var request = new XMLHttpRequest();
  
    // Назначаем обработчик события load для запроса
    request.addEventListener("load", function () {
      // отображаем в консоли текст ответа сервера
      console.log(request.response); 
      
      // парсим его из JSON-строки в JavaScript-объект
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

      // Проверяем, если поле имя в ответе на запрос
      if (response.count == 0) {
        alert("К сожалению, данные не получены по запросу: " + url);
        return;
      }

      // Если все в порядке, то отображаем количество результатов поиска
      alert("Найдено персонажей:" + response.count);

    });

    // Обработчик готов, можно отправлять запрос
    // Открываем соединение и отправляем
    request.open("get", url);
    request.send();


  };