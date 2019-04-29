import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import api from "../service/api";

class TabelaUserTodo extends Component {

    constructor(props){
        super(props)

        this.state = {
            dados: [],
            tarefaPessoa: [],
            openModalTarefas: false
        }
    }

    componentDidMount() {
        this.carregarApi()
    }

    carregarApi = async () => {            
        const response = await api.get('http://localhost:3000/pessoa');
        const data     = await response.data
        
        this.setState({
            dados: await data,            
        });                     
    }

    openAndCloseModal = async (pessoaID) => {         
        const response = await api.get(`http://localhost:3000/pessoa/${pessoaID}`);
        const data     = await response.data;
        let   open     = !this.state.open;

        this.setState({
            openModalTarefas: open,
            tarefaPessoa: data.tarefa,
        });
    }    


    tablePessoas = (pessoa) => { 
        return (
            <TableRow key={pessoa.id}>
                <TableCell align="center">{pessoa.nome}</TableCell>    
                <TableCell align="center">
                    <Button onClick={(e) => this.openAndCloseModal(pessoa.id)} variant="contained" color="primary" >Ver tarefas</Button>            
                </TableCell>
            </TableRow>
        )
    }

    tableTarefasPessoa = (tarefa) => {        
        return(
            <TableRow key={tarefa.id}>                     
                <TableCell align="center">{tarefa.nomeTarefa}</TableCell>  
                <TableCell align="center">{tarefa.dataInicio}</TableCell>  
                <TableCell align="center">{tarefa.dataFinal}</TableCell>  
            </TableRow>       
        )              
    }
    
    render(){
        const {dados, tarefaPessoa} = this.state              
        return(
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Pessoa</TableCell>  
                                <TableCell align="center">Tarefas</TableCell>  
                            </TableRow>
                        </TableHead>
                        <TableBody>                        
                            {dados.map(pessoa => this.tablePessoas(pessoa))}                        
                        </TableBody>
                    </Table>
                </Paper>

                <Modal className="container-modal" open={this.state.openModalTarefas}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Tarefa</TableCell>  
                                    <TableCell align="center">Data Inicio</TableCell>  
                                    <TableCell align="center">Data Final</TableCell>  
                                </TableRow>
                            </TableHead>
                            <TableBody>   
                                {tarefaPessoa.map(tarefa => this.tableTarefasPessoa(tarefa))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Modal>                                            
            </div>
        )
    }
}

export default TabelaUserTodo