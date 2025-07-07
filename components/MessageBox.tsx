import Markdown from "react-markdown";
import { Card, CardContent } from "./ui/card";

export default function MessageBox({
  children,
  type,
  loading,
}: // className,
{
  children: React.ReactNode;
  type: "userPrompt" | "modelResponse";
  loading: boolean;
  // className: string | null;
}) {
  const loadingStyles = loading && " animate-pulse ";
  const typeClassname =
    type == "modelResponse"
      ? " self-start  " + loading
      : "self-end italic font-light bg-blue-600 border-xs border-blue-400 text-neutral-200 ";

  return (
    <Card
      className={" px-4 block rounded-xl my-2 flex-center " + typeClassname}
    >
      <CardContent className="message-content p-2 ">
        <Markdown>{String(children)}</Markdown>
      </CardContent>
    </Card>
  );
}
