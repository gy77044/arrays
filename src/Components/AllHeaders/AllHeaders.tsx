import { Link } from "react-router-dom";
import { newformatDate } from "../../Utils/commonFunctions";
import { IblockquoteProps, ICardDesignProps, IHeadAboutProps, IHeadParaProps, IImageProps, IInfoPropToggle, IULProps } from "./types";

<div className="min-h-screen w-screen bg-gradient-to-tr from-gray-200 to-gray-300 py-16 px-2">
  <div className="grid w-full grid-cols-2 place-items-center space-y-12"></div>
</div>;

export const HeadingTerranxt = (props: IHeadParaProps) => {
  return (
    <>
      {/* Global HeadingTerranxt */}
      <h1 className="heading11">{props.title ? props.title : `Terranxt Pvt Ltd`}</h1>
      <p className="para1">
        {props.para1 ? props.para1 : ` This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real text. The important factor when using filler text is that the text looks realistic otherwise it will not look very good.`}
        <br /><br />
        {props.para2 ? props.para2 : ` This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is`}
        <a href={`${props.link ? props.link : "#"}`} className="link1">{props.para2 ? props.para2 : "random"}</a>
        {props.para3 ? props.para3 : `or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real text.`}
      </p>
    </>
  );
};
export const HeadingAbout = (props: IHeadAboutProps) => {
  return (
    <>
      {/* Global HeadingAbout */}
      <h2 className="heading21">{props.title ? props.title : "About us"}</h2>
      <p className="para1">
        {props.para ? props.para : ` This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated. It may be used to display
            a sample of fonts or generate text for testing. Filler text is dummy
            text which has no meaning however looks very similar to real text.`}
      </p>
    </>
  );
};
export const UlList = (props: IULProps) => {
  return (
    <>
      {/* Global UlList */}
      <ul className="ul1">
        {props.ulList?.map((item, index) => (
          <li>{item}</li>
        ))}
      </ul>
    </>
  );
};
export const BlockquoteList = (props: IblockquoteProps) => {
  return (
    <>
      {/* Global BlockquoteList */}
      <blockquote className="blockquote1">
        {props.quotes ? props.quotes : `“This is a section of some simple filler text, also known asplaceholder text. It shares some characteristics of a real writtentext but is random or otherwise generated.”`}
      </blockquote>
    </>
  );
};
export const ImageAdd = (props: IImageProps) => {
  return (
    <>
      {/* Global ImageAdd */}
      <div className="main-img1">
        <img src={props.link ? props.link : `https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600&h=350`} loading="lazy" alt={`${props.altname ? props.altname : "Terranxt"}`} className="img-box1" />
      </div>
    </>
  );
};
export const Heading2 = () => {
  return (
    <>
      {/* Global heading */}
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-md px-4 md:px-8">
          <h1 className="heading12">
            Terranxt Pvt Ltd
            <span className="h-1 w-20 bg-indigo-500 rounded"></span>
          </h1>
          <p className="para1">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated. It may be used to display
            a sample of fonts or generate text for testing. Filler text is dummy
            text which has no meaning however looks very similar to real text.
            The important factor when using filler text is that the text looks
            realistic otherwise it will not look very good.
            <br />
            <br />
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is
            <a href="#" className="link1">
              random
            </a>
            or otherwise generated. It may be used to display a sample of fonts
            or generate text for testing. Filler text is dummy text which has no
            meaning however looks very similar to real text.
          </p>

          <h2 className="heading22">About us</h2>

          <p className="para1">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated. It may be used to display
            a sample of fonts or generate text for testing. Filler text is dummy
            text which has no meaning however looks very similar to real text.
          </p>

          <ul className="ul1">
            <li>This is a section of some simple filler text</li>
            <li>Also known as placeholder text</li>
            <li>It shares some characteristics of a real written text</li>
          </ul>

          <blockquote className="blockquote1">
            “This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated.”
          </blockquote>

          <div className="main-img1">
            <img
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600&h=350"
              loading="lazy"
              alt="Photo by Minh Pham"
              className="img-box1"
            />
          </div>

          <h2 className="heading22">Features</h2>

          <p className="para1">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated. It may be used to display
            a sample of fonts or generate text for testing. Filler text is dummy
            text which has no meaning however looks very similar to real text.
          </p>
        </div>
      </div>
    </>
  );
};
export const HeadingDsignBoldClm = (props: IHeadParaProps) => {
  return (
    <>
      {/* Global HeadingDsignBoldClm */}
      <div>
        <h1 className="heading11">{props.title ? props.title : `Terranxt Pvt Ltd`}</h1>
        <p className="para1">
          {props.para1 ? props.para1 : ` This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real text. The important factor when using filler text is that the text looks realistic otherwise it will not look very good.`}
          <br />
          <br />
          {props.para2 ? props.para2 : ` This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is`}
          <a href={`${props.link ? props.link : "#"}`} className="link1">
            {`${props.linkTxt ? props.linkTxt : "random"}`}
          </a>
          {props.para3 ? props.para3 : ` or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real text.`}
        </p>
      </div>
    </>
  );
};
export const HeadingDsignNormClm = (props: IHeadParaProps) => {
  return (
    <>
      {/* Global HeadingDsignNormClm */}
      <div>
        <h1 className="heading12">{props.title ? props.title : `Terranxt Pvt Ltd`}</h1>
        <p className="para1">
          {props.para1 ? props.para1 : ` This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real text. The important factor when using filler text is that the text looks realistic otherwise it will not look very good.`}
          <br />
          <br />
          {props.para2 ? props.para2 : ` This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is`}
          <a href={`${props.link ? props.link : "#"}`} className="link1">
            {`${props.linkTxt ? props.linkTxt : "random"}`}
          </a>{" "}
          {props.para3 ? props.para3 : ` or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real text.`}
        </p>
      </div>
    </>
  );
};
export const HeadingDsignBlodUnderLineClm = (props: IHeadParaProps) => {
  return (
    <>
      {/* Global HeadingDsignBlodUnderLineClm */}
      <div>
        <div className="mb-4 flex flex-col items-center">
          <h1 className="heading13">{props.title ? props.title : `Terranxt Pvt Ltd`}</h1>
          <div className="text-center h-1 w-20 bg-custom-primary-default rounded"></div>
        </div>
        <p className="para1">
          {props.para1 ? props.para1 : ` This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real text. The important factor when using filler text is that the text looks realistic otherwise it will not look very good.`}
          <br />
          <br />
          {props.para2 ? props.para2 : ` This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is`}
          <a href={`${props.link ? props.link : "#"}`} className="link1">
            {`${props.linkTxt ? props.linkTxt : "random"}`}
          </a>{" "}
          {props.para3 ? props.para3 : ` or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real text.`}
        </p>
      </div>


    </>
  );
};
export const HeadingDsignNormlUnderLineClm = (props: IHeadParaProps) => {
  return (
    <>
      {/* Global HeadingDsignNormlUnderLineClm */}
      <div>
        <div className="mb-4 flex flex-col items-start">
          <h1 className="heading14">{props.title ? props.title : `Terranxt Pvt Ltd`}</h1>
          <div className="h-0.5 w-20 bg-custom-primary-default rounded"></div>
        </div>
        <p className="para1">
          {props.para1 ? props.para1 : ` This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real text. The important factor when using filler text is that the text looks realistic otherwise it will not look very good.`}
          <br />
          <br />
          {props.para2 ? props.para2 : ` This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is`}
          <a href={`${props.link ? props.link : "#"}`} className="link1">
            {`${props.linkTxt ? props.linkTxt : "random"}`}
          </a>{" "}
          {props.para3 ? props.para3 : ` or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real text.`}
        </p>
      </div>
      \
    </>
  );
};

