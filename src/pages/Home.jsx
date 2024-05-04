import React, { useEffect } from "react";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { BiNotification } from "react-icons/bi";
import {BsSearch} from 'react-icons/bs';
import { validUser } from "../apis/auth";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../redux/activeUserSlice";
import Group from "../components/ui/Group";

function Home() {
  const showProfile = false;
  const showNotifications = true;
  const search = true;

  const dispatch  = useDispatch();
  const {activeUser} = useSelector((state) => state)

  console.log('activeUser',{activeUser})
  useEffect(() => {
    const isValid = async  () => {

      const data = await validUser();
      console.log('isValid',{data})
      const user = {
        id: data?.user?._id,
        email: data?.user?.email,
        profilePic: data?.user?.profilePic,
        bio: data?.user?.bio,
        name:data?.user?.name
      };

      dispatch(setActiveUser(user));
    }

    isValid();
  }, [dispatch, activeUser]);
  return (
    <>
      <div className="bg-[#f5f5f5] scrollbar-hide z-10 h-[100vh] lg:w-[90%] lg:mx-auto overflow-y-hidden shawdow-2xl">
        <div className="flex">
          {!showProfile ? (
            <div className="md:flex md:flex-col min-w-[360px] h-[100vh] md:h[98vh] bg-[#ffff] relative">
              <div className="h-[60px] px-4">
                <div className="flex">
                  <a
                    className="flex items-center relative -top-4 block h-[90px]"
                    href="/"
                  >
                    <h3 className="text-[20px] text-[#1f2228] font-body font-extrabold tracking-wider">
                      Messages
                    </h3>
                  </a>
                </div>

                <div className="absolute top-4 right-5 flex items-center gap-x-3">
                  <button>
                    <NotificationBadge
                      // count={notifications.length}
                      count={10}
                      effect={Effect.SCALE}
                      style={{
                        width: "15px",
                        height: "15px",
                        fontSize: "9px",
                        padding: "4px 2px 2px 2px",
                      }}
                    />
                    {showNotifications ? (
                      <RiNotificationBadgeFill
                        style={{
                          width: "25px",
                          height: "25px",
                          color: "green",
                        }}
                      />
                    ) : (
                      <BiNotification
                        style={{
                          width: "25px",
                          height: "25px",
                          color: "green",
                        }}
                      />
                    )}
                  </button>
                </div>
              </div>

              <div>

                        <div className="-mt-6 relative pt-6 px-4 ">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input className="w-[99%] bg-[#f6f6f6] text-[#111b21] tracking-wider pl-9 py-[8px] rounded-[9px] outline-0" type="text" name="search" placeholder="Search" />

                        </form>

                        <div className="absolute top-[36px] left-[27px]">
                            <BsSearch style={{color:'grey'}} />
                        </div>
                        <Group />


                        <div style={{
                          display: search ? "" : 'none'
                        }} >
                        
                        </div>
                            {/* <Search/> */}
                        </div>

                        {/* <Contacts /> */}

              </div>
            </div>
          ) : (
            <div>
              {/* <Profile /> */}
            </div>
          )}

          {/* <Chat /> */}
        </div>
        {/* messages */}

      </div>
    </>
  );
}

export default Home;
