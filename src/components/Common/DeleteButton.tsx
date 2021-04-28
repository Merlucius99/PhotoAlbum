import React, { useState } from 'react'
import { Icon, Button, Confirm } from 'semantic-ui-react';

interface DeleteButtonProps {
    index: string;
    objectName: string;
    deleteObject: (index: string) => void;
}

const DeleteButton = ({ index, objectName, deleteObject}: DeleteButtonProps) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleDelete = () => setIsConfirmOpen(true);

    const onOkConfirm = () => deleteObject(index);

    const onCancelConfirm = () => setIsConfirmOpen(false);



    return (
        <Button icon onClick={() => handleDelete()}>
            <Icon name='trash' /> 
            {isConfirmOpen && 
            <Confirm 
                open={isConfirmOpen}
                content={`Are you sure you want to delete '${objectName}'?`}
                cancelButton='No'
                confirmButton='Yes, delete it!'
                onCancel={() => onCancelConfirm()}
                onConfirm={() => onOkConfirm()}
            />
            }
        </Button>
    )
}

export default DeleteButton;
