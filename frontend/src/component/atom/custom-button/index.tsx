import Link from "next/link";
import {Typography} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";

interface ICustomButton {
    text:string
    onClick: Promise<void>
}
export const CustomButton = (props: ICustomButton): JSX.Element => {
    return (
        <Button
            color="inherit"
            onClick={() => props.onClick}
        >
            <Typography>{props.text}</Typography>
        </Button>
);
};
