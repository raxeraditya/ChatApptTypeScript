import User from "./User";
import Message from "./Message";

const HomePageUserChat = () => {
  return (
    <div className="h-full ">
      <main>
        <div className="div flex-col sm:flex justify-center items-center gap-5 bg-sky-500">
          <div className="sidebar backdrop-blur-0 flex items-center justify-center">
            <User />
          </div>
          <div className="message">
            <Message />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePageUserChat;
