import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { UserContext } from '../../contexts/userContext';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { AuthContext } from '../../contexts/authContext';
import { useHistory } from 'react-router-dom';
const UsersList: React.FunctionComponent<{}> = () => {
    const userContext = useContext(UserContext);
    const authContext = useContext(AuthContext);
    const history = useHistory();
    
    if (!userContext) {
        return <div>Loading...</div>;
    }

    const { users = [], loading, error } = userContext;
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const isAdminUser = localStorage.getItem("isAdmin");

    const onLogoutCLicked = () => {
        history.push("/signin");
        authContext.signOut()
      }
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Users Management
                        </Typography>
                        <IconButton edge="end" color="inherit" aria-label="menu" onClick={onLogoutCLicked}>
                            <ExitToApp />
                        </IconButton>
                    </Toolbar>
                    
                </AppBar>
            </Grid>
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
                                        <TableCell>Email</TableCell>
                                        <TableCell>UserStatus</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users?.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {user.name}
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.UserStatus}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" disabled={!isAdminUser} color="primary">
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
