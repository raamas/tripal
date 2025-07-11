import { Skeleton } from "./ui/skeleton";

export default function ChatSkeleton() {
  return (
    <div className=" flex justify-center">
      <div className="msgH messageHistory w-[80vw] flex flex-col min-h-[10vh] my-20 ">
        <Skeleton className="bg-blue-800 h-[8vh] w-[60vw] px-2 max-w-md block rounded-xl my-2 flex-center self-end font-light border-xs shadow-sm/10 border-blue00 text-neutral-100" />
        {/* <div>
        </div> */}
      </div>
    </div>
  );
}
