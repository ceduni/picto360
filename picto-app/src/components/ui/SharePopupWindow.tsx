import { Box, Fade, IconButton, InputBase, Modal, Typography } from "@mui/material"
import { Cancel as CancelIcon, } from "@mui/icons-material";
import React from "react";

interface SharePopupProps {
    isOpen:boolean;
    setIsPopupOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const SharePopupWindow: React.FC<SharePopupProps> = ({ isOpen,setIsPopupOpen }) => {

    const handlePopupClose = () =>{
        setIsPopupOpen(false);
    }

    return (
        <Modal open={isOpen} onClose={handlePopupClose} closeAfterTransition>
            <Fade in={isOpen}>
            <Box
                sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={handlePopupClose}>
                    <CancelIcon sx={{ color: "#282828", "&:hover": { color: "red" } }} />
                </IconButton>
                </Box>
                <Typography variant="h6" component="h2" sx={{ marginBottom: "1rem" }}>
                    Share Project
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <InputBase
                    placeholder="Expiration Date"
                    type="date"
                    sx={{
                    borderBottom: "1px solid gray",
                    paddingBottom: "0.5rem",
                    color: "#000000",
                    }}
                />
                <InputBase
                    placeholder="Access Level"
                    type="text"
                    sx={{
                    borderBottom: "1px solid gray",
                    paddingBottom: "0.5rem",
                    color: "#000000",
                    }}
                />
                <IconButton
                    sx={{
                    alignSelf: "center",
                    padding: "0.5rem 1.5rem",
                    backgroundColor: "primary.main",
                    color: "white",
                    borderRadius: "5px",
                    }}
                >
                    Copy Link
                </IconButton>
                </Box>
            </Box>
            </Fade>
        </Modal>
    )
}    

export default React.memo(SharePopupWindow);