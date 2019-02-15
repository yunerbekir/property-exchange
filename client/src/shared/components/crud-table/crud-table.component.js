import React from 'react';
import { Table, Input, Button, Popconfirm, Form, Alert, Col, Row } from 'antd';
import PropTypes from 'prop-types';

import './crud-table.component.scss';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);


class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        if (this.props.editable) {
            const editing = !this.state.editing;
            this.setState({ editing }, () => {
                if (editing) {
                    this.input.focus();
                }
            });
        }
    };

    handleClickOutside = (e) => {
        const { editing } = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    };

    save = () => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps} >
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save}
                                            />
                                        )}
                                    </FormItem>
                                ) : (
                                    <div onClick={this.toggleEdit}
                                         className='editable-cell-value-wrap'
                                         style={{ paddingRight: 24 }}>
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

export class CrudTableComponent extends React.Component {
    operationColumn = {
        title: 'Actions',
        dataIndex: 'operation',
        render: (text, record) => {
            return (<div>
                <Popconfirm title='Sure to delete?' onConfirm={() => this.handleDelete(record)}>
                    <Button size='small'>Delete</Button>
                </Popconfirm>
                {
                    this.props.customActions ?
                        this.props.customActions.map(action => (
                            <Button size='small' key={action.title}
                                    onClick={() => action.handler(text, record)}>{action.title}</Button>)) : null
                }
            </div>);
        },
    };

    handleDelete = (item) => {
        this.props.onItemRemove(item);
    };

    handleAdd = () => {
        this.props.onItemAdd();
    };

    handleSave = (item) => {
        this.props.onItemEdit(item);
    };

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = [...this.props.columns, this.operationColumn].map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Row style={{ marginBottom: 16, marginTop: 16 }}>
                    <Col span={12}>
                        <Button onClick={this.handleAdd} type='primary'>
                            {this.props.addBtnText || 'Add a row'}
                        </Button>
                    </Col>
                    {this.props.helperText ? <Col span={12}>
                        <Alert message={this.props.helperText} type='info' showIcon/>
                    </Col> : ''}
                </Row>
                <Table
                    rowKey='id'
                    components={components}
                    bordered
                    dataSource={this.props.data}
                    columns={columns}
                    size='small'
                    pagination={{ pageSize: 100 }}
                />
            </div>
        );
    }
}


CrudTableComponent.propTypes = {
    addBtnText: PropTypes.string,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onItemAdd: PropTypes.func.isRequired,
    onItemEdit: PropTypes.func.isRequired,
    onItemRemove: PropTypes.func.isRequired,
    helperText: PropTypes.string,
    customActions: PropTypes.array,
};
