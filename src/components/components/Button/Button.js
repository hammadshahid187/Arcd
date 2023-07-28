import { Button } from "@mui/material";

export const OutlineBtn = ({ text = "text", color = "rgb(23, 43, 133)" }) => {
    return (
        <Button
            variant="outlined"
            size="medium"
            sx={{
                color: color,
                border: `1px solid ${color}`,
                textTransform: "none",
                fontWeight: "400",
                letterSpacing: "0.1px",
                "&:hover": {
                    border: `2px solid ${color}`,
                },
            }}
        >
            {text}
        </Button>
    );
};

export const FilledBtn = ({
    text = "text",
    bg = "rgb(23, 43, 133)",
    handler = null,
}) => {
    return (
        <Button
            variant="contained"
            sx={{
                background: bg,
                textTransform: "none",
                padding: "4px 8px",
                fontSize: "12px",
                "&:hover": {
                    background: bg,
                },
                boxShadow: 'none'
            }}
            className="w-[96px] h-[38px] text-[26px] !mr-[16px]"
            onClick={handler}
        >
            {text}
        </Button>
    );
};
