import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import * as React from 'react';
import {
    StyleRulesCallback, Drawer, Divider, List, ListItemIcon, ListItemText, ListItem, Hidden, IconButton
} from 'material-ui';
import HomeIcon from 'material-ui-icons/Home';
import PersonIcon from 'material-ui-icons/Person';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

type Classes = 'drawerPaper' | 'toolbar' | 'link' | 'mobileDrawerHeader';

export const drawerWidth = 240;

const styles: StyleRulesCallback<Classes> = theme => ({
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    link: {
        textDecoration: 'none',
    },
    toolbar: {
        ...theme.mixins.toolbar,
        textAlign: 'center',
        padding: theme.spacing.unit,
    },
    mobileDrawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        ...theme.mixins.toolbar,
        padding: theme.spacing.unit,
    }
});

interface AppDrawerProps {
    mobileOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

interface AppDrawerState {
}

type Props = AppDrawerProps & WithStyles<Classes>;

class AppDrawer extends React.Component<Props, AppDrawerState> {

    render() {
        const { classes, mobileOpen, onToggle, onClose } = this.props;

        const menu = (
            <List>
                <Link to="/" className={classes.link} onClick={onToggle}>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home page" />
                    </ListItem>
                </Link>
                <Link to="/about" className={classes.link} onClick={onToggle}>
                    <ListItem button>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="About me" />
                    </ListItem>
                </Link>
            </List>
        );

        // TODO: active Link
        return (
            <div>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={onToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <div className={classes.mobileDrawerHeader} >
                            <IconButton onClick={onClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        {menu}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="left"
                    >
                        <div className={classes.toolbar} >
                            <Typography variant="title">No&euml;l Mac&eacute;</Typography>
                            <Typography variant="subheading">Personal Web App</Typography>
                        </div>
                        <Divider />
                        {menu}
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

export default withStyles(styles)<AppDrawerProps>(AppDrawer);