export const CardDesign = (props: ICardDesignProps) => {
  return (
    <>
      {/* Global input with info */}
      <div className="flex space-x-8">
        <div className="card2 min-w-[40vh]">
          <div className="group relative mb-2 block h-[16rem] overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
            <img
              src={require('../../assests/img/Dashboard/RT_Card1.jpg')}
              loading="lazy"
              alt={`${props.altname ? props.altname : "Terranxt"}`}
              className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />
            <div className="absolute left-0 top-3 flex gap-2">
              {/* {props.draftbtnTxt&& <span className="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                {props.draftbtnTxt}
              </span>} */}
              {props.pvnxtbtnTxt && <span className="rounded-r-lg bg-white px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-gray-800">
                {props.pvnxtbtnTxt}
              </span>}
            </div>
          </div>
          <div className="flex items-start justify-between gap-2 px-2">
            <div className="flex flex-col">
              <div className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">
                RT {`${props.name}`}
              </div>
              <span className="text-gray-500">In {`${props.city && props.city}`}, {`${props.state && props.state}`}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-bold text-gray-600 lg:text-lg">{`${props.capacity}`} kWp</span>
              <span className="text-sm text-gray-600">{`${props.date && newformatDate(props.date)}`}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const InfoModal = (props: IInfoPropToggle) => {
  return (
    <>
      {/* Global input with focus outline & shadow */}
      <div className="bg-white">
        <div className="relative flex flex-wrap bg-custom-primary-default px-4 py-3 sm:flex-nowrap sm:items-center sm:justify-center sm:gap-3 sm:pr-8 md:px-8">
          <div className="order-1 mb-2 inline-block w-11/12 max-w-screen-sm text-sm text-white sm:order-none sm:mb-0 sm:w-auto md:text-base">
            {props.content ? props.content : "This is a section of some simple information text, also known asplaceholder text."}
          </div>

          <a
            href={`${props.link ? props.link : "#"}`}
            className="order-last inline-block w-full whitespace-nowrap rounded-lg bg-white px-4 py-2 text-center text-xs font-semibold text-custom-primary-default outline-none ring-white transition duration-100 hover:bg-white focus-visible:ring active:bg-white sm:order-none sm:w-auto md:text-sm"
          >
            {props.content ? props.content : "Learn more"}
          </a>

          <div className="order-2 flex w-1/12 items-start justify-end sm:absolute sm:right-0 sm:order-none sm:mr-1 sm:w-auto xl:mr-3">
            <button
              type="button"
              className="text-white transition duration-100 hover:text-indigo-100 active:text-indigo-200"
            >
              {props.infoicon ? props.infoicon : <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export const Breadcrumb = () => {
  return (
    <>
      {/* Global input with focus outline & shadow */}

      <nav
        aria-label="breadcrumb"
        className="w-full p-4 bg-gray-100 text-gray-800"
      >
        <ol className="flex h-8 space-x-2 text-gray-800">
          <li className="flex items-center">
            <a
              rel="noopener noreferrer"
              href="#"
              title="Back to homepage"
              className="flex items-center hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 pr-1 text-gray-600"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </a>
          </li>
          <li className="flex items-center space-x-1">
            <span className="text-gray-600">/</span>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-1 capitalize hover:underline"
            >
              Parent
            </a>
          </li>
          <li className="flex items-center space-x-1">
            <span className="text-gray-600">/</span>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-1 capitalize hover:underline"
            >
              Parent
            </a>
          </li>
          <li className="flex items-center space-x-1">
            <span className="text-gray-600">/</span>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-1 capitalize hover:underline cursor-default"
            >
              Current
            </a>
          </li>
        </ol>
      </nav>
    </>
  );
};
