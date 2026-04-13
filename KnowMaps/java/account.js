
document.addEventListener("DOMContentLoaded", async function(){
    //Добавление нужных элементов/переменных/функиций
    
    //Все необохидые элементы
    const windowSettingbutton = document.getElementById("window_info_button_settings");
    const settingWindow = document.getElementById("seting_user_data");
    const windowLiftBig = document.getElementById("window_left_info_user");
    const optionWindowAccount = document.getElementById("window_options_button_settings");
    const oldUserName = document.getElementById("window_name");

    //Проверка, что все элементы считались удачно
    if(!windowSettingbutton || !settingWindow || !windowLiftBig || !optionWindowAccount || !oldUserName){
        console.error("Один из элементов являеться пустым!")
        return;
    };
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
            return "User1";
        }
    };


    //проверка cookie позьзователя
    const userJwt = () => {
        try{
            const cookieList = document.cookie.split("; ");
            const serchJwt = cookieList.find(cookieList =>
                cookieList.startsWith(`jwt_token=`)
            );
            
            if(serchJwt){
                const finalJwt = serchJwt.split("=")[1]
                return {success: true, data:finalJwt}
            }else{
                return {success: false, data: "У данного пользователя нет cookie "}
            };
            
        }catch(error){
            return{
                success:false,
                data: error
            }
        };
    };

    //Проверка, можно ли пустить пользователя на данную страничку
    const result_cookie =  userJwt();
    if(!result_cookie.success){
        window.location.href = "./etrance.html";
        alert(result_cookie.data)
        return;
    }

    //Добавление имени на сайт
    oldUserName.textContent = serchUserName();
    
    //Функция открытия меню настроек
    windowSettingbutton.addEventListener("click", function() {
        windowLiftBig.style.width = "500px";
        settingWindow.style.display = "block"
    });

    //Функция смены имени
    optionWindowAccount.addEventListener("click", async function() {
        const newUserName = document.getElementById("window_name_option").value;
        if(newUserName !== ""){
            oldUserName.textContent = newUserName;
            document.cookie =`name_user=${newUserName}`;
            document.getElementById("window_name_option").value = "";
        };

        windowLiftBig.style.width = "250px";
        settingWindow.style.display = "none";
    });
});
