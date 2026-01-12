/**document.getElementById("vibor-faila").addEventListener("click", function(){

    document.getElementById("vibor-file").click();
});
document.getElementById("vibor-file").addEventListener("change", function(){
    const fileName = this.files[0] ? this.files[0].name : 'Вы не выбрали файл';
    alert('Выбранный файл: ' + fileName);*/

document.addEventListener("DOMContentLoaded", async function(){
    //проверка работы сервера
    const urlChekServer = "http://127.0.0.1:8000/checkserver";
    //загрузка файла
    const urlLoadingFile = "http://127.0.0.1:8000/uploadfile";
    const functionCheckServer = async (urlChekServer) => 
    {
        try
            {
                const checkServer = await fetch(urlChekServer, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                        }
                });
                if(!checkServer.ok){
                    throw new Error (`Ошибка! Сервер не доступен для запросов! ${checkServer.status}, ${checkServer.statusText}`);
                }else{
                    try{
                        let result = await checkServer.json();
                        console.log(`Сервер готов к работае: ${result.message}`);
                        return result.message;
                    }catch(jsonError){
                        throw new Error (`Ошибка в обработке ответа сервера! ${jsonError}`);
                    }
                }
                
            }
        catch(error){
            throw new Error (`Ошибка! ${error}`);
        }
    } 
    document.getElementById("fileOutput").addEventListener("click", function(){
        //eventOne.preventDefault();
        document.getElementById("fileSelection").click();
    });
    document.getElementById("fileSelection").addEventListener("change", async function(eventTwo){
        //Считывание файла
        const TheFileItself = document.getElementById("fileSelection")
        const File = TheFileItself.files[0];
        const namefile = this.files[0]

        if(!File){
            alert ("Вы не выбрали файл!");
            return;
        } 
        //обработка файла
        const formData = new FormData();

        formData.append("file", File);
        formData.append("description", `Загрузочный файл`);
        formData.append("Category", "audio");

        if(formData){
            const finalStepCheck = await(functionCheckServer(urlChekServer));

            if(finalStepCheck === 'True') 
            {
                console.log(`Файл успешно загружен в FromData: ${namefile}`);

                try{

                    console.log('Начинаю отправку файла на сервер!'); 

                    const response = await fetch(urlLoadingFile, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    },
                    });
                    if(response.ok){
                        // Сетевой запрос с обработкой ответа
                        const result = await response.json();

                        console.log(`Сервер дал успешный ответ: ${result.message}`);


                        let contentfile = result.textFile
                        
                        //Вывод на страницу текста из файла
                        console.log(`Содержимое файла: ${contentfile}`)
                        const file_content =  document.createElement("a");
                        file_content.textContent = contentfile;

                        file_content.classList.add("text_file");
                        
                        text_opisanie.innerHTML = '';
                        text_file.appendChild(file_content);

                        text_opisanie.style.display = "none";
                        text_file.style.display = "block";      
                        
                    }else{
                        const result = await response.json();
                        console.error(`Ошибка конвертации: ${result.status} || ${result.message}`);
                    // window.location.reload();
                        
                        }
                    } catch(jsonError){
                    console.error(`Ошибка в сетевом запросе: ${jsonError}`);
                    // window.location.reload();
                    }
            }else{
                alert(`На данный момент сервер недоступен, попробуйте позже!`)
            }
        }else if(!formData){
            console.error(`Ошибка в загрузке файла! ${formData}`);
            // window.location.reload();
            return
        };
    });
});