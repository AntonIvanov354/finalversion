/**document.getElementById("vibor-faila").addEventListener("click", function(){

    document.getElementById("vibor-file").click();
});
document.getElementById("vibor-file").addEventListener("change", function(){
    const fileName = this.files[0] ? this.files[0].name : 'Вы не выбрали файл';
    alert('Выбранный файл: ' + fileName);*/

document.addEventListener("DOMContentLoaded", async function(){

url = "http://127.0.0.1:8000/abama";
let Idfile = 1;
const text_opisanie =  document.getElementById("text_opisanie");
const text_file = document.getElementById("text_file")

document.getElementById("fileOutput").addEventListener("click", function(){

    document.getElementById("fileSelection").click();
});
document.getElementById("fileSelection").addEventListener("change", async function(){
    const TheFileItself = document.getElementById("fileSelection")
    const File = TheFileItself.files[0]
    const namefile = this.files[0].name

    if(!File){
        alert ("Вы не выбрали файл!");
        return;
    } 
    Idfile += 1

    const formData = new FormData();

    formData.append("file", File);
    formData.append("description", `Загрузочный файл номер: ${Idfile}`);
    formData.append("Category", "audio");

    const text_file = document.getElementById("text_file");
    try{
        const response = await fetch(url, {
        method: "POST",
        body: formData

        });
        if(response.ok){
        const result = await response.json();
        console.log("ответ сервера: ", result )

        let DataBaseFile = {
        id: Idfile, 
        namefile: result.data.namefile, 
        contentfile: result.data.contentfile
        };


        const file_content =  document.createElement("pre");
        file_content.textContent = DataBaseFile.contentfile;

        file_content.classList.add("text_file");
        
        text_opisanie.innerHTML = '';
        text_file.appendChild(file_content);

        text_opisanie.style.display = "none";
        text_file.style.display = "block";     

        }else{
        const result = await response.json();
        alert(`Ошибка конвертации: ${result.status} || ${errorResult.status}`);
        
        }
    } catch(error){
        alert("Ошибка в выводе текста на сайт!")
    }  
//Нужно создавать функицю
   /** const result = await MakeRequest(url, options = {
        method: "POST", 
        body: formData
    }); */
    //async function SendingFile(url, options) {
        //const defaultOptions = await fetch (url, {
          //  method: "POST",
            //body: FileSending
       // })
    //}

   // try{
     //   const OtvetServer = SendingFile{url, options{

       // }} 
    /** Крч код правильный 50 на 50, но и одновремено не правильный вообще. крч иди нахуй сиди думай
       // const itog = await SendingAFile(url)
        alert("A")
        //if(itog.success){
        const ListContainer = document.getElementById("file_link")

        DataBaseFile.forEache(DataBaseFile => {
            const FileList = document.createElement("a");

            FileList.href = `glav/${DataBaseFile.id}`;

            FileList.textContent = `Перейти к айдио файлу: ${DataBaseFile.namefile}`;

            const fileItem = document.createElement("div");
            fileItem.className = `file-item`;

            fileItem.append(FileList);
            ListContainer.appendChild(fileItem)

        }) 
        //}
    
    catch(error){
        alert("ошибка")
    } */
    /**else{
        const response = await SendingTheFileToTheServer(url)
        обязательно сделать проверка ответа сервера, не буду пихать это 
         * в функицю т.к. не рационально нагружать её, проще пихнуть её сюда, 
         * сделать все в одном месте 
        if(response.success){
            Добавить переход нв другую страницу, завтра буду делать. 
        }else{
            Вывод окна ошибки, обязательно 
        }
    }
 *///}
    });
});