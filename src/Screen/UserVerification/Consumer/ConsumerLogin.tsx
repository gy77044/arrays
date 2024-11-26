import { ChangeEvent } from "react";
import NewInput from "../../../Components/New/Input/NewInput";
import { IconInfo } from "../../../assests/icons/DrawerIcons";
import { useAppSelector } from "../../../ReduxTool/store/hooks";

export default function ConsumerLogin() {
  const user = useAppSelector((state) => state.auth.user);
 
  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <>
      <div className="table-main">
        <div className="table-name">User Details</div>
        <div className="tableContainer">
          <div className="flex-1 space-y-[4vh]">
            <NewInput id={"userName"} labelname={"User Name"} name={"userName"} value={user && user.fname + " " + user.lname} type="text" onChange={handleChanges} star={false} icon={<IconInfo />} disabled={true} hideIcon={true}/>
            <NewInput id={"userMobile"} labelname={"User Mobile"} name={"userMobile"} value={user && user.mobile as string} type="text" onChange={handleChanges} star={false} icon={<IconInfo />} disabled={true} hideIcon={true}/>
          </div>
          <div className="flex-1 space-y-[4vh]">
            <NewInput id={"userEmail"} labelname={"User Email"} name={"userEmail"} value={user && (user.emailid as string)} type="email" onChange={handleChanges} star={false} icon={<IconInfo />} disabled={true} hideIcon={true}/>
          </div>
        </div>
      </div>
    </>
  );
}
