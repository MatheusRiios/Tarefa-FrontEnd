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

import CreateTarefa from "./createTarefa";

class TabelaUserTodo extends Component {

    constructor(props){
        super(props)

        this.state = {
            dados: [],
            openModalTarefas: false
        }
    }

    componentDidMount() {
        this.carregarApi()
    }

    openAndCloseModal = () => {
        let open = !this.state.open
        this.setState({
            openModalTarefas: open
        })                
    }    

    carregarApi = async () => {    
        const response = await api.get('http://localhost:3000/pessoa')
        const data     = await response.data
        console.log(data)
        this.setState({
            dados: await data,            
        })                      
    }

    tableDados = (dado) => {
        // console.log(dado)
        // console.log(dado)        
        return (
            <TableRow key={dado.id}>
                <TableCell align="center">{dado.nome}</TableCell>    
                <TableCell align="center">
                    <Button onClick={this.openAndCloseModal} variant="contained" color="primary" >Ver tarefas</Button>            
                </TableCell>
            </TableRow>
        )
    }
    
    render(){
        const {dados} = this.state                      
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
                            {dados.map(dado => this.tableDados(dado))}                        
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
                                
                            </TableBody>
                        </Table>
                    </Paper>
                </Modal>

                {/* <CreateTarefa dados={} /> */}
            </div>
        )
    }
}

export default TabelaUserTodo