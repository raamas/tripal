import Markdown from "react-markdown";
import { Card, CardContent } from "./ui/card";

export default function MessageBox({
  children,
  type,
}: // className,
{
  children: React.ReactNode;
  type: "user" | "assistant" | "system" | "data";
}) {
  const typeClassname =
    type == "assistant"
      ? " self-start p-2 w-full "
      : " self-end font-light bg-blue-700 border-xs shadow-sm/10 border-blue00 text-neutral-100 ";

  return (
    <Card
      className={
        "px-2 max-w-md block rounded-xl my-2 flex-center  " + typeClassname
      }
    >
      <CardContent className="message-content p-2 ">
        <Markdown>{String(children)}</Markdown>
      </CardContent>
    </Card>
  );
}
