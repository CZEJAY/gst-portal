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
  link,
}: {
  item: {
    name: string;
    children: any[];
  };
  link: string;
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
        <div className={` `}>
          {Array.isArray(item.children) ? (
            item?.children?.map((child: any) => (
              // <Item key={child.name} item={child} />
              <div
                key={child.name}
                className={`flex flex-col  items-start ${
                  isOpen ? "sub-menu" : "hidden"
                }`}
              >
                <Link href={`${link}/${child.id}`}>{child.name}</Link>
              </div>
            ))
          ) : (
            // @ts-ignore
            <Empty n_item={{id: item.id, name: item.name}} link={link} isOpen={isOpen} />
          )}
        </div>
      )}
    </div>
  );
};

const Empty = ({
  n_item,
  link,
  isOpen,
}: {
  n_item?: {id: string, name: string};
  link?: string;
  isOpen?: boolean;
}) => (
  <div className="">
    {n_item ? (
      <div
        className={`flex flex-col  items-start ${
          isOpen ? "sub-menu" : "hidden"
        }`}
      >
        <Link href={`${link}/q/${n_item.name.replaceAll(" ", "-").toLowerCase()}/${n_item.id}`}>{n_item.name}</Link>
      </div>
    ) : (
      <button className="italic text-sm opacity-50">- Empty -</button>
    )}
  </div>
);

export default Item;
