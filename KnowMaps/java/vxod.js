document.addEventListener("DOMContentLoaded",  async function() {

    const url = "http://127.0.0.1:8000/api/users"
    const printIdCooki = JSON.parse(localStorage.getItem("idcooki") || `{"id": null}`)

    const knopka_potverdit_vxod = document.getElementById("knopka_potverdit_vxod");
    const okno_vxoda_osnova = document.getElementById("okno_vxoda_osnova");
    const okno_vxod_osnova_2 = document.getElementById("okno_vxod_osnova_2");
    const nadpis_yspex2 = document.getElementById("nadpis_yspex");

    knopka_potverdit_vxod.addEventListener("click", async function() {
/*        okno_vxoda_osnova.classList.toggle("okno_vxoda_osnova_itog");
        okno_vxod_osnova_2.classList.toggle("okno_vxod_osnova_1")
        nadpis_yspex2.classList.toggle("nadpis_yspex2")*/

    async function LoginInformation(url, options = {}) {
        const defaulOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
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
            MergeOptions.body = JSON.stringify(options.body)
        }

        try{
            const response = await fetch(url, MergeOptions)

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
    }
    });
});