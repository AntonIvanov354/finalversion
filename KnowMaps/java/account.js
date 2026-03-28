const url = "http://127.0.0.1:8000/id"
document.addEventListener("DOMContentLoaded", async function(){

    const userEmail = () => {
        const cookieList = document.cookie.split("; ");
        const serchEmail = cookieList.find(cookieList => 
            cookieList.startsWith(`email_user=`)
            )  
        if(serchEmail){
            const finalListCookie = serchEmail.split("=")[1];
            return finalListCookie;
            }
        }

    //проверка cookie позьзователя
    const userJwtJoket = (userEmail) => {
        const cookieList = document.cookie.split("; ");
        const serchJwt = cookieList.find(cookieList =>
            cookieList.startsWith(`${userEmail}=`)
        );
        if(serchJwt){
            const finalJwt = serchJwt.split("=")[1]
            return finalJwt;
        }else{
            return ""
        }
    }
    if(userJwtJoket(userEmail()) !== ""){
        console.log("Вход разрещён")
    }else{
        window.location.href = "./etrance.html"
    }

    //вывод
    var emailUserInPage = document.getElementById("title_beggining_email");
    emailUserInPage.textContent = userEmail();
    
    //Работа с редакцией имени
    const serchUserName = () => {
        const listCookie = document.cookie.split("; ");
        const finalStep = listCookie.find(listCookie =>
            listCookie.startsWith("name_user=")
        );

        if(finalStep){
            const nameUser = finalStep.split("=")[1];
            return nameUser;
        }else{
            return "user1";
        }
    };
    const windowSettingbutton = document.getElementById("window_info_button_settings");
    const settingWindow = document.getElementById("seting_user_data");
    const windowLiftBig = document.getElementById("window_left_info_user");
    const optionWindowAccount = document.getElementById("window_options_button_settings");
    const oldUserName = document.getElementById("window_email");
    if(serchUserName == false){
        console.log("Сидим не рыпаемся)")
    }else{
        oldUserName.textContent = serchUserName();  
        console.log("A")
    }

    windowSettingbutton.addEventListener("click", function() {
        windowLiftBig.style.width = "500px";
        settingWindow.style.display = "block"
    });

    optionWindowAccount.addEventListener("click", async function() {
        const newUserName = document.getElementById("window_name_option").value;
        if(newUserName !== ""){
            oldUserName.textContent = newUserName;
            document.cookie = `user_name=${oldUserName}; max-age=-1`
            document.cookie =`name_user=${newUserName}`;
            document.getElementById("window_name_option").value = "";

            windowLiftBig.style.width = "250px";
            settingWindow.style.display = "none";
        }else{
            windowLiftBig.style.width = "250px";
            settingWindow.style.display = "none";
            return;
        }    
    });
});
