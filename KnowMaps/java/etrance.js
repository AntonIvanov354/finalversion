// Ждем, пока весь HTML-документ будет загружен и разобран
document.addEventListener("DOMContentLoaded", async function() {
    //Все необходимые элементы/переменные/функции

    //Ошибка в почте
    const print_error_email_and_password = () => {
        const id_window_error_email = document.getElementById("title_error_email");
        const id_window_error_password = document.getElementById("title_error_password");
        id_window_error_email.style.display = "block";
        id_window_error_password.style.display = "block";
    };

    //все необходимые переменные
    const url = "http://127.0.0.1:8000/users/login";
    const registerButton = document.getElementById("buttonEntrance");

    //Отправка данных на сайт
    registerButton.addEventListener("click", async function() {
            // Получаем все необходимые элементы из DOM по их ID
            const window_email_data = document.getElementById("window_email_data").value;
            const window_password_data = document.getElementById("window_password_data").value;

            //Проверка на пустые строки
            if(!window_email_data || !window_password_data){
                print_error_email_and_password();
                return
            };

            // Отправка данных на сервер
            await requestEntranceServer(window_email_data, window_password_data);
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
                const response = await fetch(url, mergeOptionst);

                    if(!response.ok){
                        const data_error = await response.json();
                        return {success: false, data: data_error, status: response.status}
                    }

                    try{
                        const data = await response.json()
                        return {success: true, data, status: response.status}

                    }catch(jsonError){
                        const text = await response.text()
                        return {success: true, data: text, status: response.status}
                    }
                }
            //}
            catch(e){
                return {
                    success: false,
                    data: e,
                    status: 0
                }
            }
        }
    const requestEntranceServer = async (email, password) =>{   
    
        //Создание спика для отправки на сервер
        const userData = {
            email: email,
            password: password,
        };

        //Запрос на сервер
        try{
            const requestEntrance = await makeRequest(url, {
                method: "POST",
                body: userData
            });
            // Если пароль не подходит или почта, выкидываем ошибку.
            if(requestEntrance.success){                
                    // jwt.token: requestEntrance.data.access_token

                    //создание cookie 
                    document.cookie = `jwt_token=${requestEntrance.data.access_token}; max-age=172800; samesite=strict; path=/`;
                    document.location.href = "./account.html"
                    console.log(document.cookie);
            }else{
                if(requestEntrance.status == 401){
                    print_error_email_and_password();
                    console.log(`Error password or mail! ${requestEntrance.status}`);
                }
                throw new Error(`Ошибка в ответе сервера: ${requestEntrance.status}`)
            }
            
        }catch(jsonError){
            console.log(`Критическая ошибка: ${jsonError}`);
            print_error_email_and_password();
            return;
        };
    };
    
});