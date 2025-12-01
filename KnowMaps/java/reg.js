/*document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("button").addEventListener("click", function() {

        const reg_email = document.getElementById("input-okno-email-rreg").value;
        const reg_password = document.getElementById("input-okno-pasword-rreg").value;
        const reg_name = document.getElementById("input-okno-name-rreg").value;
        const reg_password2 = document.getElementById("input-okno-pasword2-rreg").value;

        const reg_error_email = document.getElementById("okno-email-rreg-error");
        const reg_error_password = document.getElementById("okno-pasword-rreg-error");
        const reg_error_name = document.getElementById("okno-name-rreg-error");
        const reg_error_password2 = document.getElementById("okno-pasword2-rreg-error");

        reg_error_email.style.display = "none";
        reg_error_password.style.display = "none";
        reg_error_password2.style.display = "none";
        reg_error_name.style.display = "none";

        let valid = true;

        if (!reg_email.includes("@")) {
            reg_error_email.style.display = "block";
            valid = false;
        }

        if (reg_password2 !== reg_password || reg_password.length < 8) {
            reg_error_password.style.display = "block";
            reg_error_password2.style.display = "block";
            valid = false;
        }

        if (reg_name.length < 8) {
            reg_error_name.style.display = "block";
            valid = false;
        }

        if (valid) {
            console.log("почта: "+reg_email);
            console.log( "пароль: "+reg_password);
            console.log("name: "+reg_name);
            // Получение IP-адреса
            fetch("https://api.ipify.org?format=json")
                .then(response => response.json())
                .then(data => {
                    console.log(data.ip);   
                })
                .catch(error => {
                    console.log("Ошибка: ", error);
                    console.log("Не удалось получить IP-адрес.");
                });
        }
    });
});
// Ждем, пока весь HTML-документ будет загружен и разобран*/
document.addEventListener("DOMContentLoaded", async function() {
    // Получаем элементы из DOM по их ID
    const button = document.getElementById("button"); // Кнопка для переключения
    const okno_reg_2 = document.getElementById("okno_reg_2"); // Второе окно регистрации
    const okno_reg_3 = document.getElementById("okno_reg"); // Первое окно регистрации
    const itog_reg_div2 = document.getElementById("itog_reg_div"); // Итоговое окно регистрации

    // Добавляем обработчик события на кнопку
    button.addEventListener("click", async function() {
          // Переключаем класс для второго окна регистрации
            okno_reg_2.classList.toggle("okno_reg_3");
            // Переключаем класс для итогового окна регистрации
            itog_reg_div2.classList.toggle("itog_reg_div2");
            // Переключаем класс для первого окна регистрации
            okno_reg_3.classList.toggle("okno_reg_itog");
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
                    return {success: true, daata: text, status: response.status}
                }

            } catch(error){
                return {
                    success: false,
                    error: error.message,
                    status: error.status || 0
                }
            }
        }
        
        const windowRegEmail = document.getElementById("window_email_reg").value
        const windowRegPassword =  document.getElementById("window_password_reg").value
        const windowRegPasswordCheck =  document.getElementById("window_user_password_replay_reg").value


        const newuser = {
            email: windowRegEmail ,
            password: windowRegPassword ,
            password_check: windowRegPasswordCheck
        }
        if(windowRegPassword != windowRegPasswordCheck){
            alert("Пароли не совпадают")
            return;
        }
        if (!windowRegEmail || !windowRegPassword || !windowRegPasswordCheck){
            alert("Ошибка, заполнены не все поля!")
        }
        try{
            //обозначить потом url
            const result = await makeRequest(url, {
                method: "POST",
                body: newuser
            })
            if(result.success){

                alert(result.data.message)

                if(result.data.user){
                    alert(`Пользователь ${result.data.user.name} ${result.data.user.email}`)
                }
                if(result.data.user.cooki !== null){

                    localStorage.setItem("idcooki", JSON.stringify({
                        id: result.data.user.cooki
                }))

                const printCooki = await JSON.parse(localStorage.getItem("idcooki") || '{"id": null}');
                alert("Айди cooki"+ result.data.user.name + ": " + printCooki.id)
                window.PrintIdglobal = printCooki.id

            }else{
                alert("Ошибка, Сервер не вернул id cooki!")
                return;
            }
                okno_reg_2.classList.toggle("okno_reg_3");
                itog_reg_div2.classList.toggle("itog_reg_div2");
                okno_reg_3.classList.toggle("okno_reg_itog");
            }else{
                alert(result.error)
            }
        } catch(error) {
            console.log("Ошибка: ", error)
            alert("Ошибка: " + error.message)
        }
    })

        const UserPassword = await document.getElementById("window_password_reg").value
        const UserPasswordReplay = await document.getElementById("window_user_password_replay_reg").value
        const UserEmail = await document.getElementById("window_email_reg").value
        if(UserPassword == UserPasswordReplay){
            const NewUser = {
                password: UserPassword,
                replaypassword: UserPasswordReplay,
                email: UserEmail
            }
            try{
                const CreatNewUser = await makeRequest("https://127.0.0.1:8000/CreateUser", {
                    method: "POST",
                    body: NewUser
                })
                if(CreatNewUser.success){
                    okno_reg_2.classList.toggle("okno_reg_3");
                    // Переключаем класс для итогового окна регистрации
                    itog_reg_div2.classList.toggle("itog_reg_div2");
                    // Переключаем класс для первого окна регистрации
                    okno_reg_3.classList.toggle("okno_reg_itog");
                }
                else{
                    alert("Ошибка Создания: ", CreatNewUser.error)
                } }
            catch (error) {
                alert("Ошибка выполнения: ", error)
            }      
        }
        else{
            alert(`Error: Password ≠ Password replay`)
        }