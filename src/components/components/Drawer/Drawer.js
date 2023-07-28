import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";

const CustomDrawer = ({ state, handler, children, anchor }) => {
    return (
        <div>
            <SwipeableDrawer
                anchor={anchor}
                open={state}
                onClose={handler(false)}
                onOpen={handler(true)}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Box
                    sx={{
                        width: 320,
                        position: "relative",
                    }}
                    role="navigation"
                    onKeyDown={handler(false)}
                >
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: 5,
                            left: 5,
                        }}
                        onClick={handler(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                    {children}
                </Box>
            </SwipeableDrawer>
        </div>
    );
};

export default CustomDrawer;
