import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

export class MyPoisComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            pois:this.props.pois
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleButtonClick= this.handleButtonClick.bind(this);
    }
    handleUserInput(e,index) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState((prevState)=>{
            return {
                pois:[...prevState.pois.slice(0,index),{
                    location: name==='location'?value:prevState.pois[index].location,
                    hourRange: name==='hourRange'?value:prevState.pois[index].timeRange,
                },...prevState.pois.slice(index+1,prevState.pois.length)]
            };
        })



    }
    handleButtonClick(){
        this.props.onPoisUpdated([...this.state.pois]);
    }
    render() {
        return (
            <React.Fragment>
                <Card>
                    {this.state.pois.map((poi,index)=>{
                        return <div key={index}>
                                    <input autoFocus={true}
                                        type='text' name='location'
                                        placeholder='Desired location'
                                        value={poi.location}
                                        onChange={(e)=>this.handleUserInput(e,index)}/>
                                    <input autoFocus={true}
                                        type='text' name='hourRange'
                                        placeholder='Hour range'
                                        value={poi.hourRange}
                                        onChange={(e)=>this.handleUserInput(e,index)}/>
                        </div>
                    })}
                    <p>{this.props.pois[0] && this.props.pois[0].location}</p>
                    
                    <button onClick={this.handleButtonClick}>update
                    </button>
                </Card>
            </React.Fragment>
        );
    }
}

MyPoisComponent.propTypes = {
    pois: PropTypes.array.isRequired,
    onPoisUpdated: PropTypes.func.isRequired,
};


