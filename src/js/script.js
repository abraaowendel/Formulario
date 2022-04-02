const validator = {
    handleSubmit: (event) =>{
        event.preventDefault();
        let send = true;
        const inputs = document.querySelectorAll('input');
        inputs.forEach((item) =>{
            let check = validator.checkInput(item);
            if(check !== true){
                send = false;
                alert(check)
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
                }
            }
        };

       return true
    }  
};

let form = document.querySelector('.box')

form.addEventListener('submit', validator.handleSubmit)