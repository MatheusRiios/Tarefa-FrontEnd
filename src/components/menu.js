import React, {Component} from 'react'
import Button from '@material-ui/core/Button';

import CreateTarefa from '../components/createTarefa'

class Menu extends Component {
    constructor(props){
        super(props)

        this.state = {
            openModal: false
        }
    }

    showAndHiddenModal = () => {
        this.setState({ openModal: !this.state.openModal });
    };

    render() {
        const {openModal} = this.state
        return (
            <div className="container-menu">
                <ul className="ul-menu">
                    <Button onClick={this.showAndHiddenModal}><li>Cadastrar</li></Button>
                    <Button><li>Listar</li></Button>
                    <Button><li>Deletar</li></Button>
                    {openModal !== false ? <CreateTarefa openModal={openModal} /> : null}
                </ul>
            </div>
        )
    }
}

export default Menu