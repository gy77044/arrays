export interface NewModalProp {
      name: string;
      modalSize?:'lgx'| 'lg'|'md'|'sm'|'sm-x'|'small'
      btnName: string;
      isAbleCLick?: boolean;
      onClick: (actionType: string) => void
      children: JSX.Element|string,
      overflow?:boolean
      // setClose: (val:boolean) => void
      setIsCLose: React.Dispatch<React.SetStateAction<boolean>>;
      height?:string
      maxheight?:string
}