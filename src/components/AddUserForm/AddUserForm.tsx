import { useState } from 'react';
import { Button, Form, Input, Modal, Space } from 'antd';
import { TypeNewUser } from '../../types/usersList';
import { MaskedInput } from 'antd-mask-input';
import { TypeAddUserFormProps } from '../../types/props';

export default function AddUserForm({ items, handleSubmit }: TypeAddUserFormProps) {

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const onFinish = (user: TypeNewUser) => {
        handleSubmit(user);
        handleCloseModal();
    };

    const handleOpenModal = () => setIsModalOpen(true);


    const handleCloseModal = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const formProps = {
        form: form,
        name: "new-user",
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (
        <div className='add-user-form'>
            <Button type='primary' onClick={handleOpenModal}>Добавить пользователя</Button>
            <Modal
                title='Добавить нового пользователя'
                className='add-user-form__modal'
                open={isModalOpen}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                onCancel={handleCloseModal}
            >
                <Form
                    {...formProps}
                    onFinish={onFinish}
                >

                    {items && items.map(({ label, name, required, pattern, mask }) => (
                        <Form.Item<TypeNewUser>
                            key={'form-item-' + name}
                            label={label}
                            name={name}
                            rules={[{ required: required, message: `Поле ${label} заполнено не верно`, pattern }]}
                        >
                            {!mask ? <Input /> : <MaskedInput mask={mask} />}
                        </Form.Item>
                    ))}

                    <Form.Item wrapperCol={{ span: 1, offset: 14 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Сохранить
                            </Button>

                            <Button htmlType="button" onClick={handleCloseModal}>
                                Отмена
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

