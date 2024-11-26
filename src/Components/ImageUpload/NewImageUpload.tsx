import { useState } from "react";
import Toast from "../ErrorBoundry/Toast";
import { IconUploadImg } from "../../assests/icons/MapToolsIcons";
import { useAppSelector } from "../../ReduxTool/store/hooks";
import { ProfileTy } from "../AllInput/types";


const NewImageUpload = ({isEditing,setProfileState,profileState}:{isEditing:boolean,setProfileState:React.Dispatch<React.SetStateAction<ProfileTy>>,profileState:ProfileTy}) => {
  const [selectedImage, setSelectedImage] = useState("");
  const { user } = useAppSelector((state) => state.auth);


  const handleImageChange = (e: any) => {
    setSelectedImage("")
    const file = e.target.files[0];
  
    // Check if file exists and is less than 2 MB
    if (file && file.size <= 1024 * 1024) { 
      const acceptedFileTypes = [".png", ".jpg"];
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
  
      // Check if file extension is valid
      if (acceptedFileTypes.includes(fileExtension || "")) {
        setProfileState(prev => ({ ...prev, profileimage: file }));
      } else {
        Toast({ messageText: "File Format Should be PNG or JPG", messageType: "E" });
        setSelectedImage("File Format Should be PNG or JPG");
      }
    } else {
      Toast({ messageText: "File size should be less than 1 MB", messageType: "E" });
      setSelectedImage("File size should be less than 1 MB");
    }
  }; 


  const [uname, setUname] = useState({ fname: "", lname: "" });
  const [hoverActive, setHoverActive] = useState(false);


  return (
    <div>
      <div
        className="relative flex justify-center items-center h-[6vh] select-none"       
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`uppercase relative size-20 para-lg flex justify-center items-center text-gray-200 bg-custom-primary-default rounded-full mb-8`}
          onMouseOver={() => setHoverActive(true)}
          onMouseLeave={() => setHoverActive(false)}
          title="Profile"
        >
          {hoverActive && !isEditing ? (<>
            <label htmlFor="rrrr" className="absolute cursor-pointer"  >
              <IconUploadImg />
            </label>
            <input disabled={isEditing} id="rrrr" type="file" className="hidden" onChange={handleImageChange} accept=".png,.jpn" />
          </>
          ) : (
            <div className={`${profileState.profileimage.size!==0 && profileState.profileimage!==""?"hidden":""}`}>
              {user && (user.fname?.split("")[0] + user.lname?.split("")[0]!)}
            </div>
          )}
          {profileState.profileimage.size !== 0 && profileState.profileimage !== "" && (
            <div>
              <img
                src={URL.createObjectURL(profileState.profileimage)}
                alt="Selected"
                style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "8vh", height: "8vh", borderRadius: "100%" }}
                />
            </div>
          )}
        </div>
      </div>           
    </div>
  );
};

export default NewImageUpload;
