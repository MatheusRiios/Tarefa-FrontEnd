const nome = document.getElementById('nome').value;

const btnEnviar = document.getElementById('btn-enviar');

btnEnviar.addEventListener('click', async (event) => {
    event.preventDefault();

    const objDadosPessoas = {
        nome
    }

    const resReq = await fetch('localhost:3000/create/pessoa', { method: 'POST', body: JSON.stringify(objDadosPessoas) } );
    
    if(resReq.status === 200)
        return alert('foi cadastrado')    

})