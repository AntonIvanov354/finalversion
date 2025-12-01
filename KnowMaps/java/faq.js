/*document.querySelectorAll('.vopros_1, .vopros_2, .vopros_3, .vopros_4, .vopros_5').forEach((vopros, index) => {
    vopros.addEventListener("mouseenter", () => {
        document.querySelector(`.otvet_${index + 1}`).classList.add("otvet_podsvetka");

    });
    vopros.addEventListener("mouseleave", () => {
        document.querySelector(`.otvet_${index + 1}`).classList.remove("otvet_podsvetka");

    });
});GTP ДАУН*/

document.addEventListener("DOMContentLoaded", function(){

    /*Потом все сделаю норм, ну эт тип классы, которые я буду заменять*/
    const otvet_1 = document.getElementById("otvet_1");
    const otvet_2 = document.getElementById("otvet_2");
    const otvet_3 = document.getElementById("otvet_3");
    const otvet_4 = document.getElementById("otvet_4");
    const otvet_5 = document.getElementById("otvet_5");
    /*Ну туту ниже будет на какой я класс буду заменять*/
    /*const otvet_1_zamena = document.getElementById("otvet_1_zamena");
    const otvet_2_zamena = document.getElementById("otvet_2_zamena");
    const otvet_3_zamena = document.getElementById("otvet_3_zamena");
    const otvet_4_zamena = document.getElementById("otvet_4_zamena");
    const otvet_5_zamena = document.getElementById("otvet_5_zamena");
    Она не пригодилась(*/
    /*При наведение на какие классы будет происхоидить МЭДЖИК */
    const vopros_1 = document.getElementById("vopros_1");
    const vopros_2 = document.getElementById("vopros_2");
    const vopros_3 = document.getElementById("vopros_3");
    const vopros_4 = document.getElementById("vopros_4");
    const vopros_5 = document.getElementById("vopros_5");
    /*Дальше будет просто пиздец, который я не хочу объеснять*/
    vopros_1.addEventListener("mouseover", function(){
        otvet_1.classList.add("otvet_1_zamena")
    });
    vopros_1.addEventListener("mouseleave", function(){
        otvet_1.classList.remove("otvet_1_zamena")
    });
    vopros_2.addEventListener("mouseover", function(){
        otvet_2.classList.add("otvet_2_zamena")
    });
    vopros_2.addEventListener("mouseleave", function(){
        otvet_2.classList.remove("otvet_2_zamena")  
    });
    vopros_3.addEventListener("mouseleave", function(){
        otvet_3.classList.remove("otvet_3_zamena")  
    });
    vopros_3.addEventListener("mouseover", function(){
        otvet_3.classList.add("otvet_3_zamena")
    });
    vopros_4.addEventListener("mouseleave", function(){
        otvet_4.classList.remove("otvet_4_zamena")  
    });
    vopros_4.addEventListener("mouseover", function(){
        otvet_4.classList.add("otvet_4_zamena")
    });
    vopros_5.addEventListener("mouseleave", function(){
        otvet_5.classList.remove("otvet_5_zamena")  
    });
    vopros_5.addEventListener("mouseover", function(){
        otvet_5.classList.add("otvet_5_zamena")
    });


    /*Опять я тут, ну поехали. Классы, к которым нужно будет добавить класс */
    const sam_text_faq_1 =document.getElementById("sam_text_faq_1");
    const sam_text_faq_2 =document.getElementById("sam_text_faq_2");
    const sam_text_faq_3 =document.getElementById("sam_text_faq_3");
    const sam_text_faq_4 =document.getElementById("sam_text_faq_4");
    const sam_text_faq_5 =document.getElementById("sam_text_faq_5");

    vopros_1.addEventListener("click", function(){
        sam_text_faq_1.classList.toggle("sam_text_faq_1_see");
    })
        vopros_2.addEventListener("click", function(){
        sam_text_faq_2.classList.toggle("sam_text_faq_1_see");
    })
        vopros_3.addEventListener("click", function(){
        sam_text_faq_3.classList.toggle("sam_text_faq_1_see");
    })
        vopros_4.addEventListener("click", function(){
        sam_text_faq_4.classList.toggle("sam_text_faq_1_see");
    })
        vopros_5.addEventListener("click", function(){
        sam_text_faq_5.classList.toggle("sam_text_faq_1_see");
    })
    
});