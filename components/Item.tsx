import {
  FileSymlink,
  FolderClosed,
  FolderOpen,
  MoreHorizontal,
} from "lucide-react";
import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Link from "next/link";

const Item = ({
  item,
}: {
  item: {
    name: string;
    children: any[];
  };
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        className="menu-item w-full flex items-center gap-1"
        onClick={() => item.children && setIsOpen(!isOpen)}
      >
        {item.children && (isOpen ? <FolderOpen /> : <FolderClosed />)}
        {item.name}
        {item.children && (
          <div className="ml-auto">
            <ContextMenu>
              <ContextMenuTrigger>
                <MoreHorizontal />
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        )}
      </button>
      {item.children && (
        <div className={`sub-menu `}>
          {item.children.length ? (
            item.children.map((child: any) => (
                // <Item key={child.name} item={child} />
                <div key={child.name} className="flex flex-col  items-start">
                    <Link href={`/dashboard/assessments/${child.id}`} >{child.name}</Link>
                </div>
            ))
          ) : (
            <Empty />
          )}
        </div>
      )}
    </div>
  );
};

const Empty = () => (
  <button className="italic text-sm opacity-50">- Empty -</button>
);

export default Item;
