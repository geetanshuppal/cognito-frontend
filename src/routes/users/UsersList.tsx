import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { UserContext } from '../../contexts/userContext';

const UsersList: React.FunctionComponent<{}> = () => {
    const userContext = useContext(UserContext);

    if (!userContext) {
        return <div>Loading...</div>;
    }

    const { users, loading, error } = userContext;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    
    return (
        <Grid container spacing={2}>
            {/* Navigation Header */}
            <Grid item xs={12}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            Users Management
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Grid>

            {/* Table in Card */}
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Users List
                        </Typography>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First Name</TableCell>
                                        <TableCell align="right">Last Name</TableCell>
                                        <TableCell align="right">Email</TableCell>
                                        <TableCell align="right">Mobile Number</TableCell>
                                        <TableCell align="right">Role</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users?.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {user.firstName}
                                            </TableCell>
                                            <TableCell align="right">{user.lastName}</TableCell>
                                            <TableCell align="right">{user.email}</TableCell>
                                            <TableCell align="right">{user.mobileNumber}</TableCell>
                                            <TableCell align="right">{user.role}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" color="primary">
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UsersList;
