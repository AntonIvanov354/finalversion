const validatePassword = (password) => {
    // Только английские буквы и цифры
    if(!/^[A-Za-z0-9]+$/.test(password)){
        throw new Error("Пароль должен содержать только английские буквы и цифры, бля!");
    }
    
    // Минимум 8 символов
    if(password.length < 8){
        throw new Error("Пароль должен быть минимум 8 символов, ебать!");
    }
    
    // Хотя бы одна буква
    if(!/[A-Za-z]/.test(password)){
        throw new Error("Пароль должен содержать хотя бы одну букву!");
    }
    
    // Хотя бы одна цифра
    if(!/[0-9]/.test(password)){
        throw new Error("Пароль должен содержать хотя бы одну цифру!");
    }
    
    return true;
};
console.log(validatePassword("fklsjsjkfdhа"))