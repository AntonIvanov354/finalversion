const url = "http://127.0.0.1:8000/id"
document.addEventListener("DOMContentLoaded", async function(){

    const title_final =  document.getElementById("title_final");
    //const buttonRegister = document.getElementById("button_register");
    //const avatar = document.getElementById("avatar_profil");

   //const printIdCooki = JSON.parse(localStorage.getItem("idcooki") || '{"id": null}');
    //alert("1 "+ printIdCooki.id); // покажет null, но не сломается
    //localStorage.setItem("idcooki", JSON.stringify({
     //   id: "ggwpzizkatka" 
    //}))

   // if(printIdCooki.id !== printIdCooki.id){
   //     alert("error")
//
   // }if(printIdCooki.id == printIdCooki.id){
   //     console.log("sdasd ",printIdCooki.id)
   // }
    async function checkUserInDataBase(url, options = {}) {
        const defaulOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        };

        const MergeOptions = {
            ...defaulOptions,
            ...options,
            headers: {
                ...defaulOptions.headers,
                ...options.headers
            },
        };

        if(options.body && typeof options.body == `object`){
            MergeOptions.body = JSON.stringify(options.body);
        }

        try{
            const response = await fetch(url, MergeOptions);

            if(!response.ok){
                throw new Error(`HTTP ${response.status} ${response.statusText}`);
            };
            try{
                const data = await response.json();

                return {success: true, data, status: response.status};
            } catch(jsonError) {
                const text = await response.json();
                return {success: true, data: text, status: response.status};
            };
        }
        catch(error){
            return{
                success: false,
                error: error.message,
                status: error.status || 0
            };
        };
    }
    //const dataBase = {
    //    users: [
    //        {id: "42", name: "abama1"},
    //        {id: "52", name: "abama2"},
    //        {id: "322", name: "abama3"},
    //        {id: "1488", name: "abama4"},
    //    ]
    //};
    //const test = '322'
    //document.cookie = `id=${42}; username=abama`;
        let cookieUser = document.cookie;
       // let date = new Date();
       if(!cookieUser){
        window.location.reload('http://127.0.0.1:5500/KnowMaps/reg.html')
       }
        try{
            console.log(cookieUser)
            const result = await checkUserInDataBase(url, {
                method: "POST",
                body: document.cookie//body тут нужно, я же не хочy перебирать и паринимать на сайт все cookie с bd.
            });
            if(result.success){
                 //date.setDate(date.getDate() + result.data.timecookie)
                 //document.cookie = `iduser=${result.data.cookie}; username=${result.data.username};` //expires=${date.toUTCString()}; path=/`
                console.log(`Здравствуйте, ${result.data.data.username}`) 
                title_final.style.display = 'block';
                //window.location.replace("http://127.0.0.1:5500/KnowMaps/glav.html")
            }else{
                console.log(`Ошибка в создании cookie: ${result.error}`)
            }
        }catch(jsonError){
            console.log(`Критическая ошибка на сервере ${jsonError}`);
        }
//ВАЖНО!!!
    //const userChekFinal = dataBase.users.find(u => u.id === test)
    //if(userChekFinal){
    //    console.log(`Привет, ${userChekFinal.name}`);
    //    title_final.style.display = 'block';
    //   // setTimeout(()=>{
    //   //     window.location.replace("http://127.0.0.1:5500/KnowMaps/glav.html");
    //   // }, 10000);
    //    
    //}else{
    //    console.log('Гуляй')
    //    window.location.replace("http://127.0.0.1:5500/KnowMaps/glav.html");
    //}

/*    const data = {
        id: printIdCooki.id
        
    }

    try{
        const result = await makeRequest(url, {
            method: "POST",
            body: data
        })
        
        if(result.success){
            if(result.data.user.id === printIdCooki.id){
                if (avatar) {
                    avatar.style.opacity = "0";
                } else {
                    console.error("Элемент 'avatar' не найден");
                }
            }
            else{
                localStorage.setItem("idcooli", JSON.stringify({
                    id: result.data.user.id
                }))
                KnowMap1.style.opacity = "1";
                KnowMap2.style.opacity = "1";
                alert("ОШИБКА COOKI НЕ СХОДЯТСЯ! ")
            }
        }else{
            alert("ОШИБКА: "+ result.error)
        }
    }catch(error){
        console.log("ОШИБКА: ", error)
        alert("ОШИБКА: " + error.message)
    }*/
});
