import React, { useState, useEffect } from 'react';
import $ from 'jquery';

import api from '../services/api';
import CreateTarefa from './CreateTarefa';

import './Main.css';

export default function Main(){

    const [tarefas, setTarefas] = useState([]);
    const [aba, setAba] = useState('todos');
    const [update, setUpdate] = useState(false);

    // Disparado toda vez que a aba ou o estado 'update' for alterado
    useEffect(() => {
        let filter;

        switch(aba){
            case 'pendentes':
                filter ='?concluido=false'
                break;

            case 'feitos':
                filter ='?concluido=true';
                break;

            default:
                filter = '';
        }

        //Buscar tarefas cadastras do back-end
        async function loadTarefas(){
            const response = await api.get(`/tarefas${filter}`);
            
            setTarefas(response.data);
        }

        loadTarefas();

    }, [aba, update]);

    //Alterar a aba
    function handleFilter(target){

        //Apenas alterar valor de ${aba} caso nao esteja selecionada
        if(target.className !== `${aba} selected`){
            $(`.${aba}`).removeClass("selected");

            setAba(target.className);
            target.className = `${target.className} selected`;
        }

    }

    // Mostrar/Esconder imagem de resolução
    function toggleImage(index){
        const id = `#resolucao${index}`;

        $(id).slideToggle()
    }

    //Carregar todas as tarefas retornadas do back-end
    function buildTarefas(){
        if(tarefas.length === 0) return (<p className="no-task">Nenhuma tarefa encontrada.</p>);

        return tarefas.map((tarefa, index) => (
            <li key={tarefa.id} className={(tarefa.concluido? 'completed':'')}>
                <div className="tarefa" onClick={e => toggleImage(index+1)}>
                    <h2 className='titulo'>{tarefa.titulo.toUpperCase()}</h2>
                    <p>{tarefa.descricao}</p>
                    {(tarefa.concluido)
                        ? (<img className="resolucao" id={`resolucao${index+1}`} src={tarefa.imagePath} alt={tarefa.imagePath}/>)
                        : ""
                    }
                    
                </div>
            </li>
        ));
    }

    return(
        <div className="container">
            <div className="header">
                <h1>O que precisa ser feito?</h1>
            </div>

            <div className="content">
                
                <CreateTarefa createTarefa={() => setUpdate(!update)} />
                
                <div className="abas">
                    <ul>
                        <li className="todos selected" onClick={e => handleFilter(e.currentTarget)}>
                            Todos
                        </li>
                        <li className="pendentes" onClick={e => handleFilter(e.currentTarget)}>
                            Pendentes
                        </li>
                        <li className="feitos" onClick={e => handleFilter(e.currentTarget)}>
                            Feitos
                        </li>
                    </ul>
                </div>

                <div className="tarefas">
                    <ul>
                        {buildTarefas()}
                    </ul>
                </div>
            </div>
        </div>
    );
}