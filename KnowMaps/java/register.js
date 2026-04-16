document.addEventListener("DOMContentLoaded",  async function() {
    
    //Все необходимые элементы/переменные/функции

    //Все необходимые функции

    //Все необходимые переменные
    const url = "http://127.0.0.1:8000/users/"
    //Все необходимые элементы
    const buttonRegister = document.getElementById("button_register");

    //Отправка данных на сервер
    buttonRegister.addEventListener("click", async function(){
        try{ 
                //Считыеваем все необходимые данны с страницы
                const password =  document.getElementById("input_password_register").value;
                const password_Replay =  document.getElementById("input_replay_password_register").value;
                const mail = document.getElementById("input_email_register").value

                //Проверка, что окна не пустые или соотвествуют стандарту
                if((password !== password_Replay) && !password || !password){
                    console.error(`Password one ≠ password two!`)
                    return;
                };
                if(!/^[A-Za-z0-9]+$/.test(password)){
                    console.error("Пароль содержит невалидирумые символы!");
                    return;
                }
                if(!mail || !mail.includes("@") || !mail.includes(".")){
                    console.error(`The mail does not meet the standard!`)
                    return;
                }
                if(mail.length < 8){
                    console.error("Пароль должен быть больше 8 символов!")
                    return;
                }
                
                console.log(mail, password)
                await server_response(mail ,password);

        }catch(error){
            console.error(error)
        };
    });

    //Функция запроса
    const request_form = async (url, options = {}) => {
        const defaultOptionss = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
        };  
        const mergeOptionsst = {
            ...defaultOptionss,
            ...options, 
            headers: {
                ...defaultOptionss.headers,
                ...options.headers
            },
        };
            if(options.body && typeof options.body == `object`){
                mergeOptionsst.body = JSON.stringify(options.body)
            };

        try{
            const response = await fetch(url, mergeOptionsst);
            if(response.status === 422){
                try{
                    const data = await response.json();
                    return {success: false, data, status: response.status}
                }catch(jsonError){
                    const text = await response.text();
                    return {success: false, data: text, status: response.status}
                }
            };

            if(!response.ok){
                throw new Error(`Сервер не отвечает: ${response.status}!`);
            }
            try{
                const data = await response.json();
                return {success: true, data, status: response.status};

            }catch(jsonError){
                const text = await response.text()
                return{success:true, data: text, status: response.status};
            }
        }catch(error){
            return{
                success: false,
                error: error.message,
                status: error.status || 0
                }
            }; 
        };
    
    const server_response = async(email, password) => {

        //Создание спика для отправки на сервер
        const User_data = {
            user_email: email,
            user_password: password
        };
        
        console.log(User_data)
        try{
            const request = await request_form(url, {
                method: "POST",
                body: User_data
            });
            if(request.success){
                console.log(request.data)
            }else{
                console.log(request.data)
            }

        }catch(jsonError){
            console.error(jsonError)
        };
    };

});
/*   const url = "http://127.0.0.1:8000/entrance"
    //const printIdCooki = JSON.parse(localStorage.getItem("idcooki") || `{"id": null}`)

    const knopka_potverdit_vxod = document.getElementById("knopka_potverdit_vxod");
    const okno_vxoda_osnova = document.getElementById("okno_vxoda_osnova");
    const okno_vxod_osnova_2 = document.getElementById("okno_vxod_osnova_2");
    const nadpis_yspex2 = document.getElementById("nadpis_yspex");

    //Универсальный(наверное) код на отправку данных и получения cookie пользователя

    knopka_potverdit_vxod.addEventListener("click", async function() {

    //Сама отправка и получение файлов cookie
    
        const userEmail = await document.getElementById("window_title_email").value;
        const userPassword = await document.getElementById("window_title_password").value;

        if(!userEmail || !userPassword){
            alert("Заполните все поля!");
            return;}
        try{
            const UserData = {
                email: userEmail,
                password: userPassword
            };
            const result = await cookieCheck(url, {
              method: "POST",
              body: UserData
          });
          try{
              if(result.success){
                    if(result.success){
                        console.log(`Здравствуйте, ${UserData.email}!!`)
                        okno_vxoda_osnova.classList.toggle("okno_vxoda_osnova_itog");
                        okno_vxod_osnova_2.classList.toggle("okno_vxod_osnova_1")
                        nadpis_yspex2.classList.toggle("nadpis_yspex2")
                    }else{
                        console.log(`Ошибка!`)
                    }
                }
            }catch(jsonError){
                console.log(`${jsonError}, ошибка!`)
            }
        }catch(jsonError){
            console.log(`Ошибка: ${jsonError}!`)
            
        }
    })
                  if(result.answer === UserData){
                        let data = new Date();
                        data.setDate(data.getDate() + 3);
                        document.cookie = `id=6739; useremail=${encodeURIComponent(userEmail)}; expires=${data.toUTCString()}; path=/;`;
                        console.log(document.cookie);
                   }else{
                       alert("Пароль или почта неверны!");
                   }
                }   
            }catch(error){
                alert(`Произошла критическая ошибка: ${error}`)
                return;
            };
        
    async function LoginInformation(url, optionss = {}) {
        const defaulOptionss = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
        };
        const MergeOptionss = {
            ...defaulOptionss,
            ...optionss,
            headers: {
                ...defaulOptionss.headers,
                ...optionss.headers
            },
        };  
        if(optionss.body && typeof optionss.body == `object`){
            MergeOptionss.body = JSON.stringify(optionss.body)
        }

        try{
            const response = await fetch(url, MergeOptionss)

            if(!response.ok){
                throw new Error (`HTTP ${response.status} ${response.statusText}`) 
            }
            try{
                const data = await response.json()
                return {success: true, data, status: response.status}
            } catch(jsonError){
                const text = await response.text()
                return {success: true, data: text, status: response.status}
            }
        }
        catch(error){
            return{
                success: false,
                error: error.message,
                status: error.status || 0
            }
        }
    }
    const Password_hash= await document.getElementById("window_password").value
    const UserEmail = await document.getElementById("window_email").value

    const LoginUser = {
        password: Password_hash,
        email: UserEmail
    }

    try{
            alert("Ошибка создания: ", result .error)
        } 
    } catch (error) {
        alert("Ошибка выполнения: ", error)
    }
        const result  = await LoginInformation(url, {
            method: "POST",
            body: LoginUser
        })

        if(result.success){

            localStorage.setItem("idcooki", JSON.stringify({
                id: result.data.user.cooki
            }))
            alert("обновил данные: "+ result.data.message)
            alert(printIdCooki.id)

            okno_vxoda_osnova.classList.toggle("okno_vxoda_osnova_itog");
            okno_vxod_osnova_2.classList.toggle("okno_vxod_osnova_1")
            nadpis_yspex2.classList.toggle("nadpis_yspex2")
            }
            else if(printIdCooki !== result.data.user.cooki){

               localStorage.setItem("idcooki", JSON.stringify({
                    id: result.data.user.id
                }))

                alert("данные все равно обновил"+ result.message)
            }
        } else{
            alert("Ошибка создания: ", result .error)
        } 
    } catch (error) {
        alert("Ошибка выполнения: ", error)
    }*/