const { Grid, Container} = require("@mui/material")
import DashboardIcon from '@mui/icons-material/Dashboard';
import "../../../../public/sass/pages/sidebar.scss"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../../../../public/sass/base/variable.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../../../../public/sass/base/variable.scss'

const sidebar = ()=>{
    return(
        <div className="SideContainer">
            <Container >
                <Grid Container>
                    <Grid item>
                        <div className="inner_parent">
                            <div className="sidebar">
                                <div className="Menu">
                                        Sidebar
                                </div>
                                <div className='options'>
                                    <button className='dashboard'>
                                        <DashboardIcon/>Dashboard
                                    </button>
                                    <button className='post'>
                                        <AddCircleIcon/>
                                     <div>
                                            Make a Post
                                        </div>
                                    </button>
                                    <button className='user'>
                                        <AccountCircleIcon/>
                                        <div>
                                            Profile
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default sidebar;