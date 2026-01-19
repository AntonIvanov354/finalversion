document.addEventListener("DOMContentLoaded",  async function() {

    const url = "http://127.0.0.1:8000/entrance"
    //const printIdCooki = JSON.parse(localStorage.getItem("idcooki") || `{"id": null}`)

    const knopka_potverdit_vxod = document.getElementById("knopka_potverdit_vxod");
    const okno_vxoda_osnova = document.getElementById("okno_vxoda_osnova");
    const okno_vxod_osnova_2 = document.getElementById("okno_vxod_osnova_2");
    const nadpis_yspex2 = document.getElementById("nadpis_yspex");

    //Универсальный(наверное) код на отправку данных и получения cookie пользователя
    const cookieCheck = async (url, options = {}) => {
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
            }
        try{
            const response = await fetch(url, mergeOptionsst);
            if(!response.ok){
                throw new Error(`Запрос на проверку cooki не удался, сервер не отвечает: ${response.status}!`);
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
                        console.log(`Здравствуйте, ${UserData.email}`)
                    }else{
                        console.log(`просьба зарегаться! ${result.data.data.message}.! ${result.data.data.userDate}`)
                    }
                }
            }catch(jsonErrorError){
            }
        }catch(jsonError){
            console.log(jsonError)
            
        }
    })
                  /*if(result.answer === UserData){
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
            }*/;
        /*
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
          //  }
            //else if(printIdCooki !== result.data.user.cooki){

             //   localStorage.setItem("idcooki", JSON.stringify({
               //     id: result.data.user.id
               // }))

               // alert("данные все равно обновил"+ result.message)
          //  }
        } else{
            alert("Ошибка создания: ", result .error)
        } 
    } catch (error) {
        alert("Ошибка выполнения: ", error)
    }*/
    });
