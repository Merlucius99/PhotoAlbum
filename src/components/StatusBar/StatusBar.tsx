import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

interface StatusBarProps {
    title: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ title, children}) => {
    return (
        <Grid columns={2} className='status-bar'>
            <Grid.Column>
                <Segment basic>
                    {title}
                </Segment>
            </Grid.Column>
            <Grid.Column textAlign='right'>
                <Segment basic>
                    {children}
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default StatusBar;