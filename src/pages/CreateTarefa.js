import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';

import api from '../services/api';

import './CreateTarefa.css';

export default function CreateTarefa(props){
    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    function openModal(){
        setOpen(true);
    }

    function closeModal(){
        setOpen(false);
    }

    async function handleTarefa(e){
        e.preventDefault();

        api.post('/tarefas', {
            titulo,
            descricao
        }).then(
            () => props.createTarefa(), 
            err => console.log(err)
        );

        closeModal();
    }

    return (
        <div className="add-tarefa">
            <div className="btn-add" onClick={() => openModal()}>
                <p>Adicionar Tarefa</p>
            </div>
            
            <Modal 
                open={open} 
                disableEscapeKeyDown={true} 
                className="modal"
            >

                <div className="modal-content">
                    <div className="header">
                        <h1 className="title">Adicionar Tarefa</h1>
                        <button className="close" onClick={() => closeModal()}>&times;</button>
                    </div>
                    
                    <form onSubmit={handleTarefa}>

                        <p className="input-title">Título</p>
                        <input 
                            type="text" 
                            value={titulo} 
                            onChange={e => setTitulo(e.target.value)}
                            placeholder="Insira o título da tarefa" 
                            required
                        />

                        <p className="input-title">Descrição</p>
                        <textarea 
                            type="" 
                            value={descricao} 
                            onChange={e => setDescricao(e.target.value)}
                            placeholder="Insira a descrição da tarefa"
                            required
                        />

                        <button className="submit-btn" type="submit">Adicionar</button>
                    </form>
                </div>
            </Modal>

        </div>
    );

}