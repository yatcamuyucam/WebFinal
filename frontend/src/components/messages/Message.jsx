const Message = () => {
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind css chat bubble component"
                        src={"https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/ufo_alien_space_avatar-512.png"}>
                    </img>
                </div>
            </div>
            <div className="chat-bubble text-white bg-blue-500">
                Hi!! How r u?
            </div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
                18.32
            </div>
        </div>
    );
};

export default Message;