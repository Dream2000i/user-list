import { useState } from 'react';
import { Button, List, Modal } from 'antd';
import { Typography } from 'antd';
import { TypeDeleteUsersConfirmProps } from '../../types/props';

const { Title } = Typography;

export default function DeleteUsersConfirm({ items, handleOk }: TypeDeleteUsersConfirmProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleClickOk = () => {
        handleOk();
        handleCloseModal();
    }

    return (
        <div className='users-list__delete'>
            <Button onClick={handleOpenModal} disabled={!items.length}>Удалить пользователей</Button>

            <Modal
                open={isModalOpen}
                onCancel={handleCloseModal}
                onOk={handleClickOk}
            >
                <List
                    header={<Title level={5}>Вы уверены, что хотите удалить пользователей:</Title>}
                    dataSource={items}
                    renderItem={({ username }) => (
                        <List.Item>
                            <Typography.Text>{username}</Typography.Text>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    )
}

