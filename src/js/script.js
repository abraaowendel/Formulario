const validator = {
    handleSubmit: (event) =>{
        event.preventDefault();
        let send = true;
        const inputs = document.querySelectorAll('input');
        validator.clearErrors();
        inputs.forEach((item) =>{
            let check = validator.checkInput(item);
            if(check !== true){
                send = false;
                validator.showError(item,check);
            }
        })
        if(send){
            form.submit();
        }
    }, 
    checkInput: (input) =>{
        let rules = input.getAttribute('data-rules'); //PEGA ATRIBUTO DO INPUT
        if(rules != null){ 
            rules = rules.split('|') // SEPARA CONTEUDO DO ATRIBUTO CASO AJA
            for(let k in rules){
                let details = rules[k].split('=') // SEPARA TIPO DA CONDIÇAO E A CONDIÇAO
                switch(details[0]){
                    case 'required':
                        if(input.value === ''){
                            return 'Campo não pode ser vazio.'
                        }
                        break
                    case 'min':
                        if(input.value.length < 8){
                            return 'Senha deve ter mais de 8 caracteres'
                        }
                        break
                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return "E-mail não é válido.";
                            }
                        }
                        break
                }
            }
        };
       return true
    },
    showError: (input,error) =>{
        input.style.borderColor = '#FF0000';
        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement,input.ElementSibling)
    },
    clearErrors: () =>{
        let inputs = form.querySelectorAll('input');
        inputs.forEach((inputItem) => inputItem.style.borderColor = '#008000')
        let errorElements = document.querySelectorAll('.error')
        errorElements.forEach((erroItem) => erroItem.remove())
    }
};

let form = document.querySelector('.box')

form.addEventListener('submit', validator.handleSubmit)