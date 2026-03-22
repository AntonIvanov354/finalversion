// Ждем, пока весь HTML-документ будет загружен и разобран
document.addEventListener("DOMContentLoaded", async function() {
    //Все необходимые элементы/переменные
    const url = "http://127.0.0.1:8000/entrance";
    const registerButton = document.getElementById("buttonEntrance");

    //Нажатие кнопки, после чего происходит проверка данных на сервере и в дальнейшем выводе либо ошибки либо вход в аккаунт
    registerButton.addEventListener("click", async function() {
          // Отправка данных на сервак
            await requestEntranceServer();
        });

        async function makeRequest(url, options = {}) {
            const defaultOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            };

            const mergeOptionst = {
                ...defaultOptions,
                ...options,
                headers: {
                    ...defaultOptions.headers,
                    ...options.headers
                }
            };

            if(options.body && typeof options.body == `object`){
                mergeOptionst.body = JSON.stringify(options.body)
            }
            try{
                const response = await fetch(url, mergeOptionst)

                if(!response.ok){
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
                }

                try{
                    const data = await response.json()
                    return {success: true, data, status: response.status}
                }catch(jsonError){
                    const text = await response.text()
                    return {success: true, data: text, status: response.status}
                }

            } catch(error){
                return {
                    success: false,
                    error: error.message,
                    status: error.status || 0
                }
            }
        }
    const  requestEntranceServer = async () =>{   
        // Получаем все необходимые элементы из DOM по их ID
        const window_email_data = document.getElementById("window_email_data").value;
        const window_password_data = document.getElementById("window_password_data").value;

        //Все неоходимые функции

        //Ошибка в почте
        const print_error_email_and_password = async() => {
            const id_window_error_email = document.getElementById("title_error_email");
            const id_window_error_password = document.getElementById("title_error_password");
            id_window_error_email.style.display = "block";
            id_window_error_password.style.display = "block";
        };

        //Все необходимые списки

        //Создание спика для отправки на сервер
        const userData = {
            email: window_email_data,
            password: window_password_data,
        };
        //Запрос на сервер
        try{
            const requestEntrance = await makeRequest(url, {
                method: "POST",
                body: userData
            });

            let date = new Date();
            date.setDate(date.getDate() + 3);
            if(requestEntrance.status === 401 || !requestEntrance.success){
                print_error_email_and_password();
                console.log("Error pasword or mail!");
                return;
            }

            if(requestEntrance.success){
                //Измемнение поведения файлов cookie про true ответе от сервера
                
                //document.cookie = `id=${requestEntrance.data.data.cookieUser}; path=/; expires=${date.toUTCString()}`;
                //console.log(`Cookie успешно созданы: ${document.cookie}`);
                
            }else{
                console.log('Ошибка в обработке ответа от сервера!');
                return;
            }
        }catch(jsonError){
            console.log(`Критическая ошибка: ${jsonError}`);
            return;
        }
    };
});