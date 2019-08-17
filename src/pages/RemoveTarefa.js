import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';

import api from '../services/api';

import './RemoveTarefa.css';

export default function RemoveTarefa(props) {
    const [open, setOpen] = useState(false);

    function openModal() {
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
    }

    async function deleteTarefa(e) {
        e.preventDefault();

        const id = props.tarefaId;

        if(id){
            await api.delete(`/tarefas/${id}`).then(
                () => props.deleteTarefa(), 
                err => {
                console.log(err);
                });
        }
        
        closeModal();
    }

    return (
        <div className="rmv-tarefa">
            <button className="rmv-btn" onClick={() => openModal()} >Remover</button>

            <Modal
                open={open}
                className="rmv-modal"
            >

                <div className="rmv-modal-content">
                    <div className="header">
                        <h1 className="title">Remover Tarefa?</h1>
                        <button className="close" onClick={() => closeModal()}>&times;</button>
                    </div>

                    <form onSubmit={deleteTarefa}>

                        <div class="footer">
                            <button className="cancel-btn" onClick={() => closeModal()}>Cancelar</button>
                            <button className="remove-btn" type="submit">Remover</button>
                        </div>
                    </form>
                </div>
            </Modal>

        </div>
    );

}