import React from 'react';

import './Main.css';

export default function Main() {

    return (
        <div className="container">
            <div className="header">
                <h1>O que precisa ser feito?</h1>
            </div>

            <div className="content">
                <div className="abas">
                    <ul>
                        <li className="todos selected">
                            Todos
                        </li>
                        <li className="pendentes">
                            Pendentes
                        </li>
                        <li className="feitos">
                            Feitos
                        </li>
                    </ul>
                </div>

                <div className="tarefas">
                    <ul>
                        <li>
                            <div className="tarefa">
                                <h2 className='titulo'>ESCREVER ARTIGO</h2>
                                <p>Escrever artigo que relate tudo aquilo que foi encontrado durante experimentação realizada.</p>
                            </div>
                        </li>
                        <li>
                            <div className="tarefa">
                                <h2 className='titulo'>DESENHAR BONECOS</h2>
                                <p>Desenhar bonecos para uma ilustração.</p>
                            </div>
                        </li>
                        <li className='completed'>
                            <div className="tarefa">
                                <h2 className='titulo'>PROCURAR EXPLOSÕES ESPACIAIS</h2>
                                <p>Procurar explosões que ocorram em galáxias próximas.</p>
                                <img className="resolucao" src="https://www.lemonde.fr/blog/autourduciel/wp-content/uploads/sites/37/2014/01/M82_hs-2006-14-SN2014J-1000.jpg" alt="explosão espacial"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}