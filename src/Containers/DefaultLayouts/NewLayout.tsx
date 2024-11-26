import React, { useState } from "react";

interface SidebarIconProps {
  label: string;
  onClick: () => void;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ label, onClick }) => {
  return (
    <div
      className="sidebar-icon flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-200"
      onClick={onClick}
    >
      {/* Your icon component or image here */}
      <p className="ml-2 text-gray-700">{label}</p>
    </div>
  );
};

interface DrawerContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DrawerContainer: React.FC<DrawerContainerProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <div
      className={`drawer-container ${
        isOpen ? "w-64" : "w-0"
      } fixed top-0 left-0 h-full bg-gray-200 shadow-md transition-transform duration-300 ease-in-out transform`}
    >
      <SidebarIcon label="Icon 1" onClick={() => setIsOpen(!isOpen)} />
      {/* Add more SidebarIcon components as needed */}
      {isOpen && (
        <div className="drawer-content p-4">
          {/* Your drawer content here */}
          <p className="text-gray-700">Drawer Content</p>
        </div>
      )}
    </div>
  );
};

const CenterContent = () => {
  return (
    <div className="center-content flex-1 p-4">
      {/* Your inputs, tables, etc. here */}
      <h2 className="text-2xl font-bold text-gray-800">Center Content</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <label className="mr-2 text-gray-700">Name:</label>
          <input type="text" className="border rounded-md p-2" />
        </div>
        <div className="flex items-center">
          <label className="mr-2 text-gray-700">Project Name:</label>
          <input type="text" className="border rounded-md p-2" />
        </div>
        {/* Add more input fields as needed */}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                Header 1
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                Header 2
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b px-4 py-2 text-gray-700">Cell 1</td>
              <td className="border-b px-4 py-2 text-gray-700">Cell 2</td>
            </tr>
            <tr>
              <td className="border-b px-4 py-2 text-gray-700">Cell 3</td>
              <td className="border-b px-4 py-2 text-gray-700">Cell 4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RightSidebar = () => {
  return (
    <div className="right-sidebar fixed top-0 right-0 h-full w-64 bg-gray-200 shadow-md transition-transform duration-300 ease-in-out transform">
      {/* Your right sidebar content here */}
      <p className="text-gray-700 p-4">Right Sidebar Content</p>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="footer fixed bottom-0 left-0 w-full p-4 bg-gray-100">
      {/* Your footer content here */}
      <p className="text-gray-700">Footer Content</p>
    </div>
  );
};

const NewLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid gap-1 grid-rows-[70px_auto_70px_70px_30px] lg:grid-rows-[70px_auto_30px] lg:grid-cols-[60px_auto_40px] h-screen">
      <header className="lg:col-start-1 lg:col-span-3 bg-[#3767DA] text-white text-lg lg:order-1">
        header
      </header>

      <article className="bg-[#D9D9D9] text-[#7F7D7D] text-lg lg:order-3">
        article
      </article>

      <nav className="bg-[#0CC0DF] text-white text-lg lg:order-2">nav</nav>

      <aside className="bg-[#0CC0DF] text-white text-lg lg:order-4">aside</aside>

      <footer className="lg:col-start-1 lg:col-span-3 bg-[#3767DA] text-white text-lg lg:order-5">
        footer
      </footer>
    </div>
  );
};

export default NewLayout;
