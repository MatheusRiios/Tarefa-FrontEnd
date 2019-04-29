import React, {Component} from 'react'
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from 'react-datepicker'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import "react-datepicker/dist/react-datepicker.css";

import api from "../service/api";
import '../App.css'

class CreateTarefa extends Component {
    constructor(props){
        super(props)

        this.state = {
            openModal: this.props.openModal,
            nomeTarefa: '',
            dataInicial: new Date(),
            dataFinal: new Date(),
            dadosPessoas: [],
            pessoa: ''       
        }
    }

    componentDidMount() {
        this.carregarApi()
    }

    carregarApi = async () => {            
        const response     = await api.get('http://localhost:3000/pessoa');
        const dadosPessoas = await response.data
        
        this.setState({
            dadosPessoas: await dadosPessoas,
        });                     
    }

    createNewTarefa = async () => {
        const {dataFinal, dataInicial, pessoa, nomeTarefa} = this.state                  
        
        const objSend = {
            dataFinal: '2019-03-03', 
            dataInicio: '2019-04-03', 
            idPessoa: 5,
            nomeTarefa
        }
        console.log(objSend)
        const resp = await fetch('http://localhost:3000/tarefa/create', {
            method: 'POST', 
            body: JSON.stringify(objSend),
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        console.log(resp)
        //console.log(resp)
    }

    selectDateInicial = (date) => {    
        this.setState({
            dataInicial: date
        });
    }

    selectDateFinal = (date) => {
        this.setState({
            dataFinal: date
        });
    }


    menuItensSelectPessoa = (pessoa) => {        
        return (
            <MenuItem value={pessoa.nome} key={pessoa.id}>
                {pessoa.nome}
            </MenuItem>
        )
    }

    pessoaSelect = (event) => {
        this.setState({
            pessoa: event.target.value
        })
    }

    nomeTarefa = (event) => {
        this.setState({
            nomeTarefa: event.target.value
        })        
    }

    render(){
        const {openModal, dataFinal, dataInicial, dadosPessoas, pessoa} = this.state                  
                
        return (            
            <Modal className="container-modal cadastro" open={openModal}>
                <form className="form-cadastro" noValidate autoComplete="off">
                    <TextField
                        id="outlined-name"
                        label="Nome tarefa"                                                                        
                        margin="normal"
                        variant="outlined"
                        className="input-cadastro"
                        onChange={this.nomeTarefa}
                        name={"nomeTarefa"}
                    />
                    <div>
                        <p>Data Inicial</p>
                        <DatePicker 
                            className="datapicker"
                            selected={dataInicial}
                            onChange={this.selectDateInicial}                            
                            placeholderText="Data inicio da tarefa"
                            name={"dataInicio"}
                        />
                        <p>Data Final</p>
                        <DatePicker 
                            className="datapicker"
                            selected={dataFinal}
                            onChange={this.selectDateFinal}                            
                            placeholderText="Data final da tarefa"
                            name={"dataFinal"}
                        />                        
                    </div>
                    <FormControl>
                        <InputLabel htmlFor="age-simple">Pessoas</InputLabel>
                        <Select name={"idPessoa"} value={pessoa} onChange={this.pessoaSelect} >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {dadosPessoas.map(pessoa => this.menuItensSelectPessoa(pessoa))}
                        </Select>
                        <Button variant="contained" onClick={this.createNewTarefa} color="primary">
                            Enviar
                            <Icon>send</Icon>
                        </Button>
                    </FormControl>
                </form>
            </Modal>            
        )
    }
}

export default CreateTarefa