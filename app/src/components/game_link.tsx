import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

interface GameLinkProps {
gameInviteLink: string;
}
const GameLink: React.FC<GameLinkProps> = ({ gameInviteLink }) => {
    const history = useNavigate();
    const [copied, setCopied] = useState<boolean>(false);
    const OpenLink = () => {
        history("/game/1"); //to be made dynamic through backend
    };

    const Copy = async () => {
        await navigator.clipboard.writeText(gameInviteLink);
        setCopied(true);
    };

    return (
        <div className="w-screen h-screen border bg-[#0006] grid place-items-center absolute">
            <motion.div
                className="bg-yellow-200 card rounded-xl shadow-xl border-yellow-400 p-4"
                initial={{ opacity: 0, y: "50%" }}
                animate={{ opacity: 1, y: "-50%" }}
                exit={{ opacity: 0, y: "50%" }}
                transition={{ duration: 0.5 }}
                >
                <p className="bg-yellow-500 text-center my-3 rounded-md p-4">
                    {gameInviteLink}
                </p>
                <div className="flex justify-center gap-10">
                    <button className="btn rounded-md" onClick={Copy}>
                        {copied ? "Copied" : "Copy"}
                    </button>
                    <button className="btn" onClick={OpenLink}>
                        Open
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default GameLink;
