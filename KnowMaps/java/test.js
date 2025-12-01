// Ждем полной загрузки документа
/*document.addEventListener("DOMContentLoaded", function() {
    const hoverElement = document.getElementById("hoverElement"); // Элемент для наведения
    const tooltip = document.getElementById("tooltip"); // Текст подсказки

    // Обработчик события наведения мыши
    hoverElement.addEventListener("mouseover", function(event) {
        tooltip.style.display = "block"; // Показываем текст подсказки
        tooltip.style.left = event.pageX + "px"; // Устанавливаем позицию по X
        tooltip.style.top = event.pageY + "px"; // Устанавливаем позицию по Y
    });

    // Обработчик события ухода мыши
    hoverElement.addEventListener("mouseout", function() {
        tooltip.style.display = "none"; // Скрываем текст подсказки
    });
});*/
/*document.addEventListener("DOMContentLoaded", function() {
            fetch('http://127.0.0.1:8000/api/data')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('response').innerText = data.message;
                })
                .catch(error => console.error('Error:', error));
        });*/
// URL вашего API
const url = "http://example.com/items/";

// Данные, которые вы хотите отправить
const data = {
    name: "Item Name",
    price: 10.99
};

// Отправка POST-запроса
fetch(url, {
    method: 'POST', // Метод запроса
        headers: {
            'Content-Type': 'application/json' // Указываем тип контента
        },
    body: JSON.stringify(data) // Преобразуем данные в строку JSON
})
.then(response => {
    if (!response.ok) {
        throw new Error('Сеть ответа не в порядке: ' + response.status);
    }
    return response.json(); // Преобразуем ответ в JSON
})
.then(data => {
    console.log("Данные успешно отправлены!", data);
})
.catch(error => {
    console.error("Произошла ошибка:", error);
});
       /* fetch("http://127.0.0.1:8000/data-base/ip")
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
        })
        .catch(error => {
            console.error(`Ошибка даун`, error)
        })
})*/