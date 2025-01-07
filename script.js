document.addEventListener("DOMContentLoaded", function () {
    const inputTarefa = document.getElementById('novaTarefa');
    const btnAdicionar = document.getElementById('adicionarBtn');
    const listaTarefas = document.getElementById('listaTarefas');

    // Carregar tarefas do localStorage ao iniciar
    carregarTarefas();

    // Função para adicionar nova tarefa
    btnAdicionar.addEventListener('click', function () {
        const tarefaTexto = inputTarefa.value.trim();
        if (tarefaTexto) {
            adicionarTarefa(tarefaTexto);
            inputTarefa.value = ''; // Limpar o campo de entrada
        }
    });

    // Função para adicionar tarefa
    function adicionarTarefa(texto) {
        const tarefa = {
            texto: texto,
            concluida: false
        };

        // Criar o elemento <li> para a tarefa
        const li = document.createElement('li');
        li.classList.add('tarefa');
        
        const textoTarefa = document.createElement('span');
        textoTarefa.textContent = texto;
        li.appendChild(textoTarefa);

        // Botão para marcar como concluída
        const btnConcluir = document.createElement('button');
        btnConcluir.textContent = 'Concluir';
        btnConcluir.classList.add('concluir');
        li.appendChild(btnConcluir);

        // Botão para remover a tarefa
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.classList.add('remove');
        li.appendChild(btnRemover);

        // Adicionar o evento de concluir
        btnConcluir.addEventListener('click', function () {
            li.classList.toggle('done');
            tarefa.concluida = !tarefa.concluida;
            salvarTarefas(); // Salvar no localStorage
        });

        // Adicionar o evento de remover
        btnRemover.addEventListener('click', function () {
            li.remove();
            removerTarefa(tarefa);
            salvarTarefas(); // Salvar no localStorage
        });

        listaTarefas.appendChild(li);

        // Salvar tarefa no localStorage
        salvarTarefas();
    }

    // Função para remover tarefa do array de tarefas
    function removerTarefa(tarefa) {
        let tarefas = obterTarefas();
        tarefas = tarefas.filter(t => t.texto !== tarefa.texto);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    // Função para salvar tarefas no localStorage
    function salvarTarefas() {
        const tarefas = [];
        const tarefasList = document.querySelectorAll('li');
        tarefasList.forEach(li => {
            const texto = li.querySelector('span').textContent;
            const concluida = li.classList.contains('done');
            tarefas.push({ texto, concluida });
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    // Função para carregar tarefas do localStorage
    function carregarTarefas() {
        const tarefas = obterTarefas();
        tarefas.forEach(tarefa => {
            adicionarTarefa(tarefa.texto);
            if (tarefa.concluida) {
                const li = listaTarefas.lastChild;
                li.classList.add('done');
            }
        });
    }

    // Função para obter tarefas do localStorage
    function obterTarefas() {
        const tarefas = localStorage.getItem('tarefas');
        return tarefas ? JSON.parse(tarefas) : [];
    }
});
